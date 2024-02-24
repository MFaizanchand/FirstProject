
import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import Information from './components/Information'
import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Render from './components/Render';
import auth from '@react-native-firebase/auth';
 const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
   }
   useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  
  return ( <NavigationContainer >
    <Stack.Navigator initialRouteName='Login' > 
    {user?
      <Stack.Screen name="Information"  component={Information}></Stack.Screen>:
      <Stack.Screen name="LoginScreen"  component={Login}></Stack.Screen>}
    
  
    {/* <Stack.Screen name="Render"  component={Render}></Stack.Screen> */}
    
      {/* <Login/> */}
      {/* <Information/> */}
    
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App 