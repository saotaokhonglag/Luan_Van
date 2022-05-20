import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, useColorScheme, StatusBar } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddOrder from './AddOrder'
import Profile from './profile'
import Wallet from './Wallet';

import {
    Avatar,
} from 'react-native-paper'
const HomePage = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor='#2F85F8' />
            <View style={styles.circleShape}>
                
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Profile')}}>
                        <Avatar.Image
                            source={{
                                uri: 'https://hinhnen123.com/wp-content/uploads/2021/06/anh-avatar-cute-dep-nhat-5.jpg',
                            }}
                            size={70}
                        />
                        </TouchableOpacity>
                        <View style={{ paddingLeft: 10, fontSize: '18' }}>
                            <Text style={styles.text}>Thai Ngoc</Text>
                            <View style={styles.eye}>
                                <Text style={styles.text}>**************</Text>
                                <TouchableOpacity>
                                    <Entypo name="eye-with-line" size={15} style={{ marginLeft: 5, color: 'white' }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ paddingLeft: 110 }}>
                            <EvilIcons name="bell" size={28} style={{ color: 'white' }} />
                        </View>
                        <View>
                        </View>
                    </View>
                

                <View style={styles.button}></View>
            </View>

            <View style={styles.eye}>
                <View>
                    <TouchableOpacity style={styles.cusButton}>
                        <MaterialCommunityIcons name="qrcode-scan" size={35} style={{ marginBottom: 10 }} />
                        <Text>Quét Mã</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Wallet') }}
                        style={styles.cusButton}>
                        <MaterialCommunityIcons name="wallet" size={35} style={{ marginBottom: 10 }} />
                        <Text>Ví</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingLeft: 60 }}>
                    <TouchableOpacity style={styles.cusButton}>
                        <MaterialCommunityIcons name="wallet-plus" size={35} style={{ marginBottom: 10, color: 'black' }} />
                        <Text>Nạp Tiền</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cusButton}>
                        <MaterialCommunityIcons name="history" size={40} style={{ marginBottom: 5 }} />
                        <Text>Giao dịch</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('AddOrder') }}
                style={styles.addButton}>
                <AntDesign name="plus" size={20} color='#FCF4F4FF' style={{ marginStart: 15 }} />
                <Text style={{
                    color: '#FCF4F4FF',
                    fontSize: 18, marginLeft: 10
                }}>Thêm hóa đơn</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        paddingLeft: 25

    },
    circleShape: {
        width: '100%',
        height: '20%',
        borderRadius: 110 / 2,
        backgroundColor: '#2F85F8',
        marginTop: -50,
        justifyContent: 'center',

    },
    text: {
        color: '#FCF4F4FF',
        fontSize: 18
    },
    eye: {
        flexDirection: 'row',
    },
    cusButton: {
        width: 100,
        height: 100,
        borderRadius: 50 / 2,
        borderWidth: 0.4,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 45,
        marginTop: 40
    },
    addButton: {
        width: 195,
        height: 50,
        borderRadius: 100 / 2,
        borderWidth: 0.4,
        backgroundColor: 'white',
        marginStart: '45%',
        marginTop: '70%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#2F85F8'
    }

})


export default HomePage