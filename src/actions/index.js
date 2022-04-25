const LOGIN_USER = 'LOGIN_USER';
const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
const GET_CURRENCIES = 'GET_CURRENCIES';
const ADD_EXPENSES = 'ADD_EXPENSES';
const REMOVE_EXPENDITURE = 'REMOVE_EXPENDITURE';
const ADD_EDIT_EXPENSES = 'ADD_EDIT_EXPENSES';
const EDIT_EXPENDITURE = 'EDIT_EXPENDITURE';

export const loginUser = (payload) => ({
  type: LOGIN_USER,
  payload,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const getCurrencies = (data, payload) => ({
  type: GET_CURRENCIES,
  data,
  payload,
});

export const addExpenses = (payload) => ({
  type: ADD_EXPENSES,
  payload,
});

export const removeExpenditure = (payload) => ({
  type: REMOVE_EXPENDITURE,
  payload,
});

export const addEditExpenses = (payload) => ({
  type: ADD_EDIT_EXPENSES,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENDITURE,
  payload,
});

export function fetchAPI() {
  return async (dispatch) => {
    try {
      dispatch(requestCurrencies());
      const URL = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(URL);
      const result = await response.json();
      delete result.USDT;
      const notTether = Object.keys(result);
      dispatch(getCurrencies(result, notTether));
    } catch (error) {
      console.log(error);
    }
  };
}
