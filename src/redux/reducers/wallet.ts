// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { AnyAction } from 'redux';
import {
  ADD_DISPESAS,
  EDITAR_DISPESA,
  REMOVE_DISPESA, REQUEST_SUCCESSFUL, SALVAR_EDICAO } from '../actions/ActionTypes';
import { ExpensesType } from '../../types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case REQUEST_SUCCESSFUL:
      return { ...state, currencies: action.payload };
    case ADD_DISPESAS:
      return { ...state, expenses: [...state.expenses, action.payload] };
    case REMOVE_DISPESA:
      return { ...state, expenses: [...action.payload] };
    case EDITAR_DISPESA:
      return { ...state, editor: true, idToEdit: action.payload };
    case SALVAR_EDICAO:
      return {
        ...state,
        editor: false,
        expenses: state.expenses.map((el:ExpensesType) => {
          if (el.id === action.payload.id) {
            return { ...action.payload, exchangeRates: el.exchangeRates };
          } return el;
        }) };
    default:
      return state;
  }
};

export default wallet;
