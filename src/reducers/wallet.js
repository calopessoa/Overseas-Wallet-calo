const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editExpenditure: {},
  isEdit: false,
  id: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_CURRENCIES':
    return { ...state };
  case 'GET_CURRENCIES':
    return {
      ...state,
      currencies: action.payload,
      exchanges: action.data,
    };
  case 'ADD_EXPENSES':
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload,
      ],
    };
  case 'REMOVE_EXPENDITURE':
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.payload),
    };
  case 'ADD_EDIT_EXPENSES':
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.editExpenditure.id) {
          return {
            ...action.payload,
            exchangeRates: expense.exchangeRates,
            id: expense.id,
          };
        }
        return expense;
      }),
      isEdit: false,
    };
  case 'EDIT_EXPENDITURE':
    return {
      ...state,
      editExpenditure: state.expenses.find((item) => item.id === action.payload),
      isEdit: true,
    };

  default:
    return state;
  }
}

export default wallet;
