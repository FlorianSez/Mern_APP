import {
  GET_USER,
  UPDATE_ACCEPT,
  UPDATE_NOM,
  UPDATE_PRENOM,
  UPDATE_REJECT,
  UPLOAD_PHOTO,
} from "../actions/user.action";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;

    case UPLOAD_PHOTO:
      return {
        ...state,
        picture: action.payload,
      };

    case UPDATE_PRENOM:
      return {
        ...state,
        prenom: action.payload,
      };

    case UPDATE_NOM:
      return {
        ...state,
        nom: action.payload,
      };

    case UPDATE_ACCEPT:
      return {
        ...state,
        accept: action.payload,
      };

    case UPDATE_REJECT:
      return {
        ...state,
        reject: action.payload,
      };

    default:
      return state;
  }
}
