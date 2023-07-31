import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'
import { NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import RegistrationPage from './screens/RegistrationPage';
import Main from './screens/Main';
import UpdateUser from './screens/UpdateUser';
import { useEffect } from 'react';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });
const Stack=createNativeStackNavigator();


const App = () => {

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user_info'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user_info', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user_info(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_city VARCHAR(20),user_email VARCHAR(20),user_password VARCHAR(20))',
              []
            );
          }else{console.log("already created")}
        }
      );
    });
  }, []);
  
  return (
    <SafeAreaView style={styles.all}> 
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} >

      <Stack.Screen name='Home' component={HomePage}  />
      <Stack.Screen name='Register' component={RegistrationPage}/>
      <Stack.Screen name='Login' component={LoginPage}/>   
      <Stack.Screen name='Main' component={Main}/>
      <Stack.Screen name='UpdateUser' component={UpdateUser}/>     
      </Stack.Navigator>
    </NavigationContainer> 
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({all:{
  flex:1,
  backgroundColor: 'blue'
}})