import React, { useEffect, useContext, useState } from 'react';
import {
  SafeAreaView,
  ImageBackground,
  View, Dimensions,
  FlatList,
  StyleSheet,
  StatusBar, Image,
  TouchableOpacity,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAsome from 'react-native-vector-icons/FontAwesome'
import * as AuthSession from 'expo-auth-session/providers/google';
import * as Webrowser from 'expo-web-browser'
import { userContext } from '../../store/GlobalContext'
import { db } from '../../../firebase_config'
import { collection, addDoc, query, getDoc, onSnapshot, where, doc } from 'firebase/firestore'
import { LogBox } from "react-native";
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../contants/theme'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import GoogleButton from '../../components/GoogleButton';


LogBox.ignoreLogs(["EventEmitter.removeListener"]);
Webrowser.maybeCompleteAuthSession();


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Login = ({ navigation }) => {

  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
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
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back</Header>
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
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default Login;