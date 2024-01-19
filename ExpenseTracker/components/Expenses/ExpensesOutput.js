import { StyleSheet, View } from "react-native"

import ExpensesList from "./ExpensesList"
import ExpensesSummary from "./ExpensesSummary"
import { GlobalStyles } from "../../constants/styles"

const ExpensesOutput = ({period, expenses}) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} period={period}/>
      <ExpensesList expenses={expenses}/>
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
  }
})