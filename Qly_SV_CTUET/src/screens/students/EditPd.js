import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  StyleSheet,  
  Button, 
  ImageBackground
} from 'react-native'
import React, {useState} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import { db } from '../../../firebase_config'
import { collection, updateDoc, setDoc, doc } from 'firebase/firestore'
import AddOrder from './AddOrder';

const EditPd = ({navigation, route}) => {
  const item = route.params;
  
  const [curPrice, setCurPrice] = useState(0)
  const [change, setChange] = useState({});


  function AddQty(item) {
    setChange(item.quantity++)
    setCurPrice(item.quantity * item.price)
  }

  
  function DecQty(item) {
    if(item.quantity >0)
    {
      setChange(item.quantity--)
      setCurPrice(item.quantity * item.price)
    }
    
  }

  function onAddToCart() {
    const frank = doc(db, "sanpham", item.id)
     updateDoc(frank, {
     "soluong": item.quantity,
 });
    navigation.navigate('AddOrder')
 }
  return (
    <SafeAreaView>
    <ScrollView>
      <View style={styles.infoContainer}>
              <ImageBackground
              source={{
                uri: 'https://hinhnen123.com/wp-content/uploads/2021/06/anh-avatar-cute-dep-nhat-5.jpg',
              }}
              style={{ height: 65, width: 65 }}
            />
        
        {/* <View style={{backgroundColor:'#F4A460'}}> */}
        <View >
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>Giá: {item.price}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start',marginBottom:10 }}>
          <Text style={{fontSize:16,fontWeight:'300'}}>Số lượng: </Text>
          <AntDesign
            name="minuscircle"
            size={24}
            color="black"
            onPress={() => DecQty(item)}
          />
          <Text style={{marginLeft:10}}>{item.quantity}</Text>
          <AntDesign
            style={{ marginLeft: 10 }}
            name="pluscircle"
            size={24}
            color="black"
            onPress={() => AddQty(item)}
          />

        </View>
        <Text style={styles.location}> Thành tiền: {curPrice}</Text>
        <Button
          onPress={onAddToCart}
          title="Add to cart"
        />
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({


image: {
  height: 300,
  width: '100%'
},
infoContainer: {
  padding: 15,
  backgroundColor:'#FFEFD5'
},
name: {
  fontSize: 22,
  fontWeight: 'bold',
},
description: {
  fontSize: 16,
  fontWeight: '400',
  color: 'black',
  
},
location:{
  fontSize: 16,
  fontWeight: '400',
  color: '#787878',
  marginBottom: 10,
  color: 'black',
  
},
icon:{
  alignItems: 'flex-start',
  alignSelf: 'flex-start',
  marginBottom:5
}
});

export default EditPd