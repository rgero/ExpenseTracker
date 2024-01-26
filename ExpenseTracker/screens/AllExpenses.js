import { useContext, useEffect, useState } from "react"

import ErrorOverlay from "../components/ui/ErrorOverlay";
import { ExpensesContext } from "../store/ExpensesContext"
import ExpensesOutput from "../components/expenses/ExpensesOutput"
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { fetchExpenses } from "../utils/expense-api";

const AllExpenses = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const expenseContext = useContext(ExpensesContext);
  useEffect( () => {
    const GetExpenses = async () => {
      setLoading(true);
      try
      {
        const resultExpenses = await fetchExpenses();
        expenseContext.setExpenses(resultExpenses);
      } catch (error)
      {
        setError("Could not fetch expenses");
      }

      setLoading(false);
    }

    GetExpenses();
  }, [])

  if (loading) return <LoadingOverlay/>
  if (error) return <ErrorOverlay message={error} />
  return (
    <ExpensesOutput expenses={expenseContext.expenses} period="All" fallBackText="No Logged Expenses"/>

  )
}

export default AllExpenses
