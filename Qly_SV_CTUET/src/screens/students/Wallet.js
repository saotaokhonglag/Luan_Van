import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native'
import React, { useState, useContext } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { db } from '../../../firebase_config'
import {runTransaction , collection, updateDoc, getDocs, docs, where, query, collectionGroup, onSnapshot, doc, writeBatch, setDoc, addDoc } from 'firebase/firestore'
import { userContext } from '../../store/GlobalContext'

const Wallet = () => {

    const{userInfo, setUserInfo} = useContext(userContext)
    const navigation = useNavigation();
    const [product, setProduct] = useState([])

    async function Logout(){
        navigation.navigate('Login')
    }

    async function test() {

        // const citiesRef = collection(db, "cities");
        //     addDoc(collection(citiesRef, 'SF', 'landmarks'), {
        //         name: 'Golden Gate Bridge',
        //         type: 'museum'
        //     })
//update
        // const citiesRef = doc(db, 'sinhvien', 'XjfeXaCP2DEDABlxwCFm');
        // await updateDoc(doc(citiesRef, 'Cart', 'SP001'), {
        //         soluong: 11
        //     })

        navigation.navigate('Profile')
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor='#2F85F8' />
            <View style={styles.circleShape}>
                <Text style={styles.money}>0đ</Text>
            </View>
            <View style={styles.Wallet}>
                <TouchableOpacity onPress={test}
                    style={{ alignItems: 'center' }}>
                    <MaterialCommunityIcons name="wallet-plus" size={45} style={{ marginBottom: 10, color: 'black' }} />
                    <Text style={{ color: '#2F85F8', fontSize: 18 }}>{userInfo.email}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.history}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 16
                }}>Giao dịch gần nhất</Text>
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

    circleShape: {
        width: '100%',
        height: '20%',
        borderRadius: 110 / 2,
        backgroundColor: '#2F85F8',
        marginTop: -70,
        justifyContent: 'center',

    },
    text: {
        color: '#FFFFFF',
        fontSize: 20,
        paddingLeft: '35%'
    },
    money: {
        color: '#FCF4F4FF',
        fontSize: 20,
        paddingLeft: '10%'
    },
    Wallet: {
        width: '90%',
        height: 100,
        borderRadius: 40 / 2,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        marginTop: -45,
        borderWidth: 0.5,
        justifyContent: 'center',

    },
    history: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        paddingLeft: 10,
        marginTop: 30
    }
})


export default Wallet