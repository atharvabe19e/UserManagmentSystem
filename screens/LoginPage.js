import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'UserDatabase.db'});

const LoginPage = props => {
  const onPressLogin = () => {
    console.log(email + password);
    if (!email || !password) {
      console.log('wrong' + email + password);
      Alert.alert(
        'Invalid Information',
        'Please enter correct email and password',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
      );
    } else {
      login(email);
    }
  };
  const onPressForgotPassword = () => {
    console.log('Try and remember it please');
  };

  const login = email => {
    props.navigation.navigate('Main');
  };

  const [email, setStateE] = useState(null);
  const [password, setStateP] = useState(null);
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Login Screen</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={text => setStateE(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={text1 => setStateP(text1)}
        />
      </View>

      <TouchableOpacity onPress={onPressForgotPassword}>
        <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
        <Text style={styles.loginText}>Login </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
        <Text style={styles.forgotAndSignUpText}>
          Don't have a account?? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121b43',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'white',
    marginBottom: 40,
  },
  inputView: {
    width: '75%',
    backgroundColor: '#009688',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgotAndSignUpText: {
    color: 'white',
    fontSize: 15,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: 'maroon',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
  },
});
