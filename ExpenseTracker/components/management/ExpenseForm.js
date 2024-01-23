import { TextInput, View } from "react-native"

import Input from "./Input"

const ExpenseForm = () => {

  const amountChangedHandler = () => {

  }

  return (
    <View>
      {/* This needs to be changed to a proper date */}
      <Input label="Date" textInputConfig={{
        placeholder: 'YYYY-MM-DD',
        onChangeText: () => {},
        keyboardType: 'decimal-pad'
      }}/>
      <Input label="Amount" textInputConfig={{
        keyboardType: 'decimal-pad',
        onChangeText: amountChangedHandler
      }}/>
      <Input label="Description" textInputConfig={{ 
        multiline: true,
        
      }}/>
    </View>
  )
}

export default ExpenseForm
