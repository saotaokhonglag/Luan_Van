import { collection, query, where, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";
import { db } from "../../../firebase_config";
import ManagementOrdersDetailItem from "./Item/ManagementOrdersDetailItem";

const DetailsOrder = ({ navigation, route }) => {
  const item1 = route.params;
  const [deltailOrder, setDeltailOrder] = useState();
  const [userName, setUserName] = useState();
  const [SDT, setSDT] = useState();

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  async function getData() {
    const ref = query(
      collection(db, "ct_hoadon"),
      where("id_HD", "==", item1.idHD.toString())
    );
    const ref2 = query(
      collection(db, "sinhvien"),
      where("iduser", "==", item1.iduser.toString())
    );
    const un2 = await onSnapshot(ref2, (querySnapshot) => {
      const name = [];
      const sdt = [];
      querySnapshot.forEach((d) => {
        name.push(d.data().hovaten);
        sdt.push(d.data().sdt);
      });
      setUserName(name);
      setSDT(sdt);
    });
    const un = await onSnapshot(ref, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((d) => {
        data.push(d.data());
      });
      setDeltailOrder(data);
    });
  }
  return (
    <SafeAreaView
      style={{ flexDirection: "column", backgroundColor: "#FFFF", flex: 1 }}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Text style={[styles.textv, { fontSize: 18, marginHorizontal: 10 }]}>
          Mã đơn hàng
        </Text>
        <Text
          style={[
            styles.textv,
            {
              fontSize: 20,
              fontFamily: "sans-serif",
              fontWeight: "bold",
            },
          ]}
        >
          #{item1.idHD}
        </Text>
      </View>
      <View style={styles.textv}>
        <View>
          <View
            style={{
              flexDirection: "column",
              marginTop: 10,
              marginBottom: 10,
              width: Dimensions.get("window").width,
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#525252",
                marginTop: 10,
                fontWeight: "bold",
              }}
            >
              Thông tin khách hàng
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: Dimensions.get("window").width,
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontSize: 20, color: "#525252", marginTop: 20 }}>
                  Tên khách hàng
                </Text>
                <Text style={{ fontSize: 20, color: "#525252" }}>
                  Số điện thoại
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  width: 200,
                  alignItems: "flex-end",
                  paddingRight: 20,
                }}
              >
                <Text style={{ fontSize: 20, color: "#525252", marginTop: 20 }}>
                  {userName}
                </Text>
                <Text style={{ fontSize: 20, color: "#525252" }}>{SDT}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          marginTop: 10,
          marginBottom: 30,
          width: "100%",
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#525252",
            marginTop: 10,
            fontWeight: "bold",
          }}
        >
          Thông tin thanh toán
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 18, color: "#525252", marginTop: 20 }}>
              Tổng {item1.slsp} sản phẩm
            </Text>
            <Text
              style={{ fontSize: 20, color: "#525252", fontWeight: "bold" }}
            >
              Tổng cộng
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              width: 150,
              alignItems: "flex-end",
            }}
          >
            <Text style={{ fontSize: 18, color: "#525252", marginTop: 20 }}>
              {item1.sotien
                .toFixed(0)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
              đ
            </Text>
            <Text
              style={{ fontSize: 20, color: "#525252", fontWeight: "bold" }}
            >
              {item1.sotien
                .toFixed(0)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
              đ
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderTopColor: "#dddddd",
          borderTopWidth: 1,
        }}
      />
      <View>
        <View
          style={{
            flexDirection: "column",
            marginTop: 10,
            marginHorizontal: 10,
            marginBottom: 30,
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#525252",
              marginTop: 10,
              fontWeight: "bold",
            }}
          >
            Thông tin sản phẩm
          </Text>
        </View>
      </View>
      <FlatList
        data={deltailOrder}
        renderItem={({ item: deltailOrder }) => {
          return (
            <ManagementOrdersDetailItem {...deltailOrder} info={deltailOrder} />
          );
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
  cusImage: {
    width: 80,
    height: 90,
    borderRadius: 10,
    borderWidth: 0.4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  textv: {
    fontSize: 16,
    color: "#525252",
    alignItems: "center",
  },
  addView: {
    width: "70%",
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
});
export default DetailsOrder;
