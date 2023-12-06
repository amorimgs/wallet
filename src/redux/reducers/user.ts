// Esse reducer será responsável por tratar as informações da pessoa usuária
import { AnyAction } from 'redux';
import { USER_ACTION } from '../actions/ActionTypes';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case USER_ACTION:
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

export default user;
