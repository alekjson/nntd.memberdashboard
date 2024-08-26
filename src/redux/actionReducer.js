import { SET_MEMBERS, ADD_MEMBER, UPDATE_MEMBER, DELETE_MEMBER } from './actionTypes';


const initialState = {
    members: [],
  };
  
  const memberReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_MEMBERS:
        return {
          ...state,
          members: action.payload,
        };
      case ADD_MEMBER:
        return {
          ...state,
          members: [...state.members, action.payload],
        };
      case UPDATE_MEMBER:
        return {
          ...state,
          members: state.members.map((member) =>
            member.id === action.payload.id ? action.payload : member
          ),
        };
      case DELETE_MEMBER:
        return {
          ...state,
          members: state.members.filter((member) => member.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default memberReducer;