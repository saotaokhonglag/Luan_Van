import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Feather } from '@expo/vector-icons';
import InputSpinner from "react-native-input-spinner";

const AddWareHouse = ({ navigation }) => {
    return (
        <SafeAreaView>
            <TouchableOpacity style={styles.addButton}  onPress={() => { navigation.navigate('CreateAdd') }}>
                <AntDesign name="plus" size={40} color='#2F85F8' style={{ marginStart: 10 }} />

                <Text style={styles.text}>Tạo sản phẩm nhanh</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.cusImage} source={require('../image/hoc-nau-bun-dau-mo-quan.jpg')} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 20, marginTop: 20, fontWeight: 'bold', color: '#555555' }}>Bún Nè</Text>
                        <Text style={{ fontSize: 15, color: '#7B7B7B' }}>SP0003</Text>
                    </View>
                </View>
            </View>
            <View style={
                {
                    borderTopColor: '#dddddd',
                    borderTopWidth: 1
                }} />
            <View style={{ flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.cusImage} source={require('../image/Cay.png')} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 20, marginTop: 20, fontWeight: 'bold', color: '#555555' }}>Cay</Text>
                        <Text style={{ fontSize: 15, color: '#7B7B7B' }}>SP0003</Text>
                    </View>
                </View>
            </View>
            <View style={
                {
                    borderTopColor: '#dddddd',
                    borderTopWidth: 1
                }} />
            <View style={{ flexDirection: 'column', backgroundColor: '#FFFFFF', marginTop: 440 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome5 name="arrow-circle-down" size={40} color='#2196F3' style={{ marginStart: 20, marginBottom: 10 }} />
                    <View style={{ flexDirection: 'column', marginLeft: 10, marginBottom: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#555555' }}>SL: 20</Text>
                        <Text style={{ fontSize: 15, color: '#7B7B7B' }}>1 sản phẩm</Text>
                    </View>
                    <TouchableOpacity onPress={() => {navigation.navigate('BaoCaoKho')}}
                    style={{
                        backgroundColor: '#2F85F8',
                        borderRadius: 10,
                        width: 100,
                        height: 30,
                        marginLeft: 100,
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            color: '#FFFFFF',
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}>Tiếp tục</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    addButton: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 0.4,
        alignItems: 'center',
        marginTop: 10,
        marginLeft: '5%',
        padding: 5,
        backgroundColor: 'white',
        borderColor: '#2F85F8',
        flexDirection: 'row',
        marginBottom: 10
    },
    cusImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        borderWidth: 0.4,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginHorizontal: 10,
        marginLeft: 20,
        marginBottom: 10,
    },
    addView: {
        width: 370,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        marginLeft: 10,
        padding: 5,
        backgroundColor: 'white',
        borderColor: 'black',
        flexDirection: 'row'
    },
    addView1: {
        width: 170,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'white',
        borderColor: 'black',
        flexDirection: 'row'
    },
    text: {
        fontSize: 20,
        color: '#2F85F8',
        marginLeft: 10,
        alignItems: 'center',
        marginLeft: 30,
    },
    textv: {
        fontSize: 16,
        color: '#B5B5B5',
        marginLeft: 20,
        alignItems: 'center',
    }
})
export default AddWareHouse