import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../../firebase_config";

const DirectoryItem = ({ info }) => {
  const navigation = useNavigation();
  const { id_DV, idDanhMuc, TenDanhMuc } = info;
  const [Total, setTotals] = useState();
  useEffect(() => {
    getProduct();
    return () => {};
  }, []);

  async function getProduct() {
    const ref = query(
      collection(db, "sanpham"),
      where("idDanhMuc", "==", idDanhMuc),
      where("TrangThai", "==", 1)
    );
    const un = await onSnapshot(ref, (querySnap) => {
      let totals = 0;
      querySnap.forEach((d) => {
        totals += 1;
      });
      setTotals(totals);
    });
  }
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("CatalogDetails", {
          idDanhMuc: info.idDanhMuc,
          id_DV: info.id_DV,
          TenDanhMuc: info.TenDanhMuc,
          Total: Total,
        });
      }}
      style={styles.products}
    >
      <View style={styles.imageProducts}>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{TenDanhMuc}</Text>
          <Text style={{ fontSize: 15 }}>{Total} sản phẩm</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DirectoryItem;

const styles = StyleSheet.create({
  products: {
    width: "100%",
    height: 80,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  imageProducts: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceProducts: {
    alignContent: "center",
    width: 200,
  },
});
