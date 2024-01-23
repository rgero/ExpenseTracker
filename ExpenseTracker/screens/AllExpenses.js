import { ExpensesContext } from "../store/ExpensesContext"
import ExpensesOutput from "../components/expenses/ExpensesOutput"
import { useContext } from "react"

const AllExpenses = () => {
  let {expenses} = useContext(ExpensesContext);
  return (
    <ExpensesOutput expenses={expenses} period="All" fallBackText="No Logged Expenses"/>

  )
}

export default AllExpenses
