import { StyleSheet, Text, TextInput, View } from "react-native"
import { useContext, useState } from "react"

import Button from "../ui/Button"
import { ExpensesContext } from "../../store/ExpensesContext"
import { GlobalStyles } from "../../constants/styles"
import Input from "./Input"
import { format } from "date-fns"

const ExpenseForm = ({id, onCancel, onSubmit}) => {
  const isEditing = !!id;

  let expense;

  const [date, setDate] = useState(expense?.date ? format(expense?.date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"))
  const [amount, setAmount] = useState(expense?.amount ? expense.amount : "")
  const [description, setDescription] = useState(expense?.description ? expense.description : "")

  const submitHandler = () => {
    let newData = {
      date: new Date(date),
      amount: +amount,
      description: description
    }
    onSubmit(newData);
  }

  return (
    <>
      <View>
        <View>
          <Text style={styles.title}>Your Expense</Text>
        </View>
        {/* This needs to be changed to a proper date */}
        <Input label="Date" textInputConfig={{
          placeholder: 'YYYY-MM-DD',
          onChangeText: setDate,
          keyboardType: 'decimal-pad',
          value: date
        }}/>
        <Input label="Amount" textInputConfig={{
          keyboardType: 'decimal-pad',
          onChangeText: setAmount,
          value: amount
        }}/>
        <Input label="Description" textInputConfig={{ 
          multiline: true,
          value: description,
          onChangeText: setDescription
        }}/>
      </View>
      <View style={styles.buttons}>
        <Button style={styles.buttonsStyle} mode="flat" onPress={onCancel}>Cancel</Button>
        <Button style={styles.buttonsStyle} onPress={submitHandler}>{isEditing ? 'Update':'Add'}</Button>
      </View>
    </>
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
  title: {
    marginTop: 24,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: GlobalStyles.colors.primary100
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonsStyle: {
    marginTop: 20,
    minWidth: 120,
    marginHorizontal: 8
  }
})