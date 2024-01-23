import { StyleSheet, Text, TextInput, View } from "react-native"

import { GlobalStyles } from "../../constants/styles";

const Input = ({label, textInputConfig}) => {

  let inputStyles = [styles.input];
  if (textInputConfig && textInputConfig.multiline)
  {
    inputStyles.push(styles.inputMulti)
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...textInputConfig} style={inputStyles}/>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8
  },
  label: {
    fontSize: 16,
    color: GlobalStyles.colors.primary100,
    marginBottom: 8
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 16,
    color: GlobalStyles.colors.primary700
  },
  inputMulti: {
    minHeight: 100, 
    textAlignVertical: 'top',
  }
});
