import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { Text } from "react-native-paper";

const BaoCaoKho = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2F85F8" />
      <View style={styles.profile}>
        <View style={[styles.eye]}>
          <TouchableOpacity
            style={styles.cusButton}
            onPress={() => {
              navigation.navigate("");
            }}
          >
            <Image
              source={require("../image/bank-account.png")}
              style={{ width: "30%", height: "30%", resizeMode: "contain" }}
            />
            <Text style={styles.text1}>757.000đ</Text>
            <Text style={styles.text}>Giá trị kho</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("");
            }}
            style={styles.cusButton}
          >
            <Image
              source={require("../image/boxes.png")}
              style={{ width: "30%", height: "30%", resizeMode: "contain" }}
            />
            <Text style={styles.text1}>42</Text>
            <Text style={styles.text}>Số lượng</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.eye}>
          <TouchableOpacity
            style={styles.cusButton}
            onPress={() => {
              navigation.navigate("");
            }}
          >
            <Image
              source={require("../image/check-out.png")}
              style={{ width: "30%", height: "30%", resizeMode: "contain" }}
            />
            <Text style={styles.text1}>2</Text>
            <Text style={styles.text}>Sản phẩm còn hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cusButton}
            onPress={() => {
              navigation.navigate("");
            }}
          >
            <Image
              source={require("../image/out-of-stock.png")}
              style={{ width: "30%", height: "30%", resizeMode: "contain" }}
            />
            <Text style={styles.text1}>0</Text>
            <Text style={styles.text}>Sản phẩm hết hàng</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.View}>
          <Text style={styles.textKho}>Tổng quan giá trị tồn kho</Text>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 20,
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <Text style={styles.MaSP}>Sản phẩm</Text>
            <Text style={[styles.MaSP, { marginLeft: 170 }]}>Giá trị</Text>
          </View>
          <View
            style={{ flexDirection: "row", marginLeft: 20, marginLeft: 20 }}
          >
            <Image
              style={styles.cusImage}
              source={require("../image/Cay.png")}
            />
            <View style={{ flexDirection: "column", marginLeft: 10 }}>
              <Text style={styles.textSP}>Cay</Text>
              <Text style={styles.MaSP}>SP0002</Text>
            </View>
            <View style={{ flexDirection: "column", marginLeft: 120 }}>
              <Text style={styles.Gia}>380.000đ</Text>
              <Text style={styles.MaSP}>SL: 20</Text>
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
          <View
            style={{ flexDirection: "row", marginLeft: 20, marginLeft: 20 }}
          >
            <Image
              style={styles.cusImage}
              source={require("../image/Thucuong.jpg")}
            />
            <View style={{ flexDirection: "column", marginLeft: 10 }}>
              <Text style={styles.textSP}>Nước</Text>
              <Text style={styles.MaSP}>SP0002</Text>
            </View>
            <View style={{ flexDirection: "column", marginLeft: 120 }}>
              <Text style={styles.Gia}>380.000đ</Text>
              <Text style={styles.MaSP}>SL: 20</Text>
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
          <View
            style={{ flexDirection: "row", marginLeft: 20, marginLeft: 20 }}
          >
            <Image
              style={styles.cusImage}
              source={require("../image/hoc-nau-bun-dau-mo-quan.jpg")}
            />
            <View style={{ flexDirection: "column", marginLeft: 10 }}>
              <Text style={styles.textSP}>Bún đậu</Text>
              <Text style={styles.MaSP}>SP0004</Text>
            </View>
            <View style={{ flexDirection: "column", marginLeft: 100 }}>
              <Text style={styles.Gia}>380.000đ</Text>
              <Text style={styles.MaSP}>SL: 20</Text>
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
        </View>
      </View>
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
  cusImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 0.4,
    backgroundColor: "white",
    alignItems: "center",
  },
  textA: {
    marginTop: 15,
    justifyContent: "center",
    textAlign: "center",
    color: "#2F85F8",
    fontWeight: "bold",
  },
  textKho: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
    marginStart: 20,
    marginTop: 10,
  },
  Gia: {
    fontSize: 20,
    color: "#F6720B",
  },
  cusButton: {
    width: 160,
    height: 135,
    borderRadius: 50 / 2,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginStart: 10,
    backgroundColor: "#F9F9F9",
    borderColor: "#2F85F8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingStart: 20,
  },
  titleA: {
    fontSize: 15,
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
  textSP: {
    fontSize: 20,
  },
  MaSP: {
    fontSize: 15,
    color: "#7B7B7B",
  },
  text: {
    color: "#7C7C7C",
    fontSize: 15,
    textAlign: "center",
  },
  text1: {
    color: "#000000",
    fontSize: 18,
    textAlign: "center",
  },
  profile: {
    width: "90%",
    height: 300,
    borderRadius: 40 / 2,
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    borderWidth: 0.5,
  },
  View: {
    width: 350,
    height: 400,
    borderRadius: 40 / 2,
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    borderWidth: 0.5,
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

export default BaoCaoKho;
