import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");

const confirmItems = ({ info }) => {
  const navigation = useNavigation();
  const { id, idsp, tensp, gia, image, soluong, trangthai } = info;

  return (
    <TouchableOpacity
      onPress={() => {
        console.log(gia);
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
        <Text style={{ paddingLeft: 20, fontSize: 15 }}>{tensp}</Text>
      </View>

      <View style={styles.priceProducts}>
        <Text style={{ ...styles.textProduct, fontWeight: "bold" }}>
          {gia.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
        </Text>
        <Text style={styles.textProduct}>x{soluong}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  products: {
    width: width,
    height: 80,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  priceProducts: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  textProduct: {
    fontSize: 18,
    color: "#FF0000",
  },
  imageProducts: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default confirmItems;
