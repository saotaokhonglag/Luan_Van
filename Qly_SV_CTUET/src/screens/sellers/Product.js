import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
  Modal,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const { height, width } = Dimensions.get("window");
const data = [
  {
    TenSP: "Bún",
    Gia: "200.000",
    Hinh: "../image/hoc-nau-bun-dau-mo-quan.jpg",
  },
  {
    TenSP: "Mì",
    Gia: "200.000",
    Hinh: "../image/hoc-nau-bun-dau-mo-quan.jpg",
  },
  {
    TenSP: "Nước",
    Gia: "200.000",
    Hinh: "../image/hoc-nau-bun-dau-mo-quan.jpg",
  },
];
const Item = ({ TenSP, Gia, Hinh }, { navigation }) => (
  <TouchableOpacity
    style={{ flexDirection: "row", backgroundColor: "#ffffff", marginTop: 2 }}
  >
    <View style={{ flexDirection: "row" }}>
      <Image
        style={styles.cusImage}
        source={require("../image/hoc-nau-bun-dau-mo-quan.jpg")}
      />
      <View style={{ flexDirection: "column" }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 20 }}>
          {TenSP}
        </Text>
        <Text style={{ fontSize: 18, color: "#F6720B" }}>{Gia}</Text>
      </View>
    </View>
  </TouchableOpacity>
);
const Product = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <Item Gia={item.Gia} Hinh={item.Hinh} TenSP={item.TenSP} />
  );

  return (
    <SafeAreaView>
      <View style={styles.View}>
        <TouchableOpacity
          style={[styles.sbutton, { backgroundColor: "#2F85F8" }]}
        >
          <Text style={styles.Text}>Tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sbutton, { backgroundColor: "#FFFFFF" }]}
        >
          <Text style={styles.Text2}>Bún</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={data} renderItem={renderItem} />
      <TouchableOpacity style={styles.addButton}>
        <AntDesign
          name="plus"
          size={20}
          color="#FCF4F4FF"
          style={{ marginStart: 15 }}
        />
        <Text
          style={{
            color: "#FCF4F4FF",
            fontSize: 18,
            marginLeft: 10,
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
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    fontFamily: "sans-serif",
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
    width: 200,
    height: 50,
    borderRadius: 100 / 2,
    borderWidth: 0.4,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#2F85F8",
    marginTop: height / 3 - 20,
    marginStart: width / 2 - 20,
  },
  sbutton: {
    height: 25,
    width: 60,
    borderRadius: 4,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#707070",
    marginLeft: 10,
  },
  Text: {
    color: "#FFFFFF",
  },
  Text2: {
    color: "#2F85F8",
  },
  View: {
    height: 50,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  View2: {
    height: 50,
    flexDirection: "row",
    marginLeft: 320,
    marginTop: 10,
  },
});
export default Product;
