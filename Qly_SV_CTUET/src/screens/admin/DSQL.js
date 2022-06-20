import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Avatar } from "react-native-paper";
import CusDSQL from "./CusDSQL.js";
import { db } from "../../../firebase_config.js";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
const DSQL = ({ navigation }) => {
  const [data, getData] = useState([]);
  async function GetDATA() {
    const citiesRef = collection(db, "quanly");

    const ref = query(citiesRef);
    const unsubscribe = await onSnapshot(ref, (querySnapshot) => {
      const stock = [];
      querySnapshot.forEach((d) => {
        stock.push(d.data());
      });
      getData(stock);
    });
  }

  useEffect(() => {
    GetDATA();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={(item) => item.id_NV}
        data={data}
        renderItem={({ item: data }) => {
          return <CusDSQL {...data} info={data} />;
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("NVQL");
        }}
        style={styles.button}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Thêm nhân viên</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lineLeft: {
    fontSize: 20,
    color: "#333333",
    marginLeft: 5,
    fontWeight: "800",
  },
  itemsList: {
    backgroundColor: "white",
    borderColor: "black",
    flex: 1,
  },
  button: {
    width: 200,
    height: 60,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#18A2EB",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
  },
});
export default DSQL;
