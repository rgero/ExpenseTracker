import axios from "axios"

const fullPath = process.env.EXPO_PUBLIC_FIREBASE_URL + "expenses.json";

export const storeExpense = async (expenseData) => {
  const response = await axios.post(fullPath,
    expenseData
  ).catch(err => { console.error(err)});
  const id = response.data.name;
  return id;
}

export const fetchExpenses = async () => {
  const response = await axios.get(fullPath).catch(err => {console.error(err)});
  const expenses = [];
  for( const key in response.data)
  {
    expenses.push({
      id: key,
      date: new Date(response.data[key].date),
      amount: response.data[key].amount,
      description: response.data[key].description,
    })
  }

  return expenses;
}

export const updateExpense =  (id, expenseData) => {
  const editURL = process.env.EXPO_PUBLIC_FIREBASE_URL + `expenses/${id}.json`;
  return axios.put (editURL, expenseData).catch(err => {console.error(err)});
}

export const deleteExpense = async (id) => {
  const deleteURL = process.env.EXPO_PUBLIC_FIREBASE_URL + `expenses/${id}.json`;
  return axios.delete(deleteURL).catch(err => {console.error(err)});
}