import { SET_MEMBERS, ADD_MEMBER, UPDATE_MEMBER, DELETE_MEMBER, FETCH_MEMBERS, SAVE_MEMBER } from './actionTypes';

export const setMembers = (members) => ({
  type: SET_MEMBERS,
  payload: members,
});

export const addMember = (member) => ({
  type: ADD_MEMBER,
  payload: member,
});

export const updateMember = (member) => ({
  type: UPDATE_MEMBER,
  payload: member,
});

export const deleteMember = (memberId) => ({
  type: DELETE_MEMBER,
  payload: memberId,
});

export const fetchMembers = () => ({
  type: FETCH_MEMBERS,
});

export const saveMember = (member) => ({
  type: SAVE_MEMBER,
  payload: member,
});