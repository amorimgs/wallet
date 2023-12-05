import { WalletType } from '../../types';
import { USER_ACTION, WALLET_ACTION } from './ActionTypes';

// Coloque aqui suas actions
export const userAction = (email:string) => ({
  type: USER_ACTION,
  payload: email,
});

export const walletAction = (data:WalletType) => ({
  type: WALLET_ACTION,
  payload: data,
});
