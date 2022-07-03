import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useUser } from "../../../store/GlobalContext";
import { useNavigation } from "@react-navigation/native";
import Swipeout from "react-native-swipeout";
import { db } from "../../../../firebase_config";
import { query, where, onSnapshot, collection } from "firebase/firestore";

const ServiceItem = ({ info }) => {
  const navigation = useNavigation();
  const { setId_sp, setModalVisibleDirectory, setModalVisibleDelete } =
    useUser();
  const { id_DV, tendv } = info;
  const [DataMananger, setDataMananger] = useState([]);

  useEffect(() => {
    getDataMananger();
    return () => {};
  }, []);

  async function getDataMananger() {
    const ref = query(
      collection(db, "quanly"),
      where("id_DV", "==", id_DV),
      where("TrangThai", "==", 1)
    );
    const un = await onSnapshot(ref, (querySnapshot) => {
      const hovaten = [];
      querySnapshot.forEach((d) => {
        hovaten.push(d.data().hovaten);
      });
      setDataMananger(hovaten);
    });
  }
  async function onPressDelete() {
    setModalVisibleDirectory(true);
    setId_sp(id_DV);
  }

  async function onPressEdit() {
    setModalVisibleDelete(true);
    setId_sp(id_DV);
    console.log(id_DV);
  }
  var swipeoutBtns = [
    {
      backgroundColor: "red",
      text: "Xóa",
      onPress: onPressDelete,
    },
    {
      backgroundColor: "green",
      text: "Sửa",
      onPress: onPressEdit,
    },
  ];
  return (
    <Swipeout left={swipeoutBtns} style={styles.products}>
      <View
        style={{
          flexDirection: "column",
          height: 60,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              Dịch vụ {info.tendv}
            </Text>
            <Text style={{ fontSize: 18 }}>
              Nhân viên:{" "}
              {DataMananger.length > 0 ? (
                DataMananger
              ) : (
                <Text style={{ color: "red", fontStyle: "italic" }}>
                  Chưa có
                </Text>
              )}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.menuItem,
            {
              borderTopColor: "#dddddd",
              borderTopWidth: 1,
            },
          ]}
        />
      </View>
    </Swipeout>
  );
};

export default ServiceItem;

const styles = StyleSheet.create({
  products: {
    width: "100%",
    height: 80,
    backgroundColor: "#fff",
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  imageProducts: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
  },
  priceProducts: {
    width: 100,
    alignItems: "flex-end",
  },
});
