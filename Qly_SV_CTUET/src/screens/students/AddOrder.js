import { View, Text, ScrollView, Button, FlatList, ImageBackground, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BarCodeScanner } from 'expo-barcode-scanner'
import Item from '../../components/orderItems'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { db } from '../../../firebase_config'
import { collection, addDoc, query, getDocs } from 'firebase/firestore'
import { SAMPLE_DATA } from '../../../assets/data/sampledata'

const AddOrder = (navigation, info) => {

  const [hasPermision, sethHasPermision] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');

  const [product, setProduct] = useState([])

  const askForCameraPermision = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      sethHasPermision(status == 'granted')
    })()
  }
  async function getProductsTemp() {
    const q = query(collection(db, "sanpham"));

    const querySnapshot = await getDocs(q);
    let pd = [];
    querySnapshot.forEach(doc => {
      pd.push(doc.data());
      
    })
    setProduct(pd)
    console.log(pd)
    
  }
  useEffect(() => {
    askForCameraPermision();
    getProductsTemp();
  }, []);

  // What happens when ew scan code

  const handleBarCodeScaner = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log('Type:' + type + '\nData: ' + data);
  }

  // Check permission and return the screens
  if (hasPermision === null) {
    return (
      <View style={styles.container}>
        <Text>Yêu cầu sử dụng camera</Text>
      </View>
    )
  }

  if (hasPermision === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>Không thể truy cập camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermision} />
      </View>
    )
  }


  

function header (){
  return(
    <SafeAreaView style={styles.container}>
    <View style={styles.barCodeBox}>
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScaner}
      style={{ height: 600, width: 400, marginLeft: -21}}
    />
  </View>
  <Text>{text}</Text>
  {scanned && <Button title={'Scanner Again?'} onPress={() => setScanned(false)} color='tomato' />}
    </SafeAreaView>

  )
 
}

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor='#2F85F8' />
      
      <FlatList
      // keyExtractor={(item)=>item.id}
      data={product}
      renderItem={({ item: product }) => {
        return <Item {...product}
          info={product} />
      }}
      // ListHeaderComponent={header}
      />
      <TouchableOpacity 
        style={[styles.buttonCT, { paddingStart: 20 }]}>
        <Text style={styles.text}>40.000đ</Text>
        <Text style={[styles.text, { paddingStart: '50%' }]}>Tiếp tục</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    fontFamily: 'sans-serif'
  },
  barCodeBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'tomato',
    marginTop: 30,
  },
  buttonCT: {
    width: '90%',
    height: 55,
    borderRadius: 15,
    backgroundColor: '#2F85F8',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
})

export default AddOrder