import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Information from './Information'
import PhonesignIn from './PhonesignIn';

const Login = ({navigation }) => {
  const [email , setEmail] =useState('');
  const [password , setPassword] =useState('');
  
const onLogin =()=>{
  if(email && password){
  auth().signInWithEmailAndPassword(email, password)
  .then(response =>{
    console.log('response :' , response);
  })
  .catch(error =>{
    console.log(`${error}`);
  } ) 
  }
}

  const onRegister = () => {
    auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created');
      }).catch(error => {
        // if (error.code === 'auth/invalid-email') {
        //   Alert.alert('That email address is invalid!');
        // }
        console.log(`${error}`);
      });
  };
  
  return (
    <View style={styles.container}>
    <Text style={styles.signup}>Login Screen</Text>
    <TextInput
      placeholder="Email"
      style={styles.inputBox}
      value={email}
      onChangeText={value => setEmail(value)}
    />
    <TextInput
      placeholder="Password"
      style={styles.inputBox}
      value={password}
      onChangeText={value => setPassword(value)}
    />
    <TouchableOpacity onPress={onLogin} style={styles.register}>
      <Text style={styles.registerTitle}>Login</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={onRegister} style={styles.register}  
      >
      <Text style={styles.registerTitle}>Register</Text>
    </TouchableOpacity>
    



  </View>

  )
}

export default Login

const styles = StyleSheet.create({
    container: {
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    inputBox: {
      borderWidth: 1,
      borderColor: 'grey',
      paddingHorizontal: 12,
      borderRadius: 5,
      width: '90%',
      marginTop: 20,
    },
    register: {
      width: '90%',
      backgroundColor: '#FCAF03',
      padding: 12,
      borderRadius: 30,
      alignItems: 'center',
      marginTop: 40,
    },
    registerTitle: {
      fontSize: 16,
      color: '#000000',
      fontWeight: '600',
    },
    signup: {
      fontSize: 20,
      color: '#000000',
      fontWeight: '600',
      marginBottom: 80,
    },
  })
