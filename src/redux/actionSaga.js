import { call, put, takeLatest } from 'redux-saga/effects';
import { setMembers, addMember, updateMember, deleteMember } from './actions';
import {FETCH_MEMBERS, SAVE_MEMBER, DELETE_MEMBER} from './actionTypes'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { determineRole } from '../components/Utilities';

function* fetchMembersSaga() {
  try {
    const membersSnapshot = yield call(getDocs, collection(db, 'members'));
    let membersList = membersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const roleOrder = {
      'Tông Chủ': 1,
      'Phó Tông Chủ': 2,
      'Trưởng Lão': 3,
      'Chủ Sự': 4,
      'Thành Viên': 5 
    };
    membersList = membersList.sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);
    yield put(setMembers(membersList));
  } catch (error) {
    console.error('Error fetching members:', error);
  }
}

function* saveMemberSaga(action) {
  const { ingameName, zaloName, currentId } = action.payload;
  const role = determineRole(zaloName);

  try {
    if (currentId) {
      const memberRef = doc(db, 'members', currentId);
      yield call(updateDoc, memberRef, { ingameName, zaloName, role });
      yield put(updateMember({ id: currentId, ingameName, zaloName, role }));
    } else {
      const newDoc = yield call(addDoc, collection(db, 'members'), { ingameName, zaloName, role });
      yield put(addMember({ id: newDoc.id, ingameName, zaloName, role }));
    }
  } catch (error) {
    console.error('Error saving member:', error);
  }
}

function* deleteMemberSaga(action) {
  const id = action.payload;
  try {
    const memberRef = doc(db, 'members', id);
    yield call(deleteDoc, memberRef);
    yield put(deleteMember(id));
  } catch (error) {
    console.error('Error deleting member:', error);
  }
}


export function* watchMemberSagas() {
  yield takeLatest(FETCH_MEMBERS, fetchMembersSaga);
  yield takeLatest(SAVE_MEMBER, saveMemberSaga);
  yield takeLatest(DELETE_MEMBER, deleteMemberSaga);
}
