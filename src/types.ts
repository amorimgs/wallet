export type WalletType = {
  currencies: string[],
  expenses: string[],
  editor: boolean;
  idToEdit: number
};

export type StoreType = {
  user: {
    email: string
  }
};
