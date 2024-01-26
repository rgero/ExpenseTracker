import { StyleSheet, View } from "react-native"
import { deleteExpense, storeExpense, updateExpense } from "../utils/expense-api";
import { useContext, useLayoutEffect, useState } from "react";

import ErrorOverlay from "../components/ui/ErrorOverlay";
import ExpenseForm from "../components/management/ExpenseForm";
import { ExpensesContext } from "../store/ExpensesContext";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/ui/IconButton";
import LoadingOverlay from "../components/ui/LoadingOverlay";

const ManageExpense = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const expenseID = route.params?.expenseId;
  const isEditing = !!expenseID;
  const expenseContext = useContext(ExpensesContext);
  const targetExpense = expenseContext.expenses.find((expense) => expense.id === expenseID);

  const deleteHandler = () => {
    setLoading(true);
    try
    {
      deleteExpense(expenseID);
      expenseContext.deleteExpense(expenseID);
      navigation.goBack();
    } catch (err)
    {
      setError("Failed to delete expense");
      setLoading(false);
    }

  }

  const cancelHandler = () => {
    navigation.goBack();
  }
  
  const confirmHandler = async (newData) => {  
    setLoading(true);
    try {
      if (isEditing)
      {
        updateExpense(expenseID, newData);
        expenseContext.updateExpense(expenseID, newData);
      } else {
        const id = await storeExpense(newData);
        expenseContext.addExpense({id: id, ...newData});
      }
      navigation.goBack();
    } catch (err)
    {
      setError("Failed to save expense");
      setLoading(false);
    }

  }

  useLayoutEffect(()=> {
    navigation.setOptions({
      title: isEditing ? "Editing Expense" : "Add Expense"
    })  
  }, [isEditing, navigation])

  if (loading) return <LoadingOverlay/>
  if (error) return <ErrorOverlay message={error}/>

  return (
    <View style={styles.container}>
      <View>
        <ExpenseForm expense={targetExpense} onCancel={cancelHandler} onSubmit={confirmHandler}/>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton icon="trash" color={GlobalStyles.colors.error500} size={24} onPress={deleteHandler}/>
        </View>
      )}
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 24,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
})
