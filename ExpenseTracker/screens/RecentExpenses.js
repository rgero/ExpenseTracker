import { ExpensesContext } from "../store/ExpensesContext";
import ExpensesOutput from "../components/expenses/ExpensesOutput"
import { subDays } from "date-fns";
import { useContext } from "react";

const RecentExpenses = () => {
  let {expenses} = useContext(ExpensesContext);

  const recentExpenses = expenses.filter((expense) => {
    const sevenDaysAgo = subDays(new Date(), 7)
    return expense.date >= sevenDaysAgo;
  })

  return (
    <ExpensesOutput expenses={recentExpenses} period="Last Seven Days" fallBackText="No Recent Expenses"/>
  )
}

export default RecentExpenses
