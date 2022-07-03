import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Modal,
  ImageBackground,
  Alert,
} from "react-native";
import { db } from "../../../firebase_config";
import {
  updateDoc,
  doc,
  setDoc,
  onSnapshot,
  query,
  collection,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AddMoneyModal from "../../components/Modals/AddMoneyModal";
import AntDesign from "react-native-vector-icons/AntDesign";
import LogoutModal from "../../components/Modals/LogoutModal";
import { Avatar } from "react-native-paper";
import { useUser } from "../../store/GlobalContext";
import { LogBox } from "react-native";
import moment from "moment";

LogBox.ignoreLogs([
  "EventEmitter.removeListener",
  "ViewPropTypes will be removed",
]);

const HomePage = ({ navigation }) => {
  const [ModalVisible, setModalVisible] = useState(false);
  const [ModalVisibleWallet, setModalVisibleWallet] = useState(false);
  const [walletVisible, setWalletVisible] = useState(false);
  const [money, setMoney] = useState();
  const [idGD, setIdGD] = useState();
  const [currentDate, setCurrentDate] = useState();
  useEffect(() => {
    let isApiSubscribed = true;
    getIdGD();
    getWallet();
    return () => {
      isApiSubscribed = false;
    };
  }, [ModalVisible]);
  const {
    userInfo,
    userProfile,
    setUserProfile,
    setUserInfo,
    walletBalance,
    setWalletBalance,
  } = useUser();
  const LogOut = (bool) => {
    setModalVisible(bool);
    setTimeout(
      () => setUserProfile(null),
      setUserInfo(null),
      navigation.reset({
        index: 0,
        routes: [{ name: "StartScreen" }],
      }),
      1000
    );
  };
  async function getWallet() {
    const q = doc(db, "sinhvien", userInfo.id);
    const ref = query(collection(q, "vi"));
    const unsubscribe = await onSnapshot(ref, (querySnapshot) => {
      const stock = [];
      querySnapshot.forEach((d) => {
        stock.push(d.data());
      });
      stock.forEach((item) => {
        setMoney(item.sodu);
      });
    });
  }
  async function getIdGD() {
    setIdGD("GD" + moment().format("DDMMYYYYHHmmss"));
    setCurrentDate(moment().format("DD/MM/YYYY HH:mm"));
  }
  const CancelModal = (bool) => {
    setModalVisible(bool);
    setModalVisibleWallet(bool);
  };
  const addMoneyHome = (bool, moneyProp) => {
    const q = doc(db, "sinhvien", userInfo.id);
    updateDoc(doc(q, "vi", userInfo.id), {
      sodu: parseInt(walletBalance) + parseInt(moneyProp.value),
    });
    setWalletBalance(parseInt(walletBalance) + parseInt(moneyProp.value));
    setDoc(doc(db, "giaodich", idGD), {
      magd: idGD,
      iduser: userInfo.id,
      mota:
        "Số dư +" +
        parseInt(moneyProp.value)
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."),
      ThoiGianGiaoDich: currentDate,
      sotien: parseInt(moneyProp.value)
        .toFixed(0)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."),
      loaiGD: "nt",
    });
    Alert.alert("Thông báo!", "Nạp tiền thành công");
    setModalVisibleWallet(bool);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2F85F8" />
      <Modal
        visible={ModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => ModalVisible(false)}
      >
        <LogoutModal LogOut={LogOut} cancelModal={CancelModal} />
      </Modal>
      <Modal
        visible={ModalVisibleWallet}
        animationType="slide"
        transparent={true}
        onRequestClose={() => ModalVisibleWallet(false)}
      >
        <AddMoneyModal Add={addMoneyHome} cancelModal={CancelModal} />
      </Modal>
      <View style={styles.circleShape}>
        <View style={styles.header}>
          <View style={styles.profile}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Profile");
              }}
            >
              <Avatar.Image
                source={{
                  uri: userProfile.image,
                }}
                size={70}
              />
            </TouchableOpacity>
            <View style={{ paddingLeft: 10, fontSize: "18", marginTop: 10 }}>
              <Text style={styles.text}>{userProfile.hovaten}</Text>
              <View style={styles.eye}>
                <TouchableOpacity
                  onPress={() => {
                    setWalletVisible((prev) => !prev);
                  }}
                >
                  {walletVisible === false ? (
                    <Entypo
                      name="eye-with-line"
                      size={15}
                      style={{ color: "white", marginRight: 5 }}
                    />
                  ) : (
                    <Entypo
                      name="eye"
                      size={15}
                      style={{ color: "white", marginRight: 5 }}
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.text}>
                  {walletVisible === false
                    ? "**********"
                    : money
                        .toFixed(0)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "đ"}
                </Text>
              </View>
            </View>
          </View>
          <View>
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

        <View style={styles.button}></View>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddOrder")}
            style={styles.cusButton}
          >
            <ImageBackground
              style={{ width: 40, height: 40, marginVertical: 5 }}
              source={require("../../../assets/add.png")}
            />

            <Text style={{ fontSize: 15 }}>Tạo hóa đơn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Wallet");
            }}
            style={styles.cusButton}
          >
            <ImageBackground
              style={{ width: 40, height: 40, marginVertical: 5 }}
              source={require("../../../assets/wallet.png")}
            />
            <Text style={{ fontSize: 15 }}>Ví</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingLeft: 60 }}>
          <TouchableOpacity
            onPress={() => setModalVisibleWallet(true)}
            style={styles.cusButton}
          >
            <MaterialCommunityIcons
              name="wallet-plus"
              size={35}
              style={{ marginBottom: 10, color: "black" }}
            />
            <Text>Nạp Tiền</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Historys")}
            style={styles.cusButton}
          >
            <MaterialCommunityIcons
              name="history"
              size={40}
              style={{ marginBottom: 5 }}
            />
            <Text>Giao dịch</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AddOrder");
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
          Thêm hóa đơn
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    paddingLeft: 25,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  profile: {
    flexDirection: "row",
    paddingTop: 20,
  },
  circleShape: {
    width: "100%",
    height: "20%",
    borderRadius: 110 / 2,
    backgroundColor: "#2F85F8",
    marginTop: -50,
    justifyContent: "center",
  },
  text: {
    color: "#FCF4F4FF",
    fontSize: 18,
  },
  eye: {
    flexDirection: "row",
    alignItems: "center",
  },
  cusButton: {
    width: 100,
    height: 100,
    borderRadius: 50 / 2,
    borderWidth: 0.4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginStart: 45,
    marginTop: 40,
  },
  addButton: {
    width: 195,
    height: 50,
    borderRadius: 100 / 2,
    borderWidth: 0.4,
    backgroundColor: "white",
    marginStart: "45%",
    marginTop: "70%",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#2F85F8",
  },
  modal: {
    flex: 1,
    height: 500,
    backgroundColor: "#ccc",
    alignItems: "center",
  },
});

export default HomePage;
