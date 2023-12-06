import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type WalletType = {
  wallet: {
    currencies: string[],
    expenses: ExpensesType;
    editor: boolean;
    idToEdit: number;
  } };

export type StoreType = {
  user: {
    email: string
  }
};

export type StateType = StoreType & WalletType;

export type Dispatch = ThunkDispatch<WalletType, null, AnyAction>;

export type ExpensesType = {
  id: number;
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates: any;
}[];
