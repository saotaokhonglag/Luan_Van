import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Modal,
  Alert,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { db } from "../../../firebase_config";
import {
  collection,
  updateDoc,
  where,
  query,
  onSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";
import { useUser } from "../../store/GlobalContext";
import { LogBox } from "react-native";
import AddMoneyModal from "../../components/Modals/AddMoneyModal";
import HistoryItem from "./Item/HistoryItem";
import moment from "moment";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const { width, height } = Dimensions.get("window");
const Wallet = ({ navigation }) => {
  const { userInfo, userProfile, walletBalance, setWalletBalance } = useUser();
  const [ModalVisible, setModalVisible] = useState(false);
  const [idGD, setIdGD] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [history, setHistory] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isApiSubscribed = true;
    getWallet();
    getHistory();
    getIdGD();
    return () => {
      isApiSubscribed = false;
    };
  }, [ModalVisible]);

  async function getIdGD() {
    setIdGD("GD" + moment().format("DDMMYYYYHHmmss"));
    setCurrentDate(moment().format("DD/MM/YYYY HH:mm"));
  }
  async function getWallet() {
    const q = doc(db, "sinhvien", userInfo.id);
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
  async function getHistory() {
    const q = query(
      collection(db, "giaodich"),
      where("iduser", "==", userProfile.iduser)
    );
    const unsubscribe = await onSnapshot(q, (querySnapshot) => {
      const stock = [];
      querySnapshot.forEach((d) => {
        stock.push(d.data());
      });
      setHistory(stock);
    });
  }

  const addMoney = (bool, moneyProp) => {
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
    setModalVisible(bool);
    setIsLoading(false);
  };
  const CancelModal = (bool) => {
    setModalVisible(bool);
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
        <AddMoneyModal Add={addMoney} cancelModal={CancelModal} />
      </Modal>
      <View style={styles.circleShape}>
        <Text style={styles.money}>
          {walletBalance
            ? walletBalance.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
            : walletBalance}
          đ
        </Text>
      </View>
      <View style={styles.Wallet}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ alignItems: "center" }}
        >
          <MaterialCommunityIcons
            name="wallet-plus"
            size={45}
            style={{ marginBottom: 10, color: "black" }}
          />
          <Text style={{ color: "#2F85F8", fontSize: 18 }}>Nạp tiền</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.history}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Giao dịch gần nhất
        </Text>
      </View>
      <FlatList
        inverted={true}
        keyExtractor={(item) => item.magd}
        data={history}
        renderItem={({ item: history }) => {
          return <HistoryItem {...history} info={history} />;
        }}
      />
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

  circleShape: {
    width: "100%",
    height: "20%",
    borderRadius: 110 / 2,
    backgroundColor: "#2F85F8",
    marginTop: -70,
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 20,
    paddingLeft: "35%",
  },
  money: {
    color: "#FCF4F4FF",
    fontSize: 20,
    paddingLeft: "10%",
  },
  Wallet: {
    width: "90%",
    height: 100,
    borderRadius: 40 / 2,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    marginTop: -45,
    borderWidth: 0.5,
    justifyContent: "center",
  },
  history: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingLeft: 10,
    marginTop: 30,
  },
  historyView: {
    width: width - 20,
    backgroundColor: "#FFFF",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  historyHeader: {
    flexDirection: "row",
    width: width - 50,
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    alignItems: "center",
  },
  historyBody: {
    width: width - 50,
    marginVertical: 5,
  },
});

export default Wallet;
