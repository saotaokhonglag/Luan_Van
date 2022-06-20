import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { Feather } from '@expo/vector-icons';

const CatalogDetails = ({ navigation }) => {
    return (
        <View>
            <View style={styles.view}>
                <Text style={{ fontSize: 20 }}>Bún nè(1)</Text>
                <View style={{ paddingLeft: 260 }}>
                    <Feather name="more-vertical" size={30} />
                </View>
            </View>
            <View style={
                {
                    borderTopColor: '#dddddd',
                    borderTopWidth: 1
                }} />
            <TouchableOpacity onPress={() => { navigation.navigate('CatalogDetails') }}>
                <View style={{ flexDirection: 'row', }}>
                    <Image style={styles.cusImage} source={require('../image/hoc-nau-bun-dau-mo-quan.jpg')} />
                    <View style={{ flexDirection: 'column', }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 20 }}>Bún Nè</Text>
                        <Text style={{ fontSize: 18, color: '#F6720B' }}>200.000</Text>
                    </View>
                </View>
                <View style={[styles.menuItem,
                {
                    borderTopColor: '#dddddd',
                    borderTopWidth: 1
                }]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('CatalogDetails') }}>
                <View style={{ flexDirection: 'row', }}>
                    <Image style={styles.cusImage} source={require('../image/Thucuong.jpg')} />
                    <View style={{ flexDirection: 'column', }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 20 }}>Đồ uống</Text>
                        <Text style={{ fontSize: 18, color: '#F6720B' }}>20.000</Text>
                    </View>
                </View>
                <View style={[styles.menuItem,
                {
                    borderTopColor: '#dddddd',
                    borderTopWidth: 1,
                }]} />
            </TouchableOpacity>
            <View style={styles.addButton}>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#ffffff',
                        width: 170,
                        height: 50,
                        borderRadius: 10,
                        borderWidth: 0.4,
                        marginTop: '100%',
                        alignItems: 'center',
                        padding: 5,
                        borderColor: '#CE0000',
                    }}>
                    <Text style={{
                        color: '#CE0000',
                        fontSize: 18, marginLeft: 10, marginTop: 5
                    }}>Xóa sản phẩm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate('AddProduct')}}
                    style={{
                        backgroundColor: '#2F85F8',
                        width: 170,
                        height: 50,
                        borderRadius: 10,
                        borderWidth: 0.4,
                        marginTop: '100%',
                        alignItems: 'center',
                        padding: 5,
                        marginLeft: 30,
                    }}>
                    <Text style={{
                        color: '#FCF4F4FF',
                        fontSize: 18, marginLeft: 10, marginTop: 5
                    }}>Thêm sản phẩm</Text>
                </TouchableOpacity>
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
    view: {
        height: 40,
        marginStart: 10,
        marginTop: 10,
        flexDirection: 'row',
    },
    cusImage: {
        width: 80,
        height: 90,
        borderRadius: 50 / 2,
        borderWidth: 0.4,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    addButton: {
        marginLeft: 10,
        flexDirection: 'row',
    }
})
export default CatalogDetails