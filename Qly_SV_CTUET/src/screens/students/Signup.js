import React, { useState } from 'react';
import {
    SafeAreaView, TextInput,
    Button, ImageBackground,
    View, Dimensions,
    FlatList,
    StyleSheet,
    Text, StatusBar, Image,
    TouchableOpacity
} from 'react-native';
import FontAsome from 'react-native-vector-icons/FontAwesome'




const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function Signup({ navigation }) {

    const [email, onChangeEmail] = useState('')
    const [isValidEmail, setValidEmail] = useState(true)
    const [number, onChangeNumber] = useState('')
    const [isValidPhone, setValidPhone] = useState(true)

    const verifyEmail = (email) => {
        let regex1 = new RegExp('[a-z0-9]+@student.ctuet.edu.vn');
        let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
        if (regex.test(email) || regex1.test(email)) {
            return true;
        }
        return false;
    }

    const verifyPhone = (number) => {
        let onlyNumber = new RegExp(/(0[3|5|7|8|9])+([0-9]{8})\b/)
        if (onlyNumber.test(number)) {
            return true;
        }
        return false;
    }

    async function signup() {
        
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <View style={styles.view}>
                <View style={styles.component}>
                    <Text style={{ color: 'black', marginRight: '13%' }}>Email</Text>
                    <TextInput style={styles.textinput} autoCapitalize='none'
                        onChangeText={(text) => {
                            onChangeEmail(text)
                            const isValid = verifyEmail(text);
                            isValid ? setValidEmail(true) : setValidEmail(false)
                        }}
                        value={email} />
                </View>
                <View style={styles.component} >
                    <Text style={{ color: 'black', marginRight: '4%' }}>Password</Text>
                    <TextInput style={styles.textinput} secureTextEntry={true} />
                </View>
                <View style={styles.component} >
                    <Text style={{ color: 'black', marginRight: '11%' }}>Phone</Text>
                    <TextInput style={styles.textinput} keyboardType='numeric' maxLength={10}
                        onChangeText={(text) => {
                            onChangeNumber(text)
                            const isValid = verifyPhone(text);
                            isValid ? setValidPhone(true) : setValidPhone(false)
                        }}
                        value={number} />
                </View>
                <Text style={styles.textErro}>{isValidEmail ? '' : 'Định dạng email không đúng'}</Text>
                <Text style={styles.textErro}>{isValidPhone ? '' : 'Không đúng định dạng'}</Text>

            </View>
            <View style={styles.view}>
                <TouchableOpacity onPress={() => { navigation.navigate('Login') }}
                    style={styles.button}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Back to Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 20, width: '60%', height: '30%', borderColor: 'white', borderWidth: 1, borderRadius: 100, backgroundColor: '#4D33B9', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={signup}
                    style={[styles.buttonContainer, { backgroundColor: '#f5e7ea' }]}>
                    <View style={styles.iconWrapper}>
                        <FontAsome name='google' style={styles.icon} size={22} color={'red'} />
                    </View>
                    <View style={styles.btnTxtWarpper}>
                        <Text style={[styles.btnText, { color: '#de4d41' }]}>Login with Google</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
        </SafeAreaView>

    );
}


const styles = StyleSheet.create({
    textinput: {
        color: 'black',
        height: '100%',
        width: '80%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        textAlign: 'right',
    },
    view: {
        width: '100%',
        height: '20%',
        marginTop: 0.2 * windowHeight,
        alignItems: 'center',
    },
    component: {
        height: 30,
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        width: '60%',
        height: '30%',
        borderRadius: 100,
        backgroundColor: '#18A2EB',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textErro: {
        color: 'red',
        fontSize: 18,
        fontStyle: 'italic',
        marginLeft: '-30%',
        marginTop: 20
    },
    buttonContainer: {
        marginTop: 10,
        width: '90%',
        height: windowHeight / 15,
        padding: 10,
        flexDirection: 'row',
        borderRadius: 3
    },
    iconWrapper: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontWeight: 'bold'
    },
    btnTxtWarpper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})

