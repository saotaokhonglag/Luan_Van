import { View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EditProfile from './EditProfile'
import { userContext } from '../../store/GlobalContext'
import { db } from '../../../firebase_config'
import { collection, addDoc, query, getDoc, onSnapshot, where, doc } from 'firebase/firestore'
import {
    Avatar,
    Title,
    Caption,
    Text,
} from 'react-native-paper'

const Profile = ({ navigation }) => {
    const { userInfo } = useContext(userContext)


    async function checkUser() {
        const docRef = doc(db, "sinhvien", userInfo.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", userInfo);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!: ", userInfo.id);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor='#2F85F8' />
            <View style={styles.circleShape}>
            </View>
            <View style={styles.profile}>
                <Avatar.Image
                    source={{
                        uri: userInfo.picture,
                    }}
                    size={80}
                />
                <View style={{ marginLeft: 20 }}>
                    <Title style={styles.title}>Thai Ngoc</Title>
                    <Caption style={styles.caption}>0855633053</Caption>
                    <TouchableOpacity onPress={() => { checkUser() }}>
                        <Text style={{ fontSize: 18, fontWeight: '500', color: '#2F85F8' }}>Chỉnh sửa thông tin</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.infoBoxWapper}>
                <View style={[styles.infoBox,
                {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1
                }]}>
                    <Title style={styles.title}>150000đ</Title>
                    <Caption style={styles.caption}>Ví</Caption>
                </View>
                <View style={styles.infoBox}>
                    <Title style={styles.title}>12</Title>
                    <Caption style={styles.caption}>Hóa đơn</Caption>
                </View>
            </View>

            <View style={styles.menuWapper}>
                <TouchableOpacity>
                    <View style={styles.menuItem}>
                        <MaterialCommunityIcons name="heart-outline" color="#2F85F8" size={25} />
                        <Text style={styles.menuItemText}>Yêu thích</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.menuItem,
                    {
                        borderTopColor: '#dddddd',
                        borderTopWidth: 1
                    }]}>
                        <MaterialCommunityIcons name="credit-card" color="#2F85F8" size={25} />
                        <Text style={styles.menuItemText}>Thanh toán</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.menuItem,
                    {
                        borderTopColor: '#dddddd',
                        borderTopWidth: 1
                    }]}>
                        <MaterialCommunityIcons name="account-check-outline" color="#2F85F8" size={25} />
                        <Text style={styles.menuItemText}>Hổ trợ</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.menuItem,
                    {
                        borderTopColor: '#dddddd',
                        borderTopWidth: 1
                    }]}>
                        <AntDesign name="setting" color="#2F85F8" size={25} />
                        <Text style={styles.menuItemText}>Cài đặt</Text>
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
        paddingLeft: '18%'
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
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 18,
        fontWeight: '500'
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
        paddingLeft: 10
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontSize: 16,
    },
    menuWapper: {
        marginTop: 10,
        width: '100%'
    }
})

export default Profile