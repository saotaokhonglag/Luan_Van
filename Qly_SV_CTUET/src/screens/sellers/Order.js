import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import ManageOrdersItem from "./Item/ManageOrdersItem";
import { useUser } from "../../store/GlobalContext";
import { db } from "../../../firebase_config";
import { query, onSnapshot, collection, where } from "firebase/firestore";

const Order = ({ navigation }) => {
  const { ManangerProfile } = useUser();
  const [history, setHistory] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getOrder();
    return () => {};
  }, []);

  async function getOrder() {
    const q = query(
      collection(db, "giaodich"),
      where("id_DV", "==", ManangerProfile.id_DV)
    );

    const unsubscribe = await onSnapshot(q, (querySnapshot) => {
      const stock = [];
      querySnapshot.forEach((d) => {
        stock.push(d.data());
      });
      setHistory(stock);
    });
  }
  return (
    <SafeAreaView>
      <View style={styles.addView}>
        <AntDesign
          name="search1"
          size={20}
          color="#7B7B7B"
          style={{ marginStart: 10 }}
        />
        <TextInput
          style={styles.textv}
          autoCapitalize="none"
          placeholder="Tìm kiếm đơn hàng"
          onChangeText={(text) => setSearchText(text)}
        ></TextInput>
      </View>
      <FlatList
        keyExtractor={(item) => item.magd}
        data={history.filter((order) =>
          order.ThoiGianGiaoDich.toLowerCase().includes(
            searchText.toLowerCase()
          )
        )}
        renderItem={({ item: history }) => {
          return <ManageOrdersItem {...history} info={history} />;
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
  textv: {
    fontSize: 16,
    color: "#B5B5B5",
    marginLeft: 10,
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
  addButton: {
    width: 195,
    height: 50,
    borderRadius: 100 / 2,
    borderWidth: 0.4,
    backgroundColor: "white",
    marginStart: "45%",
    marginTop: "150%",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#2F85F8",
  },
});
export default Order;
