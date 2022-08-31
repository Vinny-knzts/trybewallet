export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';

export const loginAction = (email) => ({ type: LOGIN, email });

export const currenciesAction = (currencies) => ({ type: GET_CURRENCIES, currencies });

export const expensesAction = (expenses) => (
  { type: UPDATE_EXPENSES, expenses });

export function fetchCurrencies() {
  return async (dispatch) => {
    const currenciesRaw = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json());
    const currencies = Object
      .keys(currenciesRaw).filter((currency) => currency !== 'USDT');
    dispatch(currenciesAction(currencies));
  };
}

export function fetchExpense(newExpense, oldExpenses) {
  return async (dispatch) => {
    const expenses = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json());
    const payload = { ...newExpense, exchangeRates: expenses };
    const newExpenses = [...oldExpenses, payload];
    dispatch(expensesAction(newExpenses));
  };
}

export function removeExpense(expenses, expenseToRemove) {
  const newExpenses = expenses.filter((expense) => expense.id !== expenseToRemove);
  return (dispatch) => {
    dispatch(expensesAction(newExpenses));
  };
}

export function editExpense(expenses, expenseToEdit, newValues) {
  const newExpenses = expenses.map((expense) => {
    if (expense.id === expenseToEdit) {
      expense.value = newValues.value;
      expense.description = newValues.description;
      expense.currency = newValues.currency;
      expense.method = newValues.method;
      expense.tag = newValues.tag;
      return expense;
    }
    return expense;
  });
  return (dispatch) => {
    dispatch(expensesAction(newExpenses));
  };
}
