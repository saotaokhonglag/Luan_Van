import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  FlatList,
  StatusBar,
} from "react-native";
import { db } from "../../../firebase_config";
import { doc, deleteDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Item from "./Item/DetialsOrderItem";
import { useUser } from "../../store/GlobalContext";
import { theme } from "../../contants/theme";
const { width } = Dimensions.get("window");
const CheckOut = ({ navigation, route }) => {
  const item = route.params;
  const { product, userProfile } = useUser();
  const [totalPriceDetail, setTotalPriceDetail] = useState(0);

  useEffect(() => {
    let isApiSubscribed = true;
    Total();
    return () => {
      isApiSubscribed = false;
    };
  }, []);

  async function Total() {
    let tt = 0;
    product.forEach((item) => {
      tt += item.soluong * item.gia;
      setTotalPriceDetail(tt);
    });
  }
  async function goHomePage() {
    const ref = doc(db, "sinhvien", userProfile.iduser);
    product.forEach((item) => {
      deleteDoc(doc(ref, "Cart", item.idsp));
    });

    navigation.replace("HomePage");
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFF" />
      <View style={styles.header}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Chi tiết hóa đơn
        </Text>
      </View>
      <View style={styles.body}>
        <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 5 }}>
          Hoá đơn
        </Text>
        <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 5 }}>
          #{item.idHD}
        </Text>
        <Text style={styles.text}>{item.currentDate}</Text>
        <View style={{ width: width - 40 }}>
          <Text style={{ ...styles.text, marginVertical: 20 }}>
            Khách: {userProfile.hovaten}
          </Text>
        </View>
        <View style={styles.orderView}>
          <View style={styles.orderHeader}>
            <Text style={styles.textTitle}>Đơn giá</Text>
            <Text style={{ ...styles.textTitle, marginLeft: 50 }}>SL</Text>
            <Text style={styles.textTitle}>Thành tiền</Text>
          </View>
          <View style={styles.orderBodyView}>
            <FlatList
              keyExtractor={(item) => item.idsp}
              data={product}
              renderItem={({ item: product }) => {
                return <Item {...product} info={product} />;
              }}
            />
          </View>
          <View style={styles.orderFooter}>
            <Text style={styles.textTitle}>Tổng cộng</Text>
            <Text style={styles.textTitle}>
              {totalPriceDetail
                .toFixed(0)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
              đ
            </Text>
          </View>
        </View>
        <Text style={{ ...styles.textTitle, marginTop: 50 }}>
          Cảm ơn quý khách hẹn gặp lại
        </Text>
      </View>
      <TouchableOpacity onPress={() => goHomePage()} style={styles.button}>
        <Text style={{ ...styles.textTitle, color: "#FFFF" }}>
          Về trang chủ
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    height: 70,
    width: width,
    backgroundColor: "#FFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    width: width - 20,
    backgroundColor: "#FFFF",
    alignItems: "center",
    marginVertical: 22,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 15,
  },
  text: {
    fontSize: 18,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderView: {
    justifyContent: "center",
    alignItems: "center",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 40,
  },
  orderBodyView: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    width: width - 40,
    paddingVertical: 10,
    marginVertical: 15,
  },

  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 40,
    alignItems: "center",
  },
  button: {
    height: 60,
    width: width - 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
  },
});

export default CheckOut;
