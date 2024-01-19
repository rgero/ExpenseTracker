import { StyleSheet, Text, View } from "react-native"

import { GlobalStyles } from '../../constants/styles';

const ExpensesSummary = ({period, expenses}) => {
  const expensesTotal = expenses.reduce( (sum, expense) => {
    return sum + expense.amount
  }, 0.0)
  
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{period}</Text>
      <Text style={styles.titleText}>${expensesTotal.toFixed(2)}</Text>
    </View>
  )
}

export default ExpensesSummary

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    alignItems: 'center',
    borderRadius: 6
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary400
  }
})