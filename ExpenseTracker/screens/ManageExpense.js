import { StyleSheet, Text, View } from "react-native"
import { useContext, useLayoutEffect } from "react";

import ExpenseForm from "../components/management/ExpenseForm";
import { ExpensesContext } from "../store/ExpensesContext";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/ui/IconButton";

const ManageExpense = ({route, navigation}) => {
  const expenseID = route.params?.expenseId;
  const isEditing = !!expenseID;
  const expenseContext = useContext(ExpensesContext);
  const targetExpense = expenseContext.expenses.find((expense) => expense.id === expenseID);

  const deleteHandler = () => {
    expenseContext.deleteExpense(expenseID);
    navigation.goBack();
  }

  const cancelHandler = () => {
    navigation.goBack();
  }
  
  const confirmHandler = (newData) => {   
    if (isEditing)
    {
      expenseContext.updateExpense(expenseID, newData);
    } else {
      expenseContext.addExpense(newData);
    }
    navigation.goBack();
  }

  useLayoutEffect(()=> {
    navigation.setOptions({
      title: isEditing ? "Editing Expense" : "Add Expense"
    })  
  }, [isEditing, navigation])

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
