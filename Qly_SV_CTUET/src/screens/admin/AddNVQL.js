import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TextInput from "../../components/TextInput";
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
  getDocs,
  getDoc,
  where,
} from "firebase/firestore";
import { phoneNumberValidator } from "../../helpers/phoneNumberValidator";
import { nameValidator } from "../../helpers/nameValidator";
import moment from "moment";
import { useUser } from "../../store/GlobalContext";

const AddNVQL = ({ navigation }) => {
  const { loginPending, setLoginPending } = useUser();
  const [dataDV, setDataDV] = useState([]);
  const [TenTK, setTenTK] = useState({ value: "", error: "" });
  const [MK, setMK] = useState({ value: "", error: "" });
  const [name, setName] = useState({ value: "", error: "" });
  const [SDT, setSDT] = useState({ value: "", error: "" });
  const [service, setService] = useState("");

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
    const phoneError = phoneNumberValidator(SDT.value);
    const nameErr = nameValidator(name.value);
    const docRef = query(
      collection(db, "quanly"),
      where("sdt", "==", SDT.value)
    );
    const docRef2 = query(
      collection(db, "quanly"),
      where("id_DV", "==", service)
    );
    if (phoneError || nameErr || service == "") {
      setName({ ...name, error: nameErr });
      setSDT({ ...SDT, error: phoneError });
    } else {
      let dv = "";
      let dt = "";
      const docSnap = await getDocs(docRef);
      docSnap.forEach((d) => {
        dt = d.data().sdt;
      });
      const docSnap2 = await getDocs(docRef2);
      docSnap2.forEach((d) => {
        dv = d.data().id_NV;
      });
      if (dt !== "") {
        Alert.alert(
          "Trùng số điện thoại",
          "Số điện thoại này đã có người sử dụng"
        );
      } else {
        if (dv !== "") {
          Alert.alert(
            "Không thành công!",
            "Dịch vụ này được nhân viên khác sở hữu"
          );
        } else {
          setLoginPending(true);
          try {
            await setDoc(doc(db, "taikhoan", TenTK.value), {
              username: TenTK.value,
              password: md5(MK.value),
            });
            await setDoc(doc(db, "quanly", TenTK.value), {
              id_NV: TenTK.value,
              id_DV: service,
              hovaten: name.value,
              sdt: SDT.value,
              TrangThai: 1, //? Trạng thái = 1 còn, = 0 đã xóa
            });
            const docRef2 = doc(db, "quanly", TenTK.value);
            await setDoc(doc(docRef2, "vi", TenTK.value), {
              sodu: 0,
            });
            setLoginPending(false);
            Alert.alert("Thông Báo", "Thêm nhân viên thành công!");
            setMK({ value: "", error: "" });
            setSDT({ value: "", error: "" });
            setName({ value: "", error: "" });
          } catch (error) {
            Alert.alert(`Lỗi: ${error.message}`, `Lỗi: ${error.message}`);
          }
        }
      }
    }
  };
  return (
    <SafeAreaView>
      <View style={{ marginTop: 25, paddingHorizontal: 20 }}>
        <View>
          <TextInput
            label="Họ và tên"
            returnKeyType="next"
            value={name.value}
            onChangeText={(text) => setName({ value: text, error: "" })}
            error={!!name.error}
            errorText={name.error}
          />
        </View>
        <View>
          <TextInput
            label="Username"
            returnKeyType="next"
            value={TenTK.value}
            onChangeText={(text) => setTenTK({ value: text, error: "" })}
            error={!!TenTK.error}
            editable={false}
            errorText={TenTK.error}
          />
        </View>
        <View>
          <TextInput
            label="Password"
            returnKeyType="next"
            value={MK.value}
            onChangeText={(text) => setMK({ value: text, error: "" })}
            error={!!MK.error}
            errorText={MK.error}
          />
        </View>
        <View>
          <TextInput
            label="Số điện thoại"
            returnKeyType="next"
            value={SDT.value}
            onChangeText={(text) => setSDT({ value: text, error: "" })}
            error={!!SDT.error}
            errorText={SDT.error}
            autoCapitalize="none"
            autoCompleteType="tel"
            textContentType="telephoneNumber"
            keyboardType="numeric"
            maxLength={10}
          />
        </View>
        <View>
          <SelectDropdown
            data={dataDV}
            defaultValue={""}
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
          {service == "" ? (
            <Text style={{ color: "red" }}>Vui lòng chọn loại dịch vụ</Text>
          ) : null}
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
    width: "100%",
    height: 60,
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
