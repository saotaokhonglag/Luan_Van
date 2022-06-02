import React, { useState } from 'react';
import {
    SafeAreaView,
    ImageBackground,
    View, Dimensions,
    FlatList,
    StyleSheet,
    StatusBar, Image,
    TouchableOpacity
} from 'react-native';
import { Text } from 'react-native-paper'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../contants/theme'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { nameValidator } from '../../helpers/nameValidator';
import GoogleButton from '../../components/GoogleButton';
import Background from '../../components/Background';



const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function Signup({ navigation }) {


    const [name, setName] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })

    async function Signup() {
        const nameError = nameValidator(name.value)
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError || nameError) {
            setName({ ...name, error: nameError })
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }
        navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
        })
    }

    return (
       
        <Background>
            <StatusBar barStyle="light-content" />
            <Logo />
            <Header>Create Account</Header>
            <BackButton goBack={navigation.goBack} />

            <TextInput
                label="Name"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            <Button
                mode="contained"
                onPress={Signup}
                style={{ marginTop: 24 }}
            >
                Sign Up
            </Button>
            <View style={styles.row}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('Login')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </Background>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFF'
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
})

