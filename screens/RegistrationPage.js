import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
  } from 'react-native';
  import React, {useState} from 'react';

  import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });
  
  
  
  const RegistrationPage = props => {
  
   
    const [name, setStateName] = useState('');
    const [number, setStateNum] = useState('');
    const [city, setStateCity] = useState('');
    const [email, setStateE] = useState('');
    const [password, setStateP] = useState('');
  
  
    const saveData = () => {
        console.log('here bit')
    db.transaction(txn =>{
        txn.executeSql(
            'INSERT INTO table_user_info(user_name, user_contact, user_city,user_email,user_password) VALUES (?,?,?,?,?)',
            [name,number,city,email,password],
            (txn,res)=>{
                if(res.rowsAffected==1){
                    props.navigation.navigate('Main');
                }
                else{
                console.log(res)
                }
          
            }
          , (error)=>{
            console.log(error)
          });
    })
    console.log(email + '   ' + password + '   ' + name + '   ' + number+ '   '+ city);

     
    };
  
    const onPressSignUp = async () => {
      if (!email || !password || !name || !number) {
        Alert.alert('Empty Field!!!', 'Please fill all Information', [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ]);
      } else if (!CheckEmail(email)) {
        Alert.alert('Invalid Email', 'Please enter correct Email Id', [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ]);
      } else if (isNaN(number) || number.length !== 10) {
        Alert.alert('Invalid Number', 'Please enter correct Number', [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ]);
      } else {
        
          console.log(email + '   ' + password + '   ' + name + '   ' + number+ '   '+ city);
      saveData()
           
        }
      }
    ;
  
    const CheckEmail = e => {
      const expression =
        /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      console.log('hii' + expression.test(String(e).toLowerCase()));
      return expression.test(String(e).toLowerCase());
    };
  
    const onPressForgotPassword = () => {
      console.log('Try and remember it please');
    };
  
   
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Registration Screen</Text>
  
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholderTextColor="#003f5c"
            placeholder="Enter Your Name"
            onChangeText={text => setStateName(text)}
          />
        </View>
  
        <View style={styles.inputView}>
          <TextInput
            keyboardType="number-pad"
            style={styles.inputText}
            placeholderTextColor="#003f5c"
            placeholder="Enter Your 10 Digit Phone Number"
            onChangeText={text => setStateNum(text)}
          />
        </View>
  
  
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholderTextColor="#003f5c"
            placeholder="Enter Your City"
            onChangeText={text => setStateCity(text)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholderTextColor="#003f5c"
            placeholder="Enter Your Email ID"
            onChangeText={text => setStateE(text)}
          />
        </View>
  
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholderTextColor="#003f5c"
            placeholder="Enter Your Password"
            onChangeText={text1 => setStateP(text1)}
          />
        </View>
  
        <TouchableOpacity onPress={onPressForgotPassword}>
          <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={onPressSignUp} style={styles.loginBtn}>
          <Text style={styles.loginText}>Sign Up </Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Login');
          }}
          style={styles.LoginAcc}>
          <Text style={styles.loginText}>Already Have Account?? Login</Text>
        </TouchableOpacity>
      </View>
    );
        }
  ;
  
  export default RegistrationPage;
  
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
      textAlign: 'center',
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
    LoginAcc: {marginTop: 10, color: 'white', fontSize: 15},
  });
  