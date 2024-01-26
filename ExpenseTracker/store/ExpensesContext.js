import 'react-native-get-random-values';

import { createContext, useReducer } from "react";

import { DUMMY_EXPENSES } from "../dummyData/expenses";
import { v4 as uuidv4 } from 'uuid';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {},
  deleteExpense: (id) => {},
  getExpense: (id) => {},
  setExpenses: (expenses) => {},
  updateExpense: (id, {description, amount, date})=> {},
});

const expensesReducer = (state, action) => {
  switch(action.type)
  {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const dateDescending = action.payload.reverse();
      return dateDescending;
    case "UPDATE":
      const targetIndex = state.findIndex( (element) => { return element.id == action.payload.id });
      const targetExpense = state[targetIndex];
      const updatedItem = { ...targetExpense, ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[targetIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter( (expense) => expense.id != action.payload);
    default:
      return state;
  }
}

const ExpensesContextProvider = ({children}) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expense) => {
    dispatch( {
      type: "ADD",
      payload: expense
    })
  }

  const deleteExpense = (id) => {
    dispatch( {
      type: "DELETE",
      payload: id
    })
  }

  const setExpenses = (expenses) => {
    dispatch( {
      type: "SET",
      payload: expenses
    })
  }

  const updateExpense = (id, expenseData) => {
    dispatch( {
      type: "UPDATE",
      payload: {
        id: id,
        data: expenseData
      }
    })
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    setExpenses: setExpenses,
    updateExpense: updateExpense
  }

  return <ExpensesContext.Provider value={value}>
    {children}
  </ExpensesContext.Provider>
}

export default ExpensesContextProvider