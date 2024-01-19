import { DUMMY_EXPENSES } from "../dummyData/expenses"
import ExpensesOutput from "../components/Expenses/ExpensesOutput"

const RecentExpenses = () => {
  return (
    <ExpensesOutput expenses={DUMMY_EXPENSES} period="Last Seven Days"/>
  )
}

export default RecentExpenses
