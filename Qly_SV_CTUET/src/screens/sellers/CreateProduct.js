import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  Alert,
} from "react-native";
import ShowQrCodeModal from "../../components/Modals/ShowQrCodeModal";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { theme } from "../../contants/theme";
import { useUser } from "../../store/GlobalContext";
import { db } from "../../../firebase_config";
import SelectDropdown from "react-native-select-dropdown";
import TextInput from "../../components/TextInput";
import { numberValidator } from "../../helpers/numberValidate";
import { nameValidator } from "../../helpers/nameValidator";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";
import {
  collection,
  onSnapshot,
  query,
  setDoc,
  doc,
  where,
} from "firebase/firestore";
import moment from "moment";
import AppLoader from "../../components/AppLoader";

const { width } = Dimensions.get("window");
const CreateProduct = ({ navigation }) => {
  const { setQrcode, setLoginPending, loginPending, ManangerProfile } =
    useUser();
  const [ModalVisible, setModalVisible] = useState(false);
  const [idSP, setIdSP] = useState();
  const [qty, setQty] = useState({ value: "", error: "" });
  const [productName, setProductName] = useState({ value: "", error: "" });
  const [price, setPrice] = useState({ value: "", error: "" });
  const [idDirectory, setIdDirectory] = useState({ value: "", error: "" });
  const [directoryData, setDirectoryData] = useState();
  const [image, setImage] = useState("");

  useEffect(() => {
    {
      async () => {
        if (Platform.OS != "web") {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          const { status2 } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("Xin lỗi chúng tôi gần quyền truy cập máy ảnh");
          }
          if (status2 !== "granted") {
            alert("Xin lỗi chúng tôi gần quyền truy cập máy ảnh");
          }
        }
      };
    }
    getIdSP();
    getDirectory();
    return () => {};
  }, [loginPending]);
  async function getIdSP() {
    setIdSP("SP" + moment().format("DDMMYYYHHmmss"));
  }
  const CancelModal = (bool) => {
    setModalVisible(bool);
    navigation.navigate("Product");
  };
  async function getDirectory() {
    const ref = query(
      collection(db, "danhmuc"),
      where("id_DV", "==", ManangerProfile.id_DV)
    );
    const unsubscribe = await onSnapshot(ref, (querySnapshot) => {
      const stock = [];
      querySnapshot.forEach((d) => {
        stock.push(d.data());
      });
      setDirectoryData(stock);
    });
  }
  const onPressThemSP = async () => {
    const qtyErr = numberValidator(qty.value);
    const pricerErr = numberValidator(price.value);
    const nameErr = nameValidator(productName.value);
    if (nameErr || qtyErr || pricerErr) {
      setPrice({ ...price, error: pricerErr });
      setQty({ ...qty, error: qtyErr });
      setProductName({ ...productName, error: nameErr });
    } else {
      if (image != "") {
        setLoginPending(true);
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
        const fileRef = ref(getStorage(), "image/sanpham/" + idSP);
        const result2 = await uploadBytes(fileRef, blob);

        getDownloadURL(fileRef).then((url) => {
          setDoc(doc(db, "sanpham", idSP), {
            gia: parseInt(price.value),
            tensp: productName.value,
            soluong: parseInt(qty.value),
            idsp: idSP,
            id_DV: ManangerProfile.id_DV,
            idDanhMuc: !idDirectory.value ? idDirectory : "",
            image: url,
            TrangThai: 1,
          });
          setLoginPending(false);
          Alert.alert("Thông Báo", "Thêm sản phẩm thành công!");
          setQrcode(idSP);
          setModalVisible(true);
          blob.close();
          return url;
        });
      } else {
        try {
          setDoc(doc(db, "sanpham", idSP), {
            gia: parseInt(price.value),
            tensp: productName.value,
            soluong: parseInt(qty.value),
            idsp: idSP,
            id_DV: ManangerProfile.id_DV,
            idDanhMuc: !idDirectory.value ? idDirectory : "",
            image: "",
            TrangThai: 1,
          });
          setLoginPending(false);
          setQrcode(idSP);
          setModalVisible(true);
        } catch (err) {
          alert(err);
        }
      }
    }
  };
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
  async function pickImageCamera() {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  }
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: "#FFFF",
        }}
      >
        <Modal
          visible={ModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => ModalVisible(false)}
        >
          <ShowQrCodeModal cancelModal={CancelModal} />
        </Modal>

        <View
          style={{
            width: width - 20,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            height: 150,
            marginBottom: 10,
          }}
        >
          <View>
            <TouchableOpacity
              onPress={() => pickImage()}
              style={styles.addButton}
            >
              <Image
                source={require("../../image/add-image.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={styles.text}>Thư viện</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => pickImageCamera()}
              style={styles.addButton}
            >
              <Image
                source={require("../../image/add-image.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={styles.text}>Chụp ảnh</Text>
            </TouchableOpacity>
          </View>

          <Image
            source={{
              uri: image != "" ? image : null,
            }}
            style={{ width: 150, height: 150, marginTop: 20 }}
          />
        </View>
        <TextInput
          label="Tên sản phẩm"
          returnKeyType="next"
          value={productName.value}
          onChangeText={(text) => setProductName({ value: text, error: "" })}
          error={!!productName.error}
          errorText={productName.error}
        />
        <TextInput
          label="Số lượng"
          returnKeyType="next"
          value={qty.value}
          onChangeText={(text) => setQty({ value: text, error: "" })}
          error={!!qty.error}
          errorText={qty.error}
          autoCapitalize="none"
          keyboardType="numeric"
        />
        <TextInput
          label="Giá"
          returnKeyType="next"
          value={price.value}
          onChangeText={(text) => setPrice({ value: text, error: "" })}
          error={!!price.error}
          errorText={price.error}
          autoCapitalize="none"
          keyboardType="numeric"
        />

        <SelectDropdown
          data={directoryData}
          defaultValue={"Nước uống"}
          onSelect={(selectedItem, index) => {
            setIdDirectory(selectedItem.idDanhMuc);
          }}
          defaultButtonText={"Danh mục"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.TenDanhMuc;
          }}
          rowTextForSelection={(item, index) => {
            return item.TenDanhMuc;
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

        <TouchableOpacity
          onPress={() => onPressThemSP()}
          style={styles.createButton}
        >
          <Text style={{ color: "#FFFF", fontSize: 18, fontWeight: "bold" }}>
            Tạo sản phẩm
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      {loginPending ? <AppLoader /> : null}
    </>
  );
};
const styles = StyleSheet.create({
  addButton: {
    width: 150,
    height: 50,
    borderRadius: 10,
    borderWidth: 0.4,
    alignItems: "center",
    marginTop: 20,
    padding: 5,
    backgroundColor: "white",
    borderColor: "#2F85F8",
    flexDirection: "row",
  },
  addView: {
    width: 370,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    marginLeft: 10,
    padding: 5,
    backgroundColor: "white",
    borderColor: "black",
    flexDirection: "row",
  },
  addView1: {
    width: 170,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    padding: 5,
    backgroundColor: "white",
    borderColor: "black",
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
    color: "#2F85F8",
    marginLeft: 10,
  },
  textv: {
    fontSize: 16,
    color: "#B5B5B5",
    marginLeft: 20,
    alignItems: "center",
  },
  createButton: {
    height: 50,
    width: width - 20,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
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
});
export default CreateProduct;
