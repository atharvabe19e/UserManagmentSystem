import {  View,  Text,  StyleSheet,  TouchableOpacity,  FlatList,  Alert,  Image,} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'UserDatabase.db'});
const Home = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user_info', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setUserList(temp);
      });
    });
  };

  let deleteUser = id => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  table_user_info where user_id=?',
        [id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    getData();
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={{padding: 10}}
        data={userList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity style={[styles.userItem, {padding: 5}]}>
              <Text style={styles.itemText}>{'Name: ' + item.user_name}</Text>
              <Text style={styles.itemText}>{'City: ' + item.user_city}</Text>
              <Text style={styles.itemText}>
                {'Number: ' + item.user_contact}
              </Text>
              <Text style={styles.itemText}>{'Email: ' + item.user_email}</Text>

              <View style={[styles.belowView]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('UpdateUser', {
                      data: {
                        name: item.user_name,
                        email: item.user_email,
                        city: item.user_city,
                        contact: item.user_contact,
                        id: item.user_id,
                      },
                    });
                  }}>
                  <Image
                    source={require('../src/icons/edit.png')}
                    style={[styles.icons]}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    deleteUser(item.user_id);
                  }}>
                  <Image
                    source={require('../src/icons/delete.png')}
                    style={styles.icons}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addNewBtn}
        onPress={() => {
          navigation.navigate('Register');
        }}>
        <Text style={styles.btnText}>Add New User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121b43',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addNewBtn: {
    backgroundColor: 'purple',
    width: 150,
    height: 50,
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  userItem: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
  itemText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  belowView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    height: 50,
  },
  icons: {
    width: 24,
    height: 24,
  },
});
