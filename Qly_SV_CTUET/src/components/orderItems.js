import { View, Text, ScrollView, Button, ImageBackground, TouchableOpacity, StyleSheet} from 'react-native'
import React,{useState, useEffect} from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import editPd from '../screens/students/EditPd'
import { useNavigation } from '@react-navigation/native'


const orderItems = ({info})=>{
  const navigation = useNavigation();
  const {id, idsp, iduser, tensp, gia, soluong, trangthai, img} = info;
    return(
        <TouchableOpacity  onPress={() => {
          navigation.navigate('EditPd',
          {
            id: info.id,
            // idsp: idsp,
            // iduser: iduser,
            name: info.tensp,
            price: info.gia,
            quantity: info.soluong,
            // status: trangthai
          })}}
        style={styles.products}>
          <View style={styles.imageProducts}>
            <ImageBackground
              source={{
                uri: 'https://hinhnen123.com/wp-content/uploads/2021/06/anh-avatar-cute-dep-nhat-5.jpg',
              }}
              style={{ height: 65, width: 65 }}
            />
            <Text style={{ paddingLeft: 20, fontSize: 15 }}>{info.tensp}</Text>
          </View>
          <View style={styles.priceProducts}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20, paddingStart: 30 }}>{gia.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}đ</Text>      
                <Text style={{ fontSize: 18, marginLeft: 10, marginTop: 2 }}>Số lượng: {info.soluong}</Text>
            </View>
          </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    products: {
      width: '100%',
      height: 80,
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      paddingHorizontal: 16
    },
    imageProducts: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    priceProducts: {
      alignContent: 'center',
      width: 200
    }
  })
  


export default orderItems