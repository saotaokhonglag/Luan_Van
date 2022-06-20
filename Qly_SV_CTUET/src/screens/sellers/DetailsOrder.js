import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

const DetailsOrder = ({ navigation }) => {
    return (
        <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, marginBottom: 10 }}>
                <Text style={[styles.textv, { fontSize: 18, }]}>Mã đơn hàng</Text>
                <Text style={[styles.textv, { fontSize: 20, marginLeft: '45%', fontFamily: 'sans-serif', fontWeight: 'bold' }]}>FZAQRG</Text>
            </View>
            <View style={styles.textv}>
                <View>
                    <View style={{ flexDirection: 'column', marginTop: 10, marginHorizontal: 10, marginBottom: 10 }}>
                        <Text style={{ fontSize: 20, color: '#525252', marginTop: 10, fontWeight: 'bold' }}>Thông tin khách hàng</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 20, color: '#525252', marginTop: 20 }}>Tên khách hàng</Text>
                                <Text style={{ fontSize: 20, color: '#525252' }}>Số điện thoại</Text>
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: '30%' }}>
                                <Text style={{ fontSize: 20, color: '#525252', marginTop: 20 }}>Thái</Text>
                                <Text style={{ fontSize: 20, color: '#525252' }}>0855633053</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: 'column', marginTop: 10, marginHorizontal: 10, marginBottom: 30 }}>
                        <Text style={{ fontSize: 20, color: '#525252', marginTop: 10, fontWeight: 'bold' }}>Thông tin thanh toán</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 18, color: '#525252', marginTop: 20 }}>Tổng 1 sản phẩm</Text>
                                <Text style={{ fontSize: 20, color: '#525252', fontWeight: 'bold' }}>Tổng cộng</Text>
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: '40%' }}>
                                <Text style={{ fontSize: 18, color: '#525252', marginTop: 20 }}>20.000đ</Text>
                                <Text style={{ fontSize: 20, color: '#525252', fontWeight: 'bold' }}>20.000đ</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={
                {
                    borderTopColor: '#dddddd',
                    borderTopWidth: 1
                }} />
            <View>
                <View style={{ flexDirection: 'column', marginTop: 10, marginHorizontal: 10, marginBottom: 30, marginLeft: 20}}>
                    <Text style={{ fontSize: 20, color: '#525252', marginTop: 10, fontWeight: 'bold' }}>Thông tin sản phẩm</Text>
                    <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.cusImage} source={require('../image/hoc-nau-bun-dau-mo-quan.jpg')} />
                        <Text style={{ fontSize: 20, marginTop: 20 }}>Bún Nè</Text>
                        <Text style={{ fontSize:20, marginLeft: 120, marginTop: 20}}>20.000đ</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF',
        alignItems: 'center',
        fontFamily: 'sans-serif'
    },
    cusImage: {
        width: 80,
        height: 90,
        borderRadius: 10,
        borderWidth: 0.4,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    textv: {
        fontSize: 16,
        color: '#525252',
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
})
export default DetailsOrder