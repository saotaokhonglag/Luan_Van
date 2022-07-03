import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ImageBackground,
  Pressable,
  Modal,
} from "react-native";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase_config";
import DirectoryProducts from "./Item/DirectoryProducts";
import { useUser } from "../../store/GlobalContext";

const { width, height } = Dimensions.get("window");
const CatalogDetails = ({ navigation, route }) => {
  const item = route.params;
  const { ModalVisibleDirectory, setModalVisibleDirectory, id_sp, setId_sp } =
    useUser();
  const [data, setData] = useState([]);
  const [Total, setTotal] = useState();

  useEffect(() => {
    let isApiSubscribed = true;
    getData();
    return () => {
      isApiSubscribed = false;
    };
  }, []);

  async function onPressDelete() {
    const ref = doc(db, "sanpham", id_sp);
    updateDoc(ref, {
      idDanhMuc: "",
    });
    setModalVisibleDirectory(false);
  }

  async function onPressCancel() {
    setModalVisibleDirectory(false);
  }
  async function getData() {
    const ref = query(
      collection(db, "sanpham"),
      where("idDanhMuc", "==", item.idDanhMuc),
      where("TrangThai", "==", 1)
    );
    const un = onSnapshot(ref, (querySnap) => {
      const data = [];
      let Total = 0;
      querySnap.forEach((d) => {
        data.push(d.data());
        Total += 1;
      });
      setTotal(Total);
      setData(data);
    });
  }

  const nullData = () => {
    return (
      <View
        style={{
          width: width,
          height: height - 200,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImageBackground
          source={require("../../image/unboxing.png")}
          style={{ height: 80, width: 80 }}
        />
        <Text
          style={{
            width: 200,
            textAlign: "center",
            fontSize: 18,
            color: "#ACACAC",
            marginTop: 10,
          }}
        >
          Không có sản phẩm nào trong danh mục này
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisibleDirectory}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Bạn có chắc muốn xóa sản phẩm khỏi danh mục?{" "}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={[styles.button, styles.buttonOk]}
              onPress={onPressDelete}
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
      <View style={styles.view}>
        <Text style={{ fontSize: 20 }}>
          {item.TenDanhMuc} ({Total})
        </Text>
      </View>
      <View style={{ width: width, height: height - 200 }}>
        {data.length > 0 ? (
          <FlatList
            keyExtractor={(item) => item.idsp}
            data={data}
            renderItem={({ item: data }) => {
              return <DirectoryProducts {...data} info={data} />;
            }}
          />
        ) : (
          nullData()
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  view: {
    height: 40,
    marginStart: 10,
    marginTop: 10,
    width: width - 20,
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
    alignItems: "center",
    justifyContent: "center",
    width: width,
    backgroundColor: "#FFFF",
    height: 100,
    position: "relative",
    borderTopWidth: 0.5,
    borderTopColor: "#dddddd",
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
});
export default CatalogDetails;
