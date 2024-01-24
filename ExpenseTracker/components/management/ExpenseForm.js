import { Alert, StyleSheet, Text, View } from "react-native"
import { getFormattedDate, parseDate } from "../../utils/date"

import Button from "../ui/Button"
import { GlobalStyles } from "../../constants/styles"
import Input from "./Input"
import { isDate } from "date-fns"
import { useState } from "react"

const ExpenseForm = ({expense, onCancel, onSubmit}) => {
  const isEditing = !!expense;

  const [date, setDate] = useState(expense?.date ? getFormattedDate(expense.date) : getFormattedDate(new Date()))
  const [amount, setAmount] = useState(expense?.amount ? expense.amount.toString() : "")
  const [description, setDescription] = useState(expense?.description ? expense.description : "")

  const submitHandler = () => {
    let newData = {
      date: parseDate(date),
      amount: +amount,
      description: description
    };

    // Validation
    const amountIsValid = !isNaN(newData.amount) && newData.amount > 0;
    const dateIsValid = isDate(newData.date);
    const descriptionIsValid = newData.description.trim().length > 0;
    
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert("Invalid Input", "Please check your input values")
      return
    };

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