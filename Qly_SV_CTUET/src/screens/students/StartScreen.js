import React, {useContext, useEffect, useState} from 'react'
import { userContext } from '../../store/GlobalContext'
import * as AuthSession from 'expo-auth-session/providers/google';
import * as Webrowser from 'expo-web-browser'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import Paragraph from '../../components/Paragraph'
import GoogleButton from '../../components/GoogleButton'

Webrowser.maybeCompleteAuthSession();

export default function StartScreen({ navigation }) {

  const { userInfo, setUserInfo } = useContext(userContext);
  const [accessToken, setAccsessToken] = useState();
  const [message, setMessage] = useState();

  const [request, response, promptAsync] = AuthSession.useAuthRequest({
    expoClientId: '385017465134-tuhp77593dqr9mnofi0b88p82ag64v31.apps.googleusercontent.com',
    iosClientId: '385017465134-ue897foc4lk2744md7jh8rah9g0bkd99.apps.googleusercontent.com',
    androidClientId: '385017465134-sbe34ahor5c2vg4ihq2r43nmni7bh7t6.apps.googleusercontent.com',
  });


  useEffect(() => {
    if (response?.type === 'success') {
      setAccsessToken(response.authentication.accessToken)
      UserData()
    }
    
  }, [response, accessToken]);

  async function UserData() {
    if (accessToken != null) {
      let userInfoResponse =await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      userInfoResponse.json().then(data => {
        setUserInfo(data);
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomePage' }],
        })
      });
    }
  }

  async function LoginWithGoogle() {
    promptAsync({ showInRecents: true })
  }

  async function checkUser(userid) {
    const docRef = doc(db, "sinhvien", userid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      navigation.navigate('HomePage')
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!: ", userid);
    }
}
  return (

    <Background>
      <Logo />
      <Header>Student Service Management</Header>
      <Paragraph>
        Ứng dụng dành cho sinh viên
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login')}
      >
        Đăng nhập
      </Button>
      <GoogleButton onPress={()=> LoginWithGoogle()}/>
    </Background>

  )
}
