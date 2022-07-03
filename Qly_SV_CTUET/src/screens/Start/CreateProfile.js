import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  TouchableHighlight,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import SelectDropdown from "react-native-select-dropdown";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import Background from "../../components/Background";
import Button from "../../components/Button";
import { userContext } from "../../store/GlobalContext";
import { phoneNumberValidator } from "../../helpers/phoneNumberValidator";
import { nameValidator } from "../../helpers/nameValidator";
import { db } from "../../../firebase_config";
import { collection, getDoc, doc, setDoc } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import AppLoader from "../../components/AppLoader";

const { width, height } = Dimensions.get("window");

const CreateProfile = ({ navigation }) => {
  const {
    userInfo,
    genders,
    classs,
    setUserProfile,
    userProfile,
    loginPending,
    setLoginPending,
    setWalletBalance,
  } = useContext(userContext);

  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [show, setShow] = useState(false);

  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: userInfo.email, error: "" });
  const [phone, setPhone] = useState({ value: "", error: "" });
  const [gender, setGender] = useState("Nam");
  const [course, setCourse] = useState("HTTT0118");

  const onChange = (e, selectedDate) => {
    setDate(moment(selectedDate || date).format("YYYY-MM-DD"));
    setShow(Platform.OS === "ios" ? true : false);
  };

  async function Signup() {
    const phoneError = phoneNumberValidator(phone.value);
    const nameErr = nameValidator(name.value);
    if (phoneError) {
      setName({ ...name, error: nameErr });
      setPhone({ ...phone, error: phoneError });
      return;
    } else {
      setLoginPending(true);
      const citiesRef = collection(db, "sinhvien");
      await setDoc(doc(citiesRef, userInfo.id), {
        iduser: userInfo.id,
        hovaten: name.value,
        gioitinh: gender,
        ngaysinh: date,
        lop: course,
        sdt: phone.value,
        image: userInfo.picture,
      });
      const docRef = doc(db, "sinhvien", userInfo.id);
      await setDoc(doc(docRef, "vi", userInfo.id), {
        sodu: 0,
      });
      setWalletBalance(0);
      setUserProfile({
        iduser: userInfo.id,
        hovaten: name.value,
        gioitinh: gender,
        ngaysinh: date,
        lop: course,
        sdt: phone.value,
        image: userInfo.picture,
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "HomePage" }],
      });
      setLoginPending(false);
    }
  }

  return (
    <>
      <Background>
        <Header>VUI LÒNG ĐIỀN ĐẦY ĐỦ THÔNG TIN</Header>
        <TextInput
          label="Họ và tên"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: "" })}
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          label="Email"
          returnKeyType="next"
          value={userInfo.email}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          editable={false}
        />
        <TextInput
          label="Số điện thoại"
          returnKeyType="next"
          value={phone.value}
          onChangeText={(text) => setPhone({ value: text, error: "" })}
          error={!!phone.error}
          errorText={phone.error}
          autoCapitalize="none"
          autoCompleteType="tel"
          textContentType="telephoneNumber"
          keyboardType="numeric"
          maxLength={10}
        />
        <View
          style={{
            justifyContent: "flex-start",
            width: width - 45,
            marginBottom: -5,
          }}
        >
          <Text style={{ fontSize: 15 }}>Lớp</Text>
        </View>
        <SelectDropdown
          data={classs}
          defaultValue={"HTTT0118"}
          onSelect={(selectedItem, index) => {
            setCourse(selectedItem);
          }}
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
        <View
          style={{
            justifyContent: "flex-start",
            width: width - 45,
            marginBottom: -5,
          }}
        >
          <Text style={{ fontSize: 15 }}>Giới tính</Text>
        </View>
        <SelectDropdown
          data={genders}
          defaultValue={"Nam"}
          onSelect={(selectedItem, index) => {
            setGender(selectedItem);
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
        <View
          style={{
            justifyContent: "flex-start",
            width: width - 45,
            marginBottom: -5,
          }}
        >
          <Text style={{ fontSize: 15 }}>Ngày sinh</Text>
        </View>

        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => setShow(true)}
          style={styles.textViewStyle}
        >
          <View style={styles.textStyle}>
            <Text style={{ fontSize: 16 }}>{date}</Text>
            <AntDesign name="calendar" size={25} />
          </View>
        </TouchableHighlight>
        {show && (
          <DateTimePicker
            value={new Date(date)}
            mode="date"
            minimumDate={
              new Date(moment().subtract(120, "years").format("YYYY-MM-DD"))
            }
            maximumDate={new Date(moment().format("YYYY-MM-DD"))}
            onChange={onChange}
          ></DateTimePicker>
        )}
        <Button
          mode="contained"
          onPress={() => Signup()}
          style={{ marginTop: 24 }}
        >
          Hoàn tất
        </Button>
      </Background>
      {loginPending ? <AppLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFF",
  },
  dropdown1BtnStyle: {
    width: "100%",
    height: 55,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderWidth: 1,
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
    width: "100%",
    height: 55,
    borderColor: "#414757",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 12,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  textStyle: {
    width: "100%",
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
});

export default CreateProfile;
