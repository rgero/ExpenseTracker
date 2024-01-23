import { DUMMY_EXPENSES } from "../dummyData/expenses"
import { ExpensesContext } from "../store/ExpensesContext"
import ExpensesOutput from "../components/Expenses/ExpensesOutput"
import { useContext } from "react"

const AllExpenses = () => {
  let {expenses} = useContext(ExpensesContext);
  return (
    <ExpensesOutput expenses={expenses} period="All" fallBackText="No Logged Expenses"/>

  )
}

export default AllExpenses
