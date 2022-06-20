import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import md5 from "../../helpers/md5";
import SelectDropdown from "react-native-select-dropdown";
import { db } from "../../../firebase_config";
import {
  doc,
  setDoc,
  query,
  onSnapshot,
  collection,
  addDoc,
} from "firebase/firestore";
import { phoneNumberValidator } from "../../helpers/phoneNumberValidator";
import { nameValidator } from "../../helpers/nameValidator";
import moment from "moment";

const AddNVQL = ({ navigation }) => {
  const [dataDV, setDataDV] = useState([]);
  const [TenTK, setTenTK] = useState({ value: "", error: "" });
  const [MK, setMK] = useState("");
  const [name, setName] = useState({ value: "", error: "" });
  const [SDT, setSDT] = useState({ value: "", error: "" });
  const [service, setService] = useState();

  useEffect(() => {
    createID();
    getDV();
    return () => {};
  }, []);

  async function getDV() {
    const ref = query(collection(db, "dichvu"));
    const unsubscribe = await onSnapshot(ref, (querySnapshot) => {
      let dv = [];
      querySnapshot.forEach((d) => {
        dv.push(d.data());
      });
      setDataDV(dv);
    });
  }
  async function createID() {
    setTenTK({ value: "NV" + moment().format("DDMMYYYHHmmss") });
  }

  const onPressDK = async () => {
    try {
      await addDoc(collection(db, "taikhoan"), {
        username: TenTK.value,
        password: md5(MK),
      });
      await setDoc(doc(db, "quanly", TenTK.value), {
        id_NV: TenTK.value,
        id_DV: service,
        hovaten: name.value,
        sdt: SDT.value,
        TrangThai: 1, //? Trạng thái = 1 còn, = 0 đã xóa
      });
      Alert.alert("Thông Báo", "Thêm nhân viên thành công!");
      navigation.navigate("DSQL");
    } catch (error) {
      Alert.alert(`Lỗi: ${error.message}`, `Lỗi: ${error.message}`);
    }
  };
  return (
    <SafeAreaView>
      <View style={{ marginTop: 25, paddingLeft: "8%" }}>
        <View>
          <Text style={styles.text}>Tên quản lý</Text>
          <TextInput
            onChangeText={(text) => setName({ value: text, error: "" })}
            value={name.value}
            style={styles.textinput}
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text style={styles.text}>Tên tài khoản</Text>
          <TextInput
            onChangeText={(text) => setTenTK({ value: text, error: "" })}
            value={TenTK.value}
            style={styles.textinput}
            autoCapitalize="none"
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        <View>
          <Text style={styles.text}>Mật khẩu</Text>
          <TextInput
            onChangeText={setMK}
            value={MK}
            style={styles.textinput}
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text style={styles.text}>Số điện thoại</Text>
          <TextInput
            onChangeText={(text) => setSDT({ value: text, error: "" })}
            value={SDT.value}
            style={styles.textinput}
            autoCapitalize="none"
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.text}>Loại dịch vụ</Text>
          <SelectDropdown
            data={dataDV}
            defaultValue={"Dich Vụ A"}
            onSelect={(selectedItem, index) => {
              // setService(selectedItem);
              setService(selectedItem.id_DV);
            }}
            defaultButtonText={"Loại dịch vụ"}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.tendv;
            }}
            rowTextForSelection={(item, index) => {
              return item.tendv;
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
        <View>
          <TouchableOpacity
            onPress={() => {
              onPressDK();
            }}
            style={styles.button}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Thêm nhân viên</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 20,
  },
  textinput: {
    backgroundColor: "white",
    width: "95%",
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    fontSize: 18,
    paddingLeft: 5,
  },
  button: {
    width: "60%",
    height: "30%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#18A2EB",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  dropdown1BtnStyle: {
    width: "95%",
    height: 50,
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
});

export default AddNVQL;
