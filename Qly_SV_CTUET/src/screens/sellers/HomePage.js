import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useUser } from "../../store/GlobalContext";
import { Avatar, Title, Caption, Text } from "react-native-paper";
import { db } from "../../../firebase_config";
import { query, collection, onSnapshot, doc } from "firebase/firestore";

const HomePageSller = ({ navigation }) => {
  const { setManangerProfile, ManangerProfile } = useUser();
  const [ModalVisible, setModalVisible] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    getWallet();

    return () => {};
  }, []);

  async function LogOut() {
    setManangerProfile();
    navigation.replace("StartScreen");
  }
  async function getWallet() {
    const q = doc(db, "quanly", ManangerProfile.id_NV);
    const ref = query(collection(q, "vi"));
    const unsubscribe = await onSnapshot(ref, (querySnapshot) => {
      const stock = [];
      querySnapshot.forEach((d) => {
        stock.push(d.data());
      });
      stock.forEach((item) => {
        setWalletBalance(item.sodu);
      });
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={ModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => ModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Bạn có muốn đăng xuất? </Text>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              onPress={LogOut}
              style={[styles.button, styles.buttonOk]}
            >
              <Text style={styles.textStyle}>Xác Nhận</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={[styles.button, styles.buttonCancel]}
            >
              <Text style={styles.textCancel}>Hủy</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
            <Title style={styles.title}>{ManangerProfile.hovaten}</Title>
            <Caption style={styles.caption}>{ManangerProfile.sdt}</Caption>
          </View>
          <View
            style={{
              width: 150,
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{ paddingLeft: 30 }}
            >
              <ImageBackground
                style={{ width: 20, height: 20, marginVertical: 5 }}
                source={require("../../../assets/turn-off.png")}
              />
            </TouchableOpacity>
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
          <Title style={styles.titleA}>Ví</Title>
          <Caption style={styles.textA}>
            {walletBalance.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
            đ
          </Caption>
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
          <Caption style={styles.textA}>12</Caption>
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
            source={require("../../image/product.png")}
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
              source={require("../../image/clipboard.png")}
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
              source={require("../../image/increasing-stocks-graphic.png")}
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
  modalView: {
    marginTop: 300,
    margin: 20,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    border: 3,
    width: 120,
    marginHorizontal: 10,
    alignItems: "center",
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

export default HomePageSller;
