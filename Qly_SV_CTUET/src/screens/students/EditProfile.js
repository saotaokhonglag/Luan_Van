import { View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import {
    Avatar,
    Title,
    Caption,
    Text,
} from 'react-native-paper'

const EditProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle='light-content' backgroundColor='#2F85F8' />
    <View style={styles.circleShape}>
        
    </View>
    <TouchableOpacity style={{marginTop: -50}}>
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        <ImageBackground
            source={{
                uri: 'https://hinhnen123.com/wp-content/uploads/2021/06/anh-avatar-cute-dep-nhat-5.jpg',
            }}
            style={{height:100, width:100}}
            imageStyle={{borderRadius: 100/2}}
        >
            <View style={{
                flex:1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <MaterialCommunityIcons name="camera" size={35} color="#fff" style={{
                    opacity: 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 10
                }}/>
            </View>
        </ImageBackground>
        </View>
        </TouchableOpacity>
    <View style={styles.menuWapper}>
        <TouchableOpacity>
            <View style={[styles.menuItem,
            {
                borderTopColor: '#dddddd',
                borderTopWidth: 1
            }]}>
                <FontAwesome name="user-o" color="#2F85F8" size={25}/> 
               <Text style={styles.menuItemText}>Thai Ngoc</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style={[styles.menuItem,
            {
                borderTopColor: '#dddddd',
                borderTopWidth: 1
            }]}>
               <FontAwesome name="phone" color="#2F85F8" size={25}/> 
               <Text style={styles.menuItemText}>Điện Thoại</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style={[styles.menuItem,
            {
                borderTopColor: '#dddddd',
                borderTopWidth: 1
            }]}>
               <FontAwesome name="envelope-o" color="#2F85F8" size={25}/> 
               <Text style={styles.menuItemText}>Email</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style={[styles.menuItem,
            {
                borderTopColor: '#dddddd',
                borderTopWidth: 1
            }]}>
               <FontAwesome name="intersex" color="#2F85F8" size={25}/> 
               <Text style={styles.menuItemText}>Giới tính</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style={[styles.menuItem,
            {
                borderTopColor: '#dddddd',
                borderTopWidth: 1
            }]}>
               <MaterialIcons name="date-range" color="#2F85F8" size={25}/> 
               <Text style={styles.menuItemText}>Ngày sinh</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style={[styles.menuItem,
            {
                borderTopColor: '#dddddd',
                borderTopWidth: 1
            }]}>
               <AntDesign name="setting" color="#2F85F8" size={25}/> 
               <Text style={styles.menuItemText}>Cài đặt mật khẩu</Text>
            </View>
        </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.commandButton}>
        <Text style={styles.panelButtonTitle}>Hoàn thành</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingStart: 20

    },
    circleShape: {
        width: '100%',
        height: '20%',
        borderRadius: 110 / 2,
        backgroundColor: '#2F85F8',
        marginTop: -100,
        justifyContent: 'center',

    },
    text: {
        color: '#FFFFFF',
        fontSize: 20,
        paddingLeft: '10%'
    },
    profile: {
        width: '90%',
        height: 110,
        borderRadius: 40 / 2,
        backgroundColor: '#FFFFFF',
        marginTop: -45,
        borderWidth: 0.5,
        paddingLeft: 25,
        flexDirection: 'row',
        paddingTop: 15

    },
    infoBoxWapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
        marginTop: 10,
        backgroundColor: '#FFFFFF'
    },
    infoBox: {
        width: '50%',
        paddingVertical: 20,
        paddingHorizontal: 30,
        alignItems: 'center'
    },
    menuItem: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingLeft: 10,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontSize: 16,
    },
    menuWapper:{
        marginTop: 10,
        width: '100%'
    },
    commandButton: {
        width: '90%',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#2F85F8',
        alignItems: 'center',
        marginTop: 10
    },
    panelButtonTitle: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold'

    }
})

export default EditProfile