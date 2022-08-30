export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const loginAction = (email) => ({ type: LOGIN, email });

export const currenciesAction = (currencies) => ({ type: GET_CURRENCIES, currencies });

export function fetchCurrencies() {
  return async (dispatch) => {
    const currenciesRaw = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json());
    const currencies = Object
      .keys(currenciesRaw).filter((currency) => currency !== 'USDT');
    dispatch(currenciesAction(currencies));
  };
}
