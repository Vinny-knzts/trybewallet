import { GET_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: '',
};

export default function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: action.currencies };
  default:
    return state;
  }
}
