import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const TempDel = () => {
    
    const commandsql=()=>{
    db.transaction(tx =>{
        tx.executeSql(
            'SELECT * FROM table_user_info',[],
            (tx,res)=>{
                console.log(res)
                var temp=[];
                for (let i=0;i<res.rows.length;i++)
                {
                    temp.push(res.rows.item(i));
                }
                console.log(temp)
                
          props.navigation.navigate('Main');
            }
          );
    })
  
}


  return (
 
    <TouchableOpacity onPress={commandsql}>
        <Text>
            Hiiiii
        </Text>
    </TouchableOpacity>
  )
}

export default TempDel

const styles = StyleSheet.create({})