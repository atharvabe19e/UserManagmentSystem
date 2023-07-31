import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const HomePage = (props) => {
  return (
    <View style={styles.all}>

      <TouchableOpacity onPress={()=> props.navigation.navigate("Login")} style={styles.btncontainer}>
        <Text style={styles.btnText}>
            Login
        </Text>
      </TouchableOpacity>
  

<TouchableOpacity onPress={()=> props.navigation.navigate("Register")} style={styles.btncontainer}>
<Text style={styles.btnText}>
    Register
</Text>
</TouchableOpacity>
</View>

  )
}

export default HomePage

const styles = StyleSheet.create({
    all:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121b43',
      },
      alltext:{
        color:'white',
        fontSize:25
      },
      btncontainer:{
        elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10
      },
      btnText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }
})