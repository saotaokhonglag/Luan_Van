import { View, Text, Button, FlatList,TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import Item from '../../components/orderItems'
import Feather from 'react-native-vector-icons/Feather'
import { db } from '../../../firebase_config'
import { collection, addDoc, query, getDocs, onSnapshot, where, doc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'


const AddOrder = (info, navigation) => {

  const [hasPermision, sethHasPermision] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [product, setProduct] = useState([])

  const askForCameraPermision = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      sethHasPermision(status == 'granted')
    })()
  }
  async function getProductsTemp() {
    const q = doc(db, "sinhvien","XjfeXaCP2DEDABlxwCFm" );
    const ref = query(collection(q, "Cart"))
    const unsubscribe = await onSnapshot(ref, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((d) => {
        cities.push(d.data());
      });
      setProduct(cities)
    });
  }

  async function handleBarCodeScaner({data }) {
    setScanned(true)
    const q = query(collection(db, "sanpham"), where("idsp", "==", data));
    const unsubscribe = await onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((d) => {
        const docRef = doc(db, "sinhvien", "XjfeXaCP2DEDABlxwCFm")
        addDoc(collection(docRef, 'Cart', data), {
          idsp:data,
          gia: d.data().gia,
          soluong: 1,
          tensp: d.data().tensp,
          trangthai: false,
          image: ""
        })
      });
    });

  }


  useEffect(() => {
    askForCameraPermision();
    getProductsTemp();
  }, []);

  // What happens when ew scan code

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

  function Total(){
    let totalPrice = 0;
    product.forEach((item) => {
      totalPrice += item.soluong * item.gia;
    });
    return (
      <View style={styles.cartLineTotal}>
        <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
        <Text style={styles.lineRight}>$ {totalPrice}</Text>
        <Button title='Thanh toán' onPress={()=>navigation.navigate('DetailOrder')}/>
      </View>
    );
  }

  function header() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.info}>
          <Feather
            size={25}
            name='info'
            color={'#FF3636'} />
          <Text style={{ paddingLeft: 10, fontSize: 18 }}>Bấm vào sản phẩm để chỉnh sửa</Text>
        </View>
        <View style={styles.barCodeBox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScaner}
            style={{ height: 600, width: 400, marginLeft: -10 }}
          />
        </View>
        {scanned && <Button title={'Scanner Again?'} onPress={() => setScanned(false)} color='tomato' />}
      </SafeAreaView>

    )

  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor='#2F85F8' />
      <FlatList
        keyExtractor={(item)=>item.idsp}
        data={product}
        renderItem={({ item: product }) => {
          return <Item {...product}
            info={product} />
        }}
        ListHeaderComponent={header}
        ListFooterComponent={Total}
      />
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
    marginTop: 10,
  },
  buttonCT: {
    width: '90%',
    height: 55,
    borderRadius: 15,
    backgroundColor: '#2F85F8',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 18,
    width: '30%'
  },
  info: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  }
})

export default AddOrder