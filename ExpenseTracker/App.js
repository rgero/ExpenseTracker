import AllExpenses from './screens/AllExpenses';
import ExpensesContextProvider from './store/ExpensesContext';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/ui/IconButton';
import {Ionicons} from '@expo/vector-icons';
import ManageExpense from './screens/ManageExpense';
import { NavigationContainer } from '@react-navigation/native';
import RecentExpenses from './screens/RecentExpenses';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator screenOptions={({navigation}) => ({
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      headerTintColor: "white",
      tabBarStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
        fontWeight: 'bold'
      },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({tintColor}) => (<IconButton icon="add" size={24} color={tintColor} onPress={()=> {navigation.navigate("ManageExpense")}} />) 
    })}>
      <BottomTabs.Screen 
        name="AllExpenses" 
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All",
          tabBarIcon: ({color, size}) => ( <Ionicons name="calendar" size={size} color={color} />),
        }}
      />
      <BottomTabs.Screen 
        name="RecentExpenses" 
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({color, size}) => ( <Ionicons name="hourglass" size={size} color={color} /> )
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="ExpensesOverview" screenOptions={
            {
              headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
              headerTintColor: 'white'
            }
          }>
            <Stack.Screen name="ManageExpense" 
              component={ManageExpense} 
              options={{
                presentation: 'modal'
              }}
            />
            <Stack.Screen 
              name="ExpensesOverview" 
              component={ExpensesOverview}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
