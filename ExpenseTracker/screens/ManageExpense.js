import { StyleSheet, Text, View } from "react-native"
import { useContext, useLayoutEffect } from "react";

import Button from "../components/ui/Button";
import { ExpensesContext } from "../store/ExpensesContext";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/ui/IconButton";

const ManageExpense = ({route, navigation}) => {
  const expenseID = route.params?.expenseId;
  const isEditing = !!expenseID;

  const expenseContext = useContext(ExpensesContext);

  const deleteHandler = () => {
    expenseContext.deleteExpense(expenseID);
    navigation.goBack();
  }

  const cancelHandler = () => {
    navigation.goBack();
  }
  
  const confirmHandler = () => {
    const dummyObject = {
      description: "Hi Roy",
      date: new Date(),
      amount: 22.22
    }
    
    if (isEditing)
    {
      expenseContext.updateExpense(expenseID, dummyObject);
    } else {
      expenseContext.addExpense(dummyObject);
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
      <View style={styles.buttons}>
        <Button style={styles.buttonsStyle} mode="flat" onPress={cancelHandler}>Cancel</Button>
        <Button style={styles.buttonsStyle} onPress={confirmHandler}>{isEditing ? 'Update':'Add'}</Button>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonsStyle: {
    minWidth: 120,
    marginHorizontal: 8
  },
  deleteContainer: {
    marginTop: 24,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
})
