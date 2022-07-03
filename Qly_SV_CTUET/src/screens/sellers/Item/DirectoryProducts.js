import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import Swipeout from "react-native-swipeout";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../../store/GlobalContext";
const DirectoryProducts = ({ info }) => {
  const { ModalVisibleDirectory, setModalVisibleDirectory, id_sp, setId_sp } =
    useUser();
  const navigation = useNavigation();
  const {
    image,
    idsp,
    tensp,
    id_DV,
    idDanhMuc,
    soluong,
    gia,
    TrangThai,
    donvi,
  } = info;
  async function onPressDelete() {
    setModalVisibleDirectory(true);
    setId_sp(info.idsp);
  }
  var swipeoutBtns = [
    {
      backgroundColor: "red",
      text: "Xóa",
      onPress: onPressDelete,
    },
  ];
  return (
    <Swipeout left={swipeoutBtns} style={styles.products}>
      <View style={styles.imageProducts}>
        {image != "" ? (
          <ImageBackground
            source={{
              uri: image,
            }}
            style={{ height: 65, width: 65 }}
          />
        ) : (
          <ImageBackground
            source={require("../../../image/imagenull.jpg")}
            style={{ height: 65, width: 65 }}
          />
        )}

        <View style={{ width: 200 }}>
          <Text style={{ paddingLeft: 20, fontSize: 20 }}>{tensp}</Text>
          <Text style={{ fontSize: 15, paddingLeft: 20, marginTop: 5 }}>
            {gia.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}đ
          </Text>
        </View>
        <View style={styles.priceProducts}>
          <Text
            style={{
              fontSize: 18,
              fontStyle: "italic",
              color: soluong <= 5 ? "red" : "black",
            }}
          >
            Số lượng
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontStyle: "italic",
              color: soluong <= 5 ? "red" : "black",
            }}
          >
            {soluong}
          </Text>
        </View>
      </View>
    </Swipeout>
  );
};

export default DirectoryProducts;

const styles = StyleSheet.create({
  products: {
    width: "100%",
    height: 80,
    backgroundColor: "#fff",
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  imageProducts: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
  },
  priceProducts: {
    width: 100,
    alignItems: "flex-end",
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
