import { StyleSheet, Text, View } from "react-native"

import { GlobalStyles } from "../../constants/styles"

const ErrorOverlay = ({message, onConfirm}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An Error Occurred</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

export default ErrorOverlay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
    color: 'white'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  }
})