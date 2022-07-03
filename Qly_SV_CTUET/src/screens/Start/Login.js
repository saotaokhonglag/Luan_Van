import React, { useEffect, useContext, useState } from "react";
import {
  SafeAreaView,
  ImageBackground,
  View,
  Dimensions,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAsome from "react-native-vector-icons/FontAwesome";
import * as AuthSession from "expo-auth-session/providers/google";
import * as Webrowser from "expo-web-browser";
import { userContext } from "../../store/GlobalContext";
import { db } from "../../../firebase_config";
import {
  collection,
  addDoc,
  query,
  getDoc,
  onSnapshot,
  where,
  doc,
  getDocs,
} from "firebase/firestore";
import { LogBox } from "react-native";
import { Text } from "react-native-paper";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import BackButton from "../../components/BackButton";
import { theme } from "../../contants/theme";
import { userNameValidator } from "../../helpers/userNameValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import md5 from "../../helpers/md5";
import AppLoader from "../../components/AppLoader";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
Webrowser.maybeCompleteAuthSession();

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Login = ({ navigation }) => {
  const { loginPending, setLoginPending, setManangerProfile } =
    useContext(userContext);
  const [userName, setUserName] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onLoginPressed = async () => {
    const userNameError = userNameValidator(userName.value);
    const passwordError = passwordValidator(password.value);
    if (userNameError || passwordError) {
      setUserName({ ...userName, error: userNameError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoginPending(true);
    const docRef = query(
      collection(db, "taikhoan"),
      where("username", "==", userName.value),
      where("password", "==", md5(password.value))
    );
    const data = await getDocs(docRef);
    let check = "";
    data.forEach((doc) => {
      check = doc.data().username;
    });
    if (check != "") {
      if (userName.value == "adminctut123") {
        navigation.reset({
          index: 0,
          routes: [{ name: "AdminPage" }],
        });
      } else {
        const ref = doc(db, "quanly", check);
        const docSnap = await getDoc(ref);
        if (docSnap.data() !== undefined) {
          setManangerProfile(docSnap.data());
          navigation.reset({
            index: 0,
            routes: [{ name: "HomePageSeller" }],
          });
        }
      }
    } else {
      Alert.alert(
        "Tài khoản không tồn tại!",
        "Username hoặc mật khẩu không đúng. Vui lòng kiểm tra và thử lại."
      );
    }
    setLoginPending(false);
  };

  return (
    <>
      <Background>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Đăng nhập</Header>
        <TextInput
          label="Username"
          returnKeyType="next"
          value={userName.value}
          onChangeText={(text) => setUserName({ value: text, error: "" })}
          error={!!userName.error}
          errorText={userName.error}
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <Button mode="contained" onPress={onLoginPressed}>
          Login
        </Button>
      </Background>
      {loginPending ? <AppLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default Login;
