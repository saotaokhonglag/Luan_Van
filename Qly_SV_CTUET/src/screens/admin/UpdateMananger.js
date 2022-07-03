import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Alert,
  Modal,
  Pressable,
  Dimensions,
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
  updateDoc,
} from "firebase/firestore";
import { phoneNumberValidator } from "../../helpers/phoneNumberValidator";
import { nameValidator } from "../../helpers/nameValidator";
import moment from "moment";
import { useUser } from "../../store/GlobalContext";
const { width, height } = Dimensions.get("window");
const UpdateManangeritem = ({ navigation, route }) => {
  const item = route.params;
  const {
    loginPending,
    setLoginPending,
    ModalVisibleDeleteMananger,
    setModalVisibleDeleteMananger,
  } = useUser();
  const [dataDV, setDataDV] = useState([]);
  const [name, setName] = useState({ value: item.hovaten, error: "" });
  const [SDT, setSDT] = useState({ value: item.sdt, error: "" });
  const [service, setService] = useState("");

  useEffect(() => {
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
      setLoginPending(true);
      let dt = "";
      let dv = "";
      const docSnap = await getDocs(docRef);
      docSnap.forEach((d) => {
        dt = d.data().sdt;
      });
      const docSnap2 = await getDocs(docRef2);
      docSnap2.forEach((d) => {
        dv = d.data().id_DV;
      });
      if (dv !== "") {
        Alert.alert(
          "Cập nhật không thành công",
          "Dịch vụ đã có người đăng ký rồi! Vui lòng chọn dịch khác!"
        );
      } else {
        setLoginPending(true);
        try {
          updateDoc(doc(db, "quanly", item.id_NV), {
            hovaten: name.value,
            sdt: SDT.value,
            id_DV: service,
          });
          setLoginPending(false);
          Alert.alert("Thông Báo", "Cập nhật viên thành công!");
          navigation.goBack();
        } catch (error) {
          Alert.alert(`Lỗi: ${error.message}`, `Lỗi: ${error.message}`);
        }
        setLoginPending(false);
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
            defaultValue={item.id_DV}
            onSelect={(selectedItem, index) => {
              // setService(selectedItem);
              setService(selectedItem.id_DV);
              console.log(item.id_DV);
            }}
            defaultButtonText={"Chọn dịch vụ"}
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
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Cập nhật
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateManangeritem;

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
    width: "100%",
    height: 60,
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
});
