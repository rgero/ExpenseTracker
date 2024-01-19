import ExpenseItem from "./ExpenseItem"
import { FlatList } from "react-native"

const ExpensesList = ({expenses}) => {
  return (
    <FlatList 
      data={expenses}
      renderItem={(expense) => (<ExpenseItem expense={expense}/>)}
      keyExtractor={(expense) => expense.id}
    />
  )
}

export default ExpensesList

