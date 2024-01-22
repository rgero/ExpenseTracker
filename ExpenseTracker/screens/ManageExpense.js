import { Text, View } from "react-native"

import { useLayoutEffect } from "react";

const ManageExpense = ({route, navigation}) => {
  const expenseID = route.params?.expenseId;
  const isEditing = !!expenseID;

  useLayoutEffect(()=> {
    navigation.setOptions({
      title: isEditing ? "Editing Expense" : "Add Expense"
    })  
  }, [isEditing, navigation])

  return (
    <View>
      <Text>Manage Expense</Text>
    </View>
  )
}

export default ManageExpense
