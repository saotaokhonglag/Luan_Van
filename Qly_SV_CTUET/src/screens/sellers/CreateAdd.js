import {
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { Text } from "react-native-paper";

const CreateAdd = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2F85F8" />
      <Text style={styles.title}>Danh sách sản phẩm</Text>
      <View style={{ flexDirection: "row", marginLeft: 20, marginLeft: 20 }}>
        <Image
          style={styles.cusImage}
          source={require("../../image/Cay.png")}
        />
        <View style={{ flexDirection: "column", marginLeft: 10 }}>
          <Text style={styles.textSP}>Cay</Text>
          <Text style={styles.MaSP}>SP0002</Text>
        </View>
        <View style={{ flexDirection: "column", marginLeft: "45%" }}>
          <Text style={styles.textKho}>20.000đ</Text>
          <Text style={styles.Gia}>20.000 x1</Text>
        </View>
      </View>
      <View
        style={{
          borderTopColor: "#dddddd",
          borderTopWidth: 2,
          marginTop: 10,
          marginBottom: 30,
        }}
      />
      <Text style={[styles.title]}>Thông tin đơn hàng</Text>
      <View style={styles.addView}>
        <TextInput
          style={styles.textv}
          autoCapitalize="none"
          placeholder="Nhà cung cấp*"
        />
      </View>
      <View style={styles.addView}>
        <TextInput
          style={styles.textv}
          autoCapitalize="none"
          placeholder="Số điện thoại*"
        />
      </View>
      <Text style={[styles.title, { marginTop: 50 }]}>
        Thông tin thanh toán
      </Text>
      <View style={{ flexDirection: "row", marginLeft: 20, marginLeft: 20 }}>
        <View style={{ flexDirection: "column", marginLeft: 10 }}>
          <Text style={styles.MaSP}>Tổng số lượng</Text>
          <Text style={styles.MaSP}>Tổng tiền hàng</Text>
          <Text style={styles.textSP}>Tổng cộng</Text>
        </View>
        <View style={{ flexDirection: "column", marginLeft: "45%" }}>
          <Text style={styles.Gia}>2</Text>
          <Text style={styles.Gia}>40.000đ</Text>
          <Text style={styles.textKho}>40.000đ</Text>
        </View>
      </View>
      <View
        style={{
          borderTopColor: "#dddddd",
          borderTopWidth: 2,
          marginTop: 10,
          marginBottom: 30,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AddWareHouse");
        }}
        style={styles.addButton}
      >
        <Text style={styles.textButton}>Nhập hàng</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    backgroundColor: "#EFEFEF",
    fontFamily: "sans-serif",
  },
  textButton: {
    color: "#FCF4F4FF",
    fontSize: 20,
    marginLeft: 10,
    alignItems: "center",
    marginLeft: "35%",
  },
  textSP: {
    fontSize: 20,
  },
  addView: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 20,
    padding: 5,
    backgroundColor: "#E9E9E9",
    flexDirection: "row",
    marginTop: 10,
  },
  MaSP: {
    fontSize: 15,
    color: "#7B7B7B",
  },
  textKho: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
  },
  Gia: {
    fontSize: 17,
    color: "#7B7B7B",
  },
  cusImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 0.4,
    backgroundColor: "white",
    alignItems: "center",
  },
  textQR: {
    fontSize: 18,
    color: "#2F85F8",
    marginLeft: 10,
  },
  textA: {
    marginTop: 15,
    justifyContent: "center",
    textAlign: "center",
    color: "#2F85F8",
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingStart: 20,
  },
  titleA: {
    fontSize: 18,
    fontFamily: "sans-serif",
    textAlign: "center",
    color: "#707070",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 20,
    paddingLeft: "18%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 10,
    marginVertical: 10,
  },
  caption: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FCF4F4FF",
  },
  infoBox: {
    width: "50%",
  },
  addButton: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.4,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#E30000",
    marginLeft: 20,
    marginTop: 180,
  },
});

export default CreateAdd;
