import {  View,  Text,  StyleSheet,  TextInput,  TouchableOpacity,  Alert,} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
var db = openDatabase({name: 'UserDatabase.db'});

const UpdateUser = () => {
  const route = useRoute();
  console.log(route.params.data);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [city, setCity] = useState(route.params.data.city);
  const [contact, setContact] = useState();
  const [email, setEmail] = useState(route.params.data.email);


  const updateUsers = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_user_info set user_name=?, user_contact=?,user_city=?,user_email=? where user_id=?',
        [name, contact, city, email, route.params.data.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.goBack(),
                },
              ],
              {cancelable: false},
            );
          } else alert('Updation Failed');
        },
      );
    });
  };

  useEffect(() => {
    console.log(route.params.data.contact)
     setName(route.params.data.name);
     setEmail(route.params.data.email);
     setCity(route.params.data.city)
     setContact(route.params.data.contact)
  }, []); 

  return (
    <View style={styles.container}>
      <Text style={{fontSize:30,color:'white',marginBottom:10}}>
        Edit User
      </Text>
      <TextInput
        placeholder="Enter User Name"
        style={styles.inputView}
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        placeholder="Enter User Contact"
        value={contact}
        onChangeText={(txt) => setContact(txt)}
        style={[styles.inputView, {marginTop: 20}]}

        keyboardType="numeric" 
        defaultValue={`${contact}`}
        />

      <TextInput
        placeholder="Enter User City"
        value={city}
        onChangeText={txt => setCity(txt)}
        style={[styles.inputView, {marginTop: 20}]}
      />

      <TextInput
        placeholder="Enter User Email"
        value={email}
        onChangeText={txt => setEmail(txt)}
        style={[styles.inputView, {marginTop: 20}]}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          updateUsers();
        }}>
        <Text style={styles.btnText}>Save User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateUser;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121b43',
    alignItems: 'center',
    justifyContent: 'center',
    
  },inputView: {
    width: '75%',
    backgroundColor: '#009688',
    borderRadius: 25,
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 15,
    color:'white'
    
  },
  addBtn: {
    backgroundColor: 'purple',
    width: '80%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
});
