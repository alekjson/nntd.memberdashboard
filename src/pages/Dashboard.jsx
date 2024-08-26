import React, { useState, useEffect, useCallback } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
import './Dashboard.css';
import backgroundImage from '../assets/background.jpg';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setMembers, addMember, updateMember, deleteMember } from '../redux/actions'; 

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const [ingameName, setIngameName] = useState('');
  const [zaloName, setZaloName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentId, setCurrentId] = useState(null);
  const members = useSelector(state => state.members.members); 
  const [filteredMembers, setFilteredMembers] = useState(members);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.style.setProperty('--background-image', `url(${backgroundImage})`);
  }, []);

  const fetchMembers = useCallback(async () => {
    try {
      const membersSnapshot = await getDocs(collection(db, 'members'));
      let membersList = membersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(membersList);
      const roleOrder = {
        'Tông Chủ': 1,
        'Phó Tông Chủ': 2,
        'Trưởng Lão': 3,
        'Chủ Sự': 4,
        'Thành Viên': 5 
      };
  
      membersList = membersList.sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);
  
      console.log('Fetched members:', membersList); 
  
      dispatch(setMembers(membersList)); 
      setFilteredMembers(membersList); 
    } catch (error) {
      console.error('Error fetching members:', error);
      alert('An error occurred while fetching members. Please try again.');
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMembers(); 
  }, [fetchMembers]);

  useEffect(() => {
    setFilteredMembers(
      members.filter(member => member.zaloName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, members]);

  const handleCreate = () => {
    setIngameName('');
    setZaloName('');
    setCurrentId(null); 
    setShowModal(true);
  };

  const handleSave = async () => {
    if (ingameName.trim() === '' || zaloName.trim() === '') {
      alert('Please fill out all fields');
      return;
    }

    let role = 'Thành Viên';
    if (zaloName === 'Minh Ngọc') {
      role = 'Tông Chủ';
    } else if (zaloName === 'Hữu Vinh' || zaloName === 'Nguyễn Bá Thành') {
      role = 'Phó Tông Chủ';
    } else if (['Phúc Lâm', 'Ngọc Nhi', 'Trí Phạm'].includes(zaloName)) {
      role = 'Trưởng Lão';
    } else if (['Phạm Tuấn Anh', 'Minh'].includes(zaloName) || zaloName.includes('Bò')) {
      role = 'Chủ Sự';
    }

    try {
      if (currentId) {
        const memberRef = doc(db, 'members', currentId);
        await updateDoc(memberRef, {
          ingameName,
          zaloName,
          role
        });
        dispatch(updateMember({ id: currentId, ingameName, zaloName, role }));
        console.log('Document successfully updated!');
      } else {
        const newDoc = await addDoc(collection(db, 'members'), {
          ingameName,
          zaloName,
          role
        });
        dispatch(addMember({ id: newDoc.id, ingameName, zaloName, role })); 
        console.log('Document successfully written!');
      }
    } catch (error) {
      console.error('Error saving member:', error);
      alert('An error occurred while saving the member. Please try again.');
    }

    setShowModal(false);
  };

  const handleEdit = (member) => {
    setIngameName(member.ingameName);
    setZaloName(member.zaloName);
    setCurrentId(member.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const memberRef = doc(db, 'members', id);
    try {
      await deleteDoc(memberRef);
      dispatch(deleteMember(id)); 
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('An error occurred while deleting the member. Please try again.');
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="dashboard-container">
      <div className="language-toggle">
        <label htmlFor="language-select" className="language-toggle-label">
          <select
            id="language-select"
            onChange={changeLanguage}
            value={i18n.language}
            className="language-select"
          >
            <option value="en">English</option>
            <option value="vi">Tiếng Việt</option>
          </select>
        </label>
      </div>
      <header className="dashboard-header">
        <div>{t('headerTitle')}</div>
      </header>
      <div className="dashboard-content">
        <div className="actions">
          <button className="add-button" onClick={handleCreate}>{t('addButton')}</button>
          <input
            type="text"
            className="search-input"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <table className="member-table">
          <thead>
            <tr>
              <th>{t('ingameName')}</th>
              <th>{t('zaloName')}</th>
              <th>{t('role')}</th>
              <th>{t('action')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, index) => (
              <tr key={index}>
                <td>{member.ingameName}</td>
                <td>{member.zaloName}</td>
                <td className={`role ${member.role === 'Tông Chủ' ? 'red' : member.role === 'Phó Tông Chủ' ? 'teal' : member.role === 'Trưởng Lão' ? 'lightblue' : member.role === 'Chủ Sự' ? 'leafgreen' : 'black'}`}>
                  {t(`roles.${member.role}`)}
                </td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(member)}>{t('edit')}</button>
                  <button className="delete-button" onClick={() => handleDelete(member.id)}>{t('delete')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>{currentId ? t('editMember') : t('createMember')}</h2>
              <label>
                {t('ingameName')}:
                <input type="text" value={ingameName} onChange={(e) => setIngameName(e.target.value)} />
              </label>
              <label>
                {t('zaloName')}:
                <input type="text" value={zaloName} onChange={(e) => setZaloName(e.target.value)} />
              </label>
              <button onClick={handleSave}>{t('save')}</button>
              <button onClick={() => setShowModal(false)}>{t('cancel')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
