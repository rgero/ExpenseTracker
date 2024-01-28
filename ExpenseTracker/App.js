import AuthContextProvider, { AuthContext } from './store/AuthContext';
import { useContext, useEffect, useState } from 'react';

import AllExpenses from './screens/AllExpenses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpensesContextProvider from './store/ExpensesContext';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/ui/IconButton';
import {Ionicons} from '@expo/vector-icons';
import LoginScreen from './screens/auth/LoginScreen';
import ManageExpense from './screens/ManageExpense';
import { NavigationContainer } from '@react-navigation/native';
import RecentExpenses from './screens/RecentExpenses';
import SignupScreen from './screens/auth/SignupScreen';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  const authContext = useContext(AuthContext);
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
      headerRight: ({tintColor}) => (
         <View style={{flexDirection: 'row'}}>
          <IconButton icon="add" size={24} color={tintColor} onPress={()=> {navigation.navigate("ManageExpense")}} />
          <IconButton icon="exit" color={tintColor} size={24} onPress={authContext.logout}/>
        </View>) 
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

const AuthenticatedRoutes = () => {
  return (
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
  );
}

function UnauthorizedRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}


function Navigation() {
  const authContext = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authContext.isAuthenticated && <UnauthorizedRoutes />}
      {authContext.isAuthenticated && <AuthenticatedRoutes/>}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  return <Navigation />;
}

export default function App() {
  
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <ExpensesContextProvider>
          <Root />
        </ExpensesContextProvider>
      </AuthContextProvider>
    </>
  );
}
