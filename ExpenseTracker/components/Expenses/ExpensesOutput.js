import { StyleSheet, Text, View } from "react-native"

import ExpensesList from "./ExpensesList"
import ExpensesSummary from "./ExpensesSummary"
import { GlobalStyles } from "../../constants/styles"

const ExpensesOutput = ({period, expenses, fallBackText = "No Expenses Defined"}) => {
  let content = <Text style={styles.fallBackText}>{fallBackText}</Text>
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} period={period}/>
      {expenses?.length > 0 ? (<ExpensesList expenses={expenses}/>) : content }
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
  },
  fallBackText: {
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 24,
    color: GlobalStyles.colors.accent500
  }
})