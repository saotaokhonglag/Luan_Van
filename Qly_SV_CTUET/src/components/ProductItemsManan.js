import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import Swipeout from "react-native-swipeout";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../store/GlobalContext";
const ProductItemsManan = ({ info }) => {
  const navigation = useNavigation();
  const { ModalVisible, setModalVisible } = useUser();
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
    setModalVisible(true);
  }

  async function onPressEdit() {
    navigation.navigate("EditProduct");
  }
  var swipeoutBtns = [
    {
      backgroundColor: "red",
      text: "Xóa",
      onPress: onPressDelete,
    },
    {
      backgroundColor: "green",
      text: "Sửa",
      onPress: onPressEdit,
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
            source={require("../screens/image/imagenull.jpg")}
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

export default ProductItemsManan;

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
});
