import { DUMMY_EXPENSES } from "../dummyData/expenses"
import ExpensesOutput from "../components/Expenses/ExpensesOutput"

const AllExpenses = () => {
  return (
    <ExpensesOutput expenses={DUMMY_EXPENSES} period="All"/>

  )
}

export default AllExpenses
