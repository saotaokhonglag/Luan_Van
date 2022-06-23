import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import QRCode from "react-native-qrcode-svg";
import { Avatar, Title, Caption, Text } from "react-native-paper";

const HomePageSller = ({ navigation }) => {
  const [qrcode, setQrcode] = useState("SP001010101");

  async function createQR() {}
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2F85F8" />
      <View style={styles.circleShape}>
        <View style={styles.header}>
          <Avatar.Image
            source={{
              uri: "https://hinhnen123.com/wp-content/uploads/2021/06/anh-avatar-cute-dep-nhat-5.jpg",
            }}
            size={80}
          />
          <View style={{ marginLeft: 20, color: "#FCF4F4FF" }}>
            <Title style={styles.title}>Thai Ngoc</Title>
            <Caption style={styles.caption}>0855633053</Caption>
          </View>
        </View>
      </View>
      <View style={styles.profile}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title style={styles.titleA}>Doanh Thu Hôm Nay</Title>
          <Caption style={styles.textA}>0đ</Caption>
        </View>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title style={styles.titleA}>Đơn hàng</Title>
          <Caption style={styles.textA}>0</Caption>
        </View>
      </View>
      <View style={styles.eye}>
        <TouchableOpacity
          style={styles.cusButton}
          onPress={() => {
            navigation.navigate("Product");
          }}
        >
          <Image
            source={require("../image/product.png")}
            style={{ width: "50%", height: "50%" }}
          />
          <Text>Sản phẩm</Text>
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 50 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Order");
            }}
            style={styles.cusButton}
          >
            <Image
              source={require("../image/clipboard.png")}
              style={{ width: "50%", height: "50%" }}
            />
            <Text>Đơn hàng</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingLeft: 10 }}>
          <TouchableOpacity
            style={styles.cusButton}
            onPress={() => {
              navigation.navigate("Chart");
            }}
          >
            <Image
              source={require("../image/increasing-stocks-graphic.png")}
              style={{ width: "50%", height: "50%" }}
            />
            <Text>Báo cáo</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CreateProduct");
        }}
        style={styles.addButton}
      >
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
  eye: {
    flexDirection: "row",
  },
  textA: {
    marginTop: 15,
    justifyContent: "center",
    textAlign: "center",
    color: "#2F85F8",
    fontWeight: "bold",
    fontSize: 15,
  },
  cusButton: {
    width: 80,
    height: 90,
    borderRadius: 50 / 2,
    borderWidth: 0.4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingStart: 20,
  },
  titleA: {
    fontSize: 16,
    fontFamily: "sans-serif",
    textAlign: "center",
  },
  circleShape: {
    width: "100%",
    height: "25%",
    borderRadius: 110 / 2,
    backgroundColor: "#2F85F8",
    marginTop: -50,
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 20,
    paddingLeft: "18%",
  },
  profile: {
    width: "90%",
    height: 110,
    borderRadius: 40 / 2,
    backgroundColor: "#FFFFFF",
    marginTop: -45,
    borderWidth: 0.5,
    paddingLeft: 25,
    flexDirection: "row",
    paddingTop: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FCF4F4FF",
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
    width: 195,
    height: 50,
    borderRadius: 100 / 2,
    borderWidth: 0.4,
    backgroundColor: "white",
    marginStart: "45%",
    marginTop: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#2F85F8",
  },
});

export default HomePageSller;
