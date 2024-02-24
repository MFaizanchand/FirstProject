import {FlatList, TouchableOpacity, View, Text } from 'react-native'

import React, { useEffect } from 'react'
import database from '@react-native-firebase/database';
const Render = () => {
    const Readdata = async () => {
        database()
          .ref('/users/')
          .on('value', snapshot => {
          
          });
    
      }
      useEffect(() => {
        Readdata()
      }, [])

    const RenderonFlat = ({ item }) => {
        return (
          <TouchableOpacity style={{margin:12 , borderWidth:2 , padding:12}}  >
            <Text style={styles.text} >name : {item.name}</Text>
            <Text style={styles.text} >Address : {item.address}</Text>
            <Text style={styles.text} >FatherName : {item.fathername}</Text>
            <Text style={styles.text} >Gender : {item.gender}</Text>
            <Text style={styles.text} >City : {item.city}</Text>
            <Text style={styles.text} >Country : {item.country}</Text>
            <Text style={styles.text} >Phone No : {item.phone}</Text>
          
           
          </TouchableOpacity>
    
        )
      }
  return (
    <View>
       <View>
          <FlatList data={myData}
          renderItem={({ item }) => <RenderonFlat item={item} />}  ></FlatList>
        </View>
      
    </View>
  )
}

export default Render