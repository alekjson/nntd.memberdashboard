import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import backgroundImage from '../assets/background.jpg';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMembers, saveMember, deleteMember } from '../redux/actions'; 
import Alert from '../components/Alert';

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

  useEffect(() => {
    dispatch(fetchMembers()); 
  }, [dispatch]);

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

  const handleSave = () => {
    if (ingameName.trim() === '' || zaloName.trim() === '') {
      setAlertMessage(t('fillAllFields'));
      setShowAlert(true);
      return;
    }

    dispatch(saveMember({ ingameName, zaloName, currentId }));
    setShowModal(false);
  };

  const handleEdit = (member) => {
    setIngameName(member.ingameName);
    setZaloName(member.zaloName);
    setCurrentId(member.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteMember(id));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  return (
    <div className="dashboard-container">
      {showAlert && (
        <Alert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
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
            {filteredMembers.map((member) => (
              <tr key={member.id}>
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
