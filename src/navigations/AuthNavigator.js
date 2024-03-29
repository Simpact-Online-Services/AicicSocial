import { StyleSheet, Text, View } from 'react-native'

import Login from '../screens/auth/LoginScreen';
import React from 'react'
import SignUp from '../screens/auth/SignUpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
   <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
    <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}}/>
    <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown: false}}/>
   </Stack.Navigator>
  )
}
