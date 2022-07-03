import React, { useEffect, useState } from "react";
import { useUser } from "../../store/GlobalContext";
import * as AuthSession from "expo-auth-session/providers/google";
import * as Webrowser from "expo-web-browser";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import { emailValidator } from "../../helpers/emailValidator";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";
import GoogleButton from "../../components/GoogleButton";
import { Alert, LogBox } from "react-native";
import { db } from "../../../firebase_config";
import { collection, query, getDoc, onSnapshot, doc } from "firebase/firestore";
import AppLoader from "../../components/AppLoader";

Webrowser.maybeCompleteAuthSession();
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

export default function StartScreen({ navigation }) {
  const {
    setUserInfo,
    setUserProfile,
    loginPending,
    setLoginPending,
    setWalletBalance,
  } = useUser();
  const [rep, setRep] = useState(false);

  const [request, response, promptAsync] = AuthSession.useAuthRequest({
    expoClientId:
      "385017465134-tuhp77593dqr9mnofi0b88p82ag64v31.apps.googleusercontent.com",
    iosClientId:
      "385017465134-ue897foc4lk2744md7jh8rah9g0bkd99.apps.googleusercontent.com",
    androidClientId:
      "385017465134-sbe34ahor5c2vg4ihq2r43nmni7bh7t6.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      UserData();
    }
  }, [response, rep]);

  async function UserData() {
    setLoginPending(true);
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: {
          Authorization: `Bearer ${response.authentication.accessToken}`,
        },
      }
    );
    userInfoResponse.json().then((data) => {
      setUserInfo(data);
      checkUser(data.id, data.email);
    });
  }

  async function LoginWithGoogle() {
    promptAsync({ showInRecents: true });
    setRep(true);
  }

  async function checkUser(userid, userEmail) {
    const emailError = emailValidator(userEmail);
    if (emailError == false) {
      Alert.alert(
        "Thông báo!",
        "Vui lòng đăng nhập ứng dụng bằng email trường!"
      );
      setLoginPending(false);
      return;
    } else {
      const docRef = doc(db, "sinhvien", userid);
      const docSnap = await getDoc(docRef);
      if (docSnap.data() !== undefined) {
        const ref = query(collection(docRef, "vi"));
        const unsubscribe = await onSnapshot(ref, (querySnapshot) => {
          const stock = [];
          querySnapshot.forEach((d) => {
            stock.push(d.data());
          });
          stock.forEach((item) => {
            setWalletBalance(item.sodu);
          });
        });
        setUserProfile(docSnap.data());
        navigation.reset({
          index: 0,
          routes: [{ name: "HomePage" }],
        });
      } else {
        navigation.navigate("CreateProfile");
      }
    }
    setLoginPending(false);
  }
  return (
    <>
      <Background>
        <Logo />
        <Header>Student Service Management</Header>
        <Paragraph>Ứng dụng dành cho sinh viên</Paragraph>
        <Button mode="contained" onPress={() => navigation.navigate("Login")}>
          Đăng nhập với tài khoản khác
        </Button>
        <GoogleButton onPress={() => LoginWithGoogle()} />
      </Background>
      {loginPending ? <AppLoader /> : null}
    </>
  );
}
