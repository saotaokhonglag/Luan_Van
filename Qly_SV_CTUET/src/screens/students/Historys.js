import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useUser } from "../../store/GlobalContext";
import { db } from "../../../firebase_config";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import HistoryItem from "../../components/HistoryItem";

const Historys = () => {
  const { userInfo, setUserInfo, userProfile } = useUser();
  const [history, setHistory] = useState();

  useEffect(() => {
    let isApiSubscribed = true;
    getHistory();
    return () => {
      isApiSubscribed = false;
    };
  }, []);
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
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <FlatList
        keyExtractor={(item) => item.magd}
        data={history}
        renderItem={({ item: history }) => {
          return <HistoryItem {...history} info={history} />;
        }}
        // ListHeaderComponent={header}
        // ListFooterComponent={Total}
      />
    </View>
  );
};

export default Historys;

const styles = StyleSheet.create({});
