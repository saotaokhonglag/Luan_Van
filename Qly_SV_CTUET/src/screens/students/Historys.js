import { View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useUser } from "../../store/GlobalContext";
import { db } from "../../../firebase_config";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import HistoryItem from "./Item/HistoryItem";
import AppLoader from "../../components/AppLoader";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "EventEmitter.removeListener",
  "ViewPropTypes will be removed",
  "Can't perform a React state update on an unmounted component",
]);

const Historys = () => {
  const { userProfile, loginPending, setLoginPending } = useUser();
  const [history, setHistory] = useState();

  useEffect(() => {
    let isApiSubscribed = true;
    getHistory();
    return () => {
      isApiSubscribed = false;
    };
  }, []);
  async function getHistory() {
    setLoginPending(true);
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
    setLoginPending(false);
  }
  return (
    <>
      <View style={{ flex: 1, alignItems: "center" }}>
        <FlatList
          keyExtractor={(item) => item.magd}
          data={history}
          renderItem={({ item: history }) => {
            return <HistoryItem {...history} info={history} />;
          }}
        />
      </View>
      {loginPending ? <AppLoader /> : null}
    </>
  );
};

export default Historys;
