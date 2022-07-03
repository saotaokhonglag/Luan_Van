import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import CusDSQL from "./Item/CusDSQL.js";
import { db } from "../../../firebase_config.js";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useUser } from "../../store/GlobalContext.js";
const { width, height } = Dimensions.get("window");
const DSQL = ({ navigation }) => {
  const [data, getData] = useState([]);
  const { ModalVisibleDeleteMananger, setModalVisibleDeleteMananger, id_sp } =
    useUser();

  async function GetDATA() {
    const citiesRef = collection(db, "quanly");

    const ref = query(citiesRef);
    const unsubscribe = await onSnapshot(ref, (querySnapshot) => {
      const stock = [];
      querySnapshot.forEach((d) => {
        stock.push(d.data());
      });
      getData(stock);
    });
  }

  useEffect(() => {
    GetDATA();
  }, []);
  async function OkDelete() {
    data.find((item) => {
      if (item.id_NV == id_sp) {
        deleteDoc(doc(db, "taikhoan", item.id_NV));
        updateDoc(doc(db, "quanly", item.id_NV), {
          TrangThai: 0,
          id_DV: "",
        });
        return item;
      } else {
        console.log("none");
      }
    });
    setModalVisibleDeleteMananger(false);
  }
  async function cancelModal() {
    setModalVisibleDeleteMananger(false);
  }
  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisibleDeleteMananger}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Xóa nhân viên sẽ xóa toàn bộ sản phẩm của nhân viên?{" "}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Pressable
              style={[styles.buttonModal, styles.buttonOk]}
              onPress={OkDelete}
            >
              <Text style={styles.textStyle}>Xác Nhận</Text>
            </Pressable>
            <Pressable
              style={[styles.buttonModal, styles.buttonCancel]}
              onPress={cancelModal}
            >
              <Text style={styles.textStyle}>Từ Chối</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View
        style={{
          width: "100%",
          height: Dimensions.get("window").height - 150,
        }}
      >
        <FlatList
          keyExtractor={(item) => item.id_NV}
          data={data}
          renderItem={({ item: data }) => {
            return <CusDSQL {...data} info={data} />;
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          height: 80,
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NVQL");
          }}
          style={styles.button}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Thêm nhân viên</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lineLeft: {
    fontSize: 20,
    color: "#333333",
    marginLeft: 5,
    fontWeight: "800",
  },
  button: {
    width: Dimensions.get("window").width - 20,
    height: 60,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#18A2EB",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonOk: {
    backgroundColor: "#2196F3",
    marginRight: 30,
  },
  addButton: {
    width: 195,
    height: 50,
    borderRadius: 100 / 2,
    borderWidth: 0.4,
    backgroundColor: "white",
    marginStart: "45%",
    marginTop: height / 2 + 100,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#2F85F8",
  },
  infoBox: {
    width: "100%",
    height: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    marginTop: "100%",
    elevation: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: width - 20,
    marginLeft: 10,
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
    width: 100,
    alignItems: "center",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    marginLeft: 0,
    color: "#FFFF",
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
export default DSQL;
