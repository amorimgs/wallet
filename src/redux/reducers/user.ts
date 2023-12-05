// Esse reducer será responsável por tratar as informações da pessoa usuária

import { USER_ACTION } from '../actions/ActionTypes';

type ActionType = {
  type: string;
  payload: {
    email: string;
  }
};

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action: ActionType) => {
  switch (action.type) {
    case USER_ACTION:
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

export default user;
