// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

type ActionType = {
  type: string;
};

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action: ActionType) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default wallet;
