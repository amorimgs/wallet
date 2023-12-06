import { Dispatch } from '../../types';
import {
  ADD_DISPESAS,
  REQUEST_SUCCESSFUL, USER_ACTION } from './ActionTypes';

// Coloque aqui suas actions
export const userAction = (email:string) => ({
  type: USER_ACTION,
  payload: email,
});

export const requestSuccessful = (currencies: string[]) => {
  return {
    type: REQUEST_SUCCESSFUL,
    payload: currencies,
  };
};

export const addDispesasSucess = (expenses: any) => {
  return {
    type: ADD_DISPESAS,
    payload: expenses,
  };
};

export const fetchCurrencies = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const result = Object.keys(data).filter((el:any) => el !== 'USDT');
      dispatch(requestSuccessful(result));
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

export const addDispesas = (expenses: {
  id: number;
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates: any;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      expenses.exchangeRates = data;
      dispatch(addDispesasSucess(expenses));
    } catch (error: any) {
      console.log(error.message);
    }
  };
};
