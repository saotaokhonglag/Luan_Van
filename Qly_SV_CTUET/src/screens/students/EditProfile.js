import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  TouchableHighlight,
  Alert,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";
import AppLoader from "../../components/AppLoader";
import { Text } from "react-native-paper";
import { phoneNumberValidator } from "../../helpers/phoneNumberValidator";
import { useUser } from "../../store/GlobalContext";
import { theme } from "../../contants/theme";
import { db } from "../../../firebase_config";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";

const EditProfile = ({ navigation }) => {
  const {
    userInfo,
    userProfile,
    genders,
    setUserProfile,
    loginPending,
    setLoginPending,
  } = useUser();
  const [name, setName] = useState({ value: userProfile.hovaten, error: "" });
  const [phone, setPhone] = useState({ value: userProfile.sdt, error: "" });
  const [email, setEmail] = useState({ value: userInfo.email, error: "" });
  const [birthday, setBirthday] = useState(userProfile.ngaysinh);
  const [gioitinh, setGioitinh] = useState(userProfile.gioitinh);
  const [show, setShow] = useState(false);
  const [errorTextPhone, setErroTextPhone] = useState();
  const phoneError = phoneNumberValidator(phone.value);
  const [image, setImage] = useState(null);
  const onChange = (e, selectedDate) => {
    setBirthday(moment(selectedDate || date).format("YYYY-MM-DD"));
    setShow(Platform.OS === "ios" ? true : false);
  };

  useEffect(() => {
    {
      async () => {
        if (Platform.OS != "web") {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== "granted") {
            alert(
              "Xin lỗi, bạn chưa cấp quyền truy cập máy ảnh cho ứng dụng này!"
            );
          }
        }
      };
    }
    getProfile();
    return () => {};
  }, [loginPending]);

  async function getProfile() {
    const docRef = doc(db, "sinhvien", userProfile.iduser);
    const docSnap = await getDoc(docRef);
    if (docSnap.data() !== undefined) {
      setUserProfile(docSnap.data());
    }
  }
  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  }
  async function updateProfile() {
    if (phoneError) {
      setErroTextPhone(phoneError);
    } else {
      setLoginPending(true);
      if (image != null) {
        setErroTextPhone(null);
        const blob = await new Promise((reslove, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            reslove(xhr.response);
          };
          xhr.onerror = function () {
            reject(new TypeError("Network request faile"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", image, true);
          xhr.send(null);
        });
        const fileRef = ref(
          getStorage(),
          "image/sinhvien/" + userProfile.iduser
        );
        const result2 = await uploadBytes(fileRef, blob);

        getDownloadURL(fileRef).then((url) => {
          updateDoc(doc(db, "sinhvien", userProfile.iduser), {
            hovaten: name.value,
            sdt: phone.value,
            email: email.value,
            gioitinh: gioitinh,
            ngaysinh: birthday,
            image: url,
          });
          setUserProfile({
            iduser: userProfile.iduser,
            hovaten: name.value,
            sdt: phone.value,
            email: email.value,
            gioitinh: gioitinh,
            ngaysinh: birthday,
            image: image != null ? image : userProfile.image,
          });
          blob.close();
          return url;
        });
      } else {
        updateDoc(doc(db, "sinhvien", userProfile.iduser), {
          hovaten: name.value,
          sdt: phone.value,
          email: email.value,
          gioitinh: gioitinh,
          ngaysinh: birthday,
          image: userProfile.image,
        });
        setUserProfile({
          iduser: userProfile.iduser,
          hovaten: name.value,
          sdt: phone.value,
          email: email.value,
          gioitinh: gioitinh,
          ngaysinh: birthday,
          image: image != null ? image : userProfile.image,
        });
      }
      setLoginPending(false);
      Alert.alert("Thông báo", "Cập nhật thành công");
      navigation.goBack();
    }
  }
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2F85F8" />
        <View style={styles.circleShape}></View>
        <TouchableOpacity
          onPress={() => pickImage()}
          style={{ marginTop: -50 }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={{
                uri: !image ? userProfile.image : image,
              }}
              style={{ height: 100, width: 100 }}
              imageStyle={{ borderRadius: 100 / 2 }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="camera"
                  size={35}
                  color="#fff"
                  style={{
                    opacity: 0.7,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderRadius: 10,
                  }}
                />
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <View style={styles.menuWapper}>
          <TouchableOpacity>
            <View
              style={[
                styles.menuItem,
                {
                  borderTopColor: "#dddddd",
                  borderTopWidth: 1,
                },
              ]}
            >
              <FontAwesome
                name="user-o"
                color="#2F85F8"
                size={25}
                style={{ marginRight: 20 }}
              />
              <TextInput
                style={{
                  width: "90%",
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 18,
                }}
                placeholder={userProfile.hovaten}
                returnKeyType="next"
                value={name.value}
                mode="outlined"
                underlineColor="transparent"
                selectionColor={theme.colors.primary}
                onChangeText={(text) => setName({ value: text, error: "" })}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={[
                styles.menuItem,
                {
                  borderTopColor: "#dddddd",
                  borderTopWidth: 1,
                },
              ]}
            >
              <FontAwesome
                name="phone"
                color="#2F85F8"
                size={25}
                style={{ marginRight: 20 }}
              />
              <TextInput
                style={{
                  width: "90%",
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 18,
                }}
                placeholder={userProfile.sdt}
                returnKeyType="next"
                value={phone.value}
                mode="outlined"
                underlineColor="transparent"
                selectionColor={theme.colors.primary}
                onChangeText={(text) =>
                  setPhone({ value: text, error: phoneError })
                }
                keyboardType="numeric"
              />
            </View>
          </TouchableOpacity>
          <View
            style={[
              styles.menuItem,
              {
                borderTopColor: "#dddddd",
                borderTopWidth: 1,
              },
            ]}
          >
            <FontAwesome
              name="envelope-o"
              color="#2F85F8"
              size={25}
              style={{ marginRight: 20 }}
            />
            <Text style={{ fontSize: 18 }}>{userInfo.email}</Text>
          </View>

          <TouchableOpacity>
            <View
              style={[
                styles.menuItem,
                {
                  borderTopColor: "#dddddd",
                  borderTopWidth: 1,
                },
              ]}
            >
              <FontAwesome
                name="intersex"
                color="#2F85F8"
                size={25}
                style={{ marginRight: 8 }}
              />
              <SelectDropdown
                data={genders}
                defaultValue={userProfile.gioitinh}
                onSelect={(selectedItem, index) => {
                  setGioitinh(selectedItem);
                }}
                defaultButtonText={"Giới tính"}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={"#444"}
                      size={18}
                    />
                  );
                }}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShow(true)}>
            <View
              style={[
                styles.menuItem,
                {
                  borderTopColor: "#dddddd",
                  borderTopWidth: 1,
                },
              ]}
            >
              <MaterialIcons
                name="date-range"
                color="#2F85F8"
                size={25}
                style={{ marginRight: 10 }}
              />
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => setShow(true)}
                style={styles.textViewStyle}
              >
                <View style={styles.textStyle}>
                  <Text style={{ fontSize: 16 }}>{birthday}</Text>
                </View>
              </TouchableHighlight>
              {show && (
                <DateTimePicker
                  value={new Date(birthday)}
                  mode="date"
                  minimumDate={
                    new Date(
                      moment().subtract(120, "years").format("YYYY-MM-DD")
                    )
                  }
                  maximumDate={new Date(moment().format("YYYY-MM-DD"))}
                  onChange={onChange}
                ></DateTimePicker>
              )}
            </View>
          </TouchableOpacity>
          {errorTextPhone ? (
            <Text style={styles.error}>{errorTextPhone}</Text>
          ) : null}
        </View>
        <TouchableOpacity
          onPress={() => updateProfile()}
          style={styles.commandButton}
        >
          <Text style={styles.panelButtonTitle}>Hoàn thành</Text>
        </TouchableOpacity>
      </SafeAreaView>
      {loginPending ? <AppLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingStart: 20,
  },
  circleShape: {
    width: "100%",
    height: "20%",
    borderRadius: 110 / 2,
    backgroundColor: "#2F85F8",
    marginTop: -100,
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 20,
    paddingLeft: "10%",
  },
  profile: {
    width: "90%",
    height: 110,
    borderRadius: 40 / 2,
    backgroundColor: "#FFFFFF",
    marginTop: -45,
    borderWidth: 0.5,
    paddingLeft: 25,
    flexDirection: "row",
    paddingTop: 15,
  },
  infoBoxWapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
  },
  infoBox: {
    width: "50%",
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  menuItem: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingLeft: 10,
    alignItems: "center",
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontSize: 16,
  },
  menuWapper: {
    marginTop: 10,
    width: "100%",
  },
  commandButton: {
    width: "90%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#2F85F8",
    alignItems: "center",
    marginTop: 10,
  },
  panelButtonTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  dropdown1BtnStyle: {
    width: "87%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderColor: "#414757",
    marginVertical: 12,
  },
  dropdown1BtnTxtStyle: { color: "#414757", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#414757", textAlign: "left" },
  textViewStyle: {
    width: "80%",
    height: 50,
    alignItems: "flex-start",
    borderRadius: 5,
    marginVertical: 12,
    justifyContent: "center",
  },
  textStyle: {
    width: "80%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});

export default EditProfile;
