import { collection, query, where, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { db } from "../../../firebase_config";
import { useUser } from "../../store/GlobalContext";

const Chart = ({ navigation }) => {
  const { ManangerProfile } = useUser();
  const [data, setData] = useState();
  const [orders, setOrders] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    getTotal();
    return () => {};
  }, []);

  async function getTotal() {
    const ref = query(
      collection(db, "HoaDon"),
      where("id_DV", "==", ManangerProfile.id_DV)
    );
    const un2 = await onSnapshot(ref, (querySnapshot) => {
      const chart = [];
      querySnapshot.forEach((d) => {
        chart.push(d.data());
      });
      let totals = 0;
      let order = 0;
      chart.forEach((item) => {
        totals += item.TongTien;
        order += 1;
      });
      setOrders(order);
      setTotal(totals);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.View}>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View style={{ marginRight: 60, alignItems: "center" }}>
            <Text style={styles.Text}>Doanh Thu</Text>
            <Text
              style={{ color: "#2F85F8", fontSize: 20, fontWeight: "bold" }}
            >
              {total
                ? total.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
                : 0}
            </Text>
          </View>
          <View
            style={{
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            }}
          ></View>
          <View style={{ marginLeft: 60, alignItems: "center" }}>
            <Text style={styles.Text}>Đã bán</Text>
            <Text
              style={{ color: "#c30000", fontSize: 20, fontWeight: "bold" }}
            >
              {orders ? orders : 0}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          backgroundColor: "#ffffff",
          height: 40,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={styles.text2}>Sảm phẩm đã bán</Text>
      </View>
      <View style={styles.view2}>
        <Text style={{ marginRight: 90 }}>Sản phẩm</Text>
        <Text>Số lượng</Text>
        <Text style={{ marginLeft: 90 }}>Giá bán</Text>
      </View>
      <View style={{ backgroundColor: "white", width: "100%" }}>
        <View style={styles.view3}>
          <Text style={{ marginRight: 140 }}>Bún</Text>
          <Text>3</Text>
          <Text style={{ marginLeft: 130 }}>60.000đ</Text>
        </View>
        <View
          style={{
            borderTopColor: "#dddddd",
            borderTopWidth: 1,
          }}
        />
        <View style={styles.view3}>
          <Text style={{ marginRight: 130 }}>Nước</Text>
          <Text>2</Text>
          <Text style={{ marginLeft: 130 }}>20.000đ</Text>
        </View>
        <View
          style={{
            borderTopColor: "#dddddd",
            borderTopWidth: 1,
          }}
        />
        <View style={styles.view3}>
          <Text style={{ marginRight: 130 }}>Tổng</Text>
          <Text>3</Text>
          <Text style={{ marginLeft: 130 }}>80.000đ</Text>
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
  View: {
    backgroundColor: "#ffffff",
    height: 120,
    width: "90%",
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  Text: {
    color: "#7C7C7C",
    fontSize: 16,
  },
  text2: {
    marginTop: 10,
    fontSize: 18,
  },
  view2: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  view3: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 25,
  },
});
export default Chart;
