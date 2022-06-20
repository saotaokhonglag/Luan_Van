import React from 'react'
import { View, TextInput, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Order = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.addView}>
        <AntDesign name="search1" size={20} color='#7B7B7B' style={{ marginStart: 10 }}/>
        <TextInput style={styles.textv} autoCapitalize='none' placeholder="Tìm kiếm đơn hàng">
        </TextInput>
      </View>
      <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity style={{ borderWidth: 0.3 }} onPress={() => {navigation.navigate('DetailsOrder')}}>
          <View style={{ flexDirection: 'column', marginTop: 10, marginHorizontal: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 20, color: '#999999', marginTop: 10 }}>06 Thg 04 - 20:28</Text>
            <View style={[styles.menuItem,
            {
              borderTopColor: '#dddddd',
              borderTopWidth: 1
            }]} />
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 10 }}>Thái</Text>
                <Text style={{ fontSize: 16, color: '#999999' }}>NGVBZV</Text>
              </View>
              <View style={{ flexDirection: 'column', marginLeft: '60%' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>20.000đ</Text>
                <Text style={{ fontSize: 16, color: '#999999' }}>1 Sản phẩm</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ borderWidth: 0.3, marginTop: 20 }}>
          <View style={{ flexDirection: 'column', marginTop: 10, marginHorizontal: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 20, color: '#999999', marginTop: 10 }}>06 Thg 04 - 20:28</Text>
            <View style={[styles.menuItem,
            {
              borderTopColor: '#dddddd',
              borderTopWidth: 1
            }]} />
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 10 }}>Nguyên</Text>
                <Text style={{ fontSize: 16, color: '#999999' }}>NGVBZV</Text>
              </View>
              <View style={{ flexDirection: 'column', marginLeft: '56%' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>40.000đ</Text>
                <Text style={{ fontSize: 16, color: '#999999' }}>2 Sản phẩm</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
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
  textv: {
    fontSize: 16,
    color: '#B5B5B5',
    marginLeft: 10,
    alignItems: 'center',
  },
  addView: {
    width: '70%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#E9E9E9',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  addButton: {
    width: 195,
    height: 50,
    borderRadius: 100 / 2,
    borderWidth: 0.4,
    backgroundColor: 'white',
    marginStart: '45%',
    marginTop: '150%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#2F85F8'
  }
})
export default Order