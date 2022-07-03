import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const orderItems = ({ info }) => {
  const navigation = useNavigation();
  const { id, idsp, tensp, gia, image, soluong, trangthai } = info;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("EditPd", {
          id: info.id,
          idsp: info.idsp,
          name: info.tensp,
          price: info.gia,
          quantity: info.soluong,
          TrangThai: info.trangthai,
          img: info.image,
          totals: info.gia * info.soluong,
        });
      }}
      style={styles.products}
    >
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
        <Text style={{ paddingLeft: 20, fontSize: 15, width: 130 }}>
          {tensp}
        </Text>
      </View>
      <View style={styles.priceProducts}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 20, paddingStart: 30 }}>
            {gia.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}đ
          </Text>
          <Text style={{ fontSize: 18, marginLeft: 10, marginTop: 2 }}>
            Số lượng: {soluong}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  products: {
    width: "100%",
    height: 80,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  imageProducts: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceProducts: {
    alignContent: "center",
    width: 200,
  },
});

export default orderItems;
