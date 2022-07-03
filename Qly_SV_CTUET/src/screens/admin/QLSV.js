import { collection, query, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import { db } from "../../../firebase_config.js";
import DSSVItem from "./Item/DSSVItem.js";

const DSQLSV = ({ navigation }) => {
  const [data, setData] = useState();
  useEffect(() => {
    getData();

    return () => {};
  }, []);

  async function getData() {
    const ref = query(collection(db, "sinhvien"));
    const un = await onSnapshot(ref, (querySnap) => {
      let totalStu = [];
      querySnap.forEach((d) => {
        totalStu.push(d.data());
      });
      setData(totalStu);
    });
  }
  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={(item) => item.iduser}
        data={data}
        renderItem={({ item: data }) => {
          return <DSSVItem {...data} info={data} />;
        }}
      />
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
});
export default DSQLSV;
