import { SET_MEMBERS, ADD_MEMBER, UPDATE_MEMBER, DELETE_MEMBER } from './actionTypes';

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