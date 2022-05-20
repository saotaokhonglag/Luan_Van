import React from 'react';
import {
    SafeAreaView, TextInput,
    Button, ImageBackground,
    View, Dimensions,
    FlatList,
    StyleSheet,
    Text, StatusBar, Image,
    TouchableOpacity
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Login = ({ navigation }) => {
    return (
        <ImageBackground style={{ height: '100%', width: '100%' }}
            source={{ uri: 'https://img4.thuthuatphanmem.vn/uploads/2020/03/05/anh-nen-toi-cho-dien-thoai_101025597.jpg' }} resizeMode='stretch'>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, color:'white' }}>
                <View style={{ height: '100%', width: '100%' }}>
                    <View style={styles.view}>
                        <View style={styles.component}>
                            <Text style={{ color: 'white' }}>Email</Text>
                            <TextInput style={styles.textinput} autoCapitalize='none' />
                        </View>
                        <View style={styles.component}>
                            <Text style={{ color: 'white' }}>Password</Text>
                            <TextInput style={styles.textinput} secureTextEntry={true} />

                        </View>
                    </View>
                    <View style={styles.view}>
                        <TouchableOpacity onPress={() => { navigation.navigate('HomePage') }}
                            style={ styles.button}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('Signup') }}
                        style={[styles.button,{
                          backgroundColor: '#4D33B9',
                          marginTop: 20
                        }]}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    textinput: {
        color: 'white',
        height: '100%',
        width: '70%',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        textAlign: 'right',
    },
    view: {
        width: '100%',
        height: '20%',
        marginTop: 0.3 * windowHeight,
        alignItems: 'center',
    },
    component: {
        height: 30,
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button:{
        width: '60%', 
        height: '30%', 
        borderColor: 'white', 
        borderWidth: 1, 
        borderRadius: 100, 
        backgroundColor: '#18A2EB', 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})

export default Login;