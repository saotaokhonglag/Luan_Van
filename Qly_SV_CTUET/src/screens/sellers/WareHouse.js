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
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { Avatar, Title, Caption, Text } from "react-native-paper";

const HomePageA = ({ navigation }) => {
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
          <View style={{ paddingLeft: 110 }}>
            <EvilIcons name="bell" size={28} style={{ color: "white" }} />
          </View>
        </View>
      </View>
      <TouchableOpacity style={[styles.profile, { alignItems: "center" }]}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title style={styles.titleA}>Giá trị tồn kho</Title>
          <Caption style={styles.textA}>740.000đ</Caption>
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
          <Title style={styles.titleA}>Số lượng</Title>
          <Caption style={styles.textA}>20</Caption>
        </View>
      </TouchableOpacity>
      <View style={styles.addView}>
        <AntDesign
          name="search1"
          size={20}
          color="#7B7B7B"
          style={{ marginStart: 10 }}
        />
        <TextInput
          style={styles.textv}
          autoCapitalize="none"
          placeholder="Tìm kiếm đơn hàng"
        />

        <TouchableOpacity style={styles.addButtonQR}>
          <Image
            source={require("../image/qr-code.png")}
            style={{ width: 30, height: 30, marginLeft: 20 }}
          />
          <Text style={styles.textQR}>Quét mã</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginLeft: 20, marginLeft: 20 }}>
        <Image style={styles.cusImage} source={require("../image/Cay.png")} />
        <View style={{ flexDirection: "column", marginLeft: 10 }}>
          <Text style={styles.textSP}>Cay</Text>
          <Text style={styles.MaSP}>SP0002</Text>
        </View>
        <View style={{ flexDirection: "column", marginLeft: 150 }}>
          <Text style={styles.textKho}>Tồn kho: 20</Text>
          <Text style={styles.Gia}>380.000đ</Text>
        </View>
      </View>
      <View
        style={[
          styles.menuItem,
          {
            borderTopColor: "#dddddd",
            borderTopWidth: 2,
            marginTop: 10,
          },
        ]}
      />
      <View style={{ flexDirection: "row", marginLeft: 20, marginLeft: 20 }}>
        <Image
          style={styles.cusImage}
          source={require("../image/Thucuong.jpg")}
        />
        <View style={{ flexDirection: "column", marginLeft: 10 }}>
          <Text style={styles.textSP}>Nước</Text>
          <Text style={styles.MaSP}>SP0002</Text>
        </View>
        <View style={{ flexDirection: "column", marginLeft: 150 }}>
          <Text style={styles.textKho}>Tồn kho: 20</Text>
          <Text style={styles.Gia}>380.000đ</Text>
        </View>
      </View>
      <View
        style={[
          styles.menuItem,
          {
            borderTopColor: "#dddddd",
            borderTopWidth: 2,
            marginTop: 10,
          },
        ]}
      />
      <View style={{ flexDirection: "row", marginLeft: 20, marginLeft: 20 }}>
        <Image
          style={styles.cusImage}
          source={require("../image/hoc-nau-bun-dau-mo-quan.jpg")}
        />
        <View style={{ flexDirection: "column", marginLeft: 10 }}>
          <Text style={styles.textSP}>Bún đậu</Text>
          <Text style={styles.MaSP}>SP0004</Text>
        </View>
        <View style={{ flexDirection: "column", marginLeft: 130 }}>
          <Text style={styles.textKho}>Tồn kho: 20</Text>
          <Text style={styles.Gia}>380.000đ</Text>
        </View>
      </View>
      <View
        style={[
          styles.menuItem,
          {
            borderTopColor: "#dddddd",
            borderTopWidth: 2,
            marginTop: 10,
          },
        ]}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AddWareHouse");
        }}
        style={styles.addButton}
      >
        <AntDesign
          name="arrowdown"
          size={20}
          color="#FCF4F4FF"
          style={{ marginStart: 50, marginLeft: 90 }}
        />
        <Text
          style={{
            color: "#FCF4F4FF",
            fontSize: 18,
            marginLeft: 10,
          }}
        >
          Nhập hàng
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    fontFamily: "sans-serif",
  },
  textSP: {
    fontSize: 20,
  },
  MaSP: {
    fontSize: 15,
    color: "#7B7B7B",
  },
  textKho: {
    fontSize: 15,
    color: "#7B7B7B",
  },
  Gia: {
    fontSize: 20,
    color: "#F6720B",
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
    fontSize: 18,
    fontFamily: "sans-serif",
    textAlign: "center",
    color: "#707070",
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
    marginLeft: 20,
  },
  addView: {
    width: "50%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 10,
    padding: 5,
    backgroundColor: "#E9E9E9",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  addButtonQR: {
    width: 150,
    height: 50,
    borderRadius: 10,
    borderWidth: 0.4,
    alignItems: "center",
    backgroundColor: "#CAE0FD",
    borderColor: "#2F85F8",
    flexDirection: "row",
    marginLeft: 60,
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
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.4,
    marginTop: "60%",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#E30000",
    marginLeft: 20,
  },
});

export default HomePageA;
