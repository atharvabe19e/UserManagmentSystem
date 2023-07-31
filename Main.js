import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';

import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'UserDatabase.db'});

const Main = (props) => {
  const [userList, setUserList] = useState([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM table_user_info', [], (tx, res) => {
        let temp = [];
        for (let i = 0; i < res.rows.length; i++) {
          console.log(res.rows.item(i));
          temp.push(res.rows.item(i));
        }
        setUserList(temp);
      });
    });
  }, [isFocused]);

  let [email, setEmail] = useState(email);
  let [password, setpassword] = useState(password);
  let [name, setName] = useState(name);
  let [number, setNumber] = useState(number);


  const deleteUser=()=>{

  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!!</Text>
        {/*    <Text style={styles.info}>Name: {name}</Text>
      <Text style={styles.info}>Email: {email}</Text>  
      <Text style={styles.info}>number: {number}</Text> */}
        <FlatList
          style={styles.flst}
          data={userList}
          renderItem={({item, index}) => {
            return (
              <View style={styles.userItem}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{flex: 5, borderWidth: 0}}>
                    <Text>{'Name: ' + item.user_name}</Text>
                    <Text>{'Number: ' + item.user_contact}</Text>
                    <Text>{'City: ' + item.user_city}</Text>
                    <Text>{'Email: ' + item.user_email}</Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <TouchableOpacity onPress={()=>{
                        props.navigation.navigate('UpdateUser',{data:{
                            name:item.user_name,
                            contact : item.user_contact,
                            city:item.user_city,
                            email:item.user_email,
                            id:item.user_id
                        }})
                    }}
                    style={{flex: 1, backgroundColor: 'red'}}>
                      <Image
                        source={require('../src/icons/edit.png')}
                        style={styles.iconstyle}
                      />

                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{flex: 1, backgroundColor: 'blue'}}>
                      <Image
                        source={require('../src/icons/delete.png')}
                        style={[, styles.iconstyle, {marginLeft: 4}]}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />

        <TouchableOpacity
          onPress={() => props.navigation.dispatch(StackActions.popToTop())}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>Exit </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Main;

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
  info: {
    color: 'white',
    fontSize: 15,
    alignItems: 'center',
    textAlign: 'left',
  },
  userItem: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 5,
    borderColor: 'black',
    margin: 2,
  },
  flst: {
    backgroundColor: 'white',
    width: '100%',
  },
  iconstyle: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    marginVertical: 10,
    marginLeft: 10,
  },
});
