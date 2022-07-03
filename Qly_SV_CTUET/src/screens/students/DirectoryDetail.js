import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase_config";
import {
  getDoc,
  collection,
  doc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { theme } from "../../contants/theme";
import { useUser } from "../../store/GlobalContext";
const DirectoryDetail = ({ navigation, route }) => {
  const item = route.params;
  const [directoryName, setDirectoryName] = useState();
  const [idHD, setIdHD] = useState();

  useEffect(() => {
    let isApiSubscribed = true;
    getDetail();
    return () => {
      isApiSubscribed = false;
    };
  }, []);

  async function getDetail() {
    const ref = doc(db, "dichvu", item.id_DV);
    const orderRef = query(
      collection(db, "HoaDon"),
      where("magd", "==", item.magd)
    );
    const unsubscribe = await onSnapshot(orderRef, (querySnapshot) => {
      const name = [];
      querySnapshot.forEach((d) => {
        setIdHD(d.data().id_HD);
      });
    });
    const docSnap = await getDoc(ref);
    if (docSnap.data() !== undefined) {
      setDirectoryName(docSnap.data().tendv);
    } else {
      setDirectoryName("Dịch vụ đã bị xóa");
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <View style={styles.bodyView}>
        <View style={styles.header}>
          <ImageBackground
            source={require("../../image/shopping-cart.png")}
            style={{ height: 50, width: 50 }}
          />
          <View style={styles.headerItem}>
            <Text style={{ fontSize: 18 }}>THANH TOÁN HÓA ĐƠN</Text>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              - {item.sotien}đ
            </Text>
            <Text style={styles.textDer}>
              Mã giao dịch:{" "}
              <Text style={{ color: theme.colors.primary }}>{item.magd}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.status}>
          <ImageBackground
            source={require("../../image/check-transaction.png")}
            style={{ height: 18, width: 18, marginHorizontal: 10 }}
          />
          <Text style={styles.textDer}>Giao dịch thành công</Text>
        </View>
        <View
          style={{
            ...styles.itemDeltail,
            borderBottomWidth: 0.5,
            borderBottomColor: "#AEAEAE",
          }}
        >
          <Text style={styles.titileItem}>Thời gian thanh toán</Text>
          <Text style={{ ...styles.titileItem, fontWeight: "bold" }}>
            {item.time}
          </Text>
        </View>
        <View
          style={{
            ...styles.itemDeltail,
            borderBottomWidth: 0.5,
            borderBottomColor: "#AEAEAE",
          }}
        >
          <Text style={styles.titileItem}>Nguồn tiền</Text>
          <Text style={{ ...styles.titileItem, fontWeight: "bold" }}>Ví</Text>
        </View>
        <View style={styles.itemDeltail}>
          <Text style={styles.titileItem}>Tổng phí</Text>
          <Text style={{ ...styles.titileItem, fontWeight: "bold" }}>
            Miễn phí
          </Text>
        </View>
      </View>
      <View
        style={{
          width: Dimensions.get("window").width - 20,
          paddingHorizontal: 5,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "#7A7A7A", fontWeight: "bold", fontSize: 18 }}>
          THÔNG TIN THÊM
        </Text>
      </View>

      <View style={styles.footer}>
        <View
          style={{
            ...styles.itemDeltail,
            borderBottomWidth: 0.5,
            borderBottomColor: "#AEAEAE",
          }}
        >
          <Text style={styles.titileItem}>Dịch vụ</Text>
          <Text style={{ ...styles.titileItem, fontWeight: "bold" }}>
            {directoryName}
          </Text>
        </View>
        <View style={styles.itemDeltail}>
          <Text style={styles.titileItem}>Mã đơn hàng</Text>
          <Text style={{ ...styles.titileItem, fontWeight: "bold" }}>
            {idHD}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DirectoryDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: "center",
    backgroundColor: "#FFFF",
  },
  bodyView: {
    marginVertical: 15,
    backgroundColor: "#FFFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: Dimensions.get("window").width - 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginStart: 10,
  },
  headerItem: {
    marginStart: 10,
  },
  status: {
    flexDirection: "row",
    marginVertical: 15,
    marginStart: 10,
    backgroundColor: "#E6FFD9",
    height: 30,
    paddingHorizontal: 5,
    alignItems: "center",
    borderRadius: 3,
  },
  itemDeltail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
    height: 50,
    alignItems: "center",
    paddingHorizontal: 5,
  },
  titileItem: {
    fontSize: 16,
  },
  button: {
    width: Dimensions.get("window").width - 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    height: 50,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  footer: {
    backgroundColor: "red",
    marginVertical: 10,
    backgroundColor: "#FFFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: Dimensions.get("window").width - 20,
    borderWidth: 0.5,
    borderColor: "#AEAEAE",
  },
});
