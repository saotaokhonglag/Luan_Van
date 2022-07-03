import React, { useState, useContext, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useUser } from "../../store/GlobalContext";
import ProductItemsMananger from "./Item/ProductItemsMananger";
import { db } from "../../../firebase_config";
import {
  collection,
  query,
  where,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "EventEmitter.removeListener",
  "ViewPropTypes will be removed",
  "componentWillReceiveProps has been renamed",
]);
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const { height, width } = Dimensions.get("window");
const Product = ({ navigation }) => {
  const { ModalVisible, setModalVisible, id_sp, setId_sp, ManangerProfile } =
    useUser();
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    GetDATA();
  }, []);
  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          alignItems: "center",
          marginHorizontal: 50,
          marginTop: 20,
        }}
      >
        <Text style={styles.null}>Không có sản phẩm</Text>
      </View>
    );
  };
  async function onPressOk() {
    try {
      await updateDoc(doc(db, "sanpham", id_sp), {
        TrangThai: 0,
      });
      setModalVisible(false);
      Alert.alert("Thông Báo", "Xóa sản phẩm thành công!");
    } catch (error) {
      Alert.alert(`Lỗi: ${error.message}`, `Lỗi: ${error.message}`);
    }
  }
  async function onPressCancel() {
    setModalVisible(false);
  }
  function sumItem() {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += 1;
    }
    return sum;
  }
  async function GetDATA() {
    const citiesRef = collection(db, "sanpham");
    const q = query(
      citiesRef,
      where("id_DV", "==", ManangerProfile.id_DV),
      where("TrangThai", "==", 1)
    );
    const unsubscribe = await onSnapshot(q, (querySnapshot) => {
      const stock = [];
      querySnapshot.forEach((d) => {
        stock.push(d.data());
      });
      setData(stock);
    });
  }
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Modal animationType="slide" transparent={true} visible={ModalVisible}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Bạn có chắc muốn xóa sản phẩm? </Text>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={[styles.button, styles.buttonOk]}
              onPress={onPressOk}
            >
              <Text style={styles.textStyle}>Xác Nhận</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonCancel]}
              onPress={onPressCancel}
            >
              <Text style={styles.textCancel}>Từ Chối</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={{ width: "100%", height: width * 2 - 110 }}>
        <View style={styles.view}>
          <Text style={{ fontSize: 18, marginRight: 10 }}>
            {sumItem()} Sản phẩm
          </Text>
          <Feather
            name="info"
            size={25}
            color="#969696"
            style={{ marginHorizontal: 10 }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={{ color: "#969696" }}>
              Trượt sang trái để sửa sản phẩm!
            </Text>
            <Text style={{ color: "#969696" }}>
              Ấn vào sản phẩm để ẩn thanh trượt!
            </Text>
          </View>
        </View>
        <FlatList
          ListEmptyComponent={ListEmptyComponent}
          keyExtractor={(item) => item.idsp}
          data={data}
          renderItem={({ item: product }) => {
            return <ProductItemsMananger {...product} info={product} />;
          }}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("CreateProduct")}
        style={{
          backgroundColor: "#2F85F8",
          width: width - 20,
          height: 50,
          borderRadius: 10,
          borderWidth: 0.4,
          alignItems: "center",
          padding: 5,
          marginTop: width - 400,
        }}
      >
        <Text
          style={{
            color: "#FCF4F4FF",
            fontSize: 18,
            marginLeft: 10,
            marginTop: 5,
          }}
        >
          Thêm sản phẩm
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 80,
    width: width,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 16,
  },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 80,
  },
  null: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
  },
  lineLeft: {
    fontSize: 20,
    color: "#333333",
    marginLeft: 5,
    fontWeight: "bold",
  },
  view: {
    marginStart: 10,
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    marginTop: 250,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    border: 3,
    width: 120,
    marginHorizontal: 10,
    alignItems: "center",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonOk: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  textCancel: {
    color: "black",
    fontWeight: "bold",
  },
  buttonCancel: {
    backgroundColor: "white",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  cusImage: {
    width: 80,
    height: 90,
    borderRadius: 50 / 2,
    borderWidth: 0.4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  addButton: {
    marginLeft: 80,
    flexDirection: "row",
    width: "100%",
    height: "20%",
    marginTop: 50,
  },
});
export default Product;
