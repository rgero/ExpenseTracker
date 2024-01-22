import { StyleSheet, Text, View } from "react-native"

import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/ui/IconButton";
import { useLayoutEffect } from "react";

const ManageExpense = ({route, navigation}) => {
  const expenseID = route.params?.expenseId;
  const isEditing = !!expenseID;

  const deleteHandler = () => {}

  useLayoutEffect(()=> {
    navigation.setOptions({
      title: isEditing ? "Editing Expense" : "Add Expense"
    })  
  }, [isEditing, navigation])

  return (
    <View style={styles.container}>
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
