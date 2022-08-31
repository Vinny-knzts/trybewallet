import { GET_CURRENCIES, UPDATE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

export default function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: action.currencies };
  case UPDATE_EXPENSES:
    return { ...state, expenses: action.expenses };
  default:
    return state;
  }
}
