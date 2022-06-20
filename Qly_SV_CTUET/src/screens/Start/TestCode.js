import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import React, { useState, useEffect, useContext } from "react";

export default function TestCode() {
  const [currentDate, setCurrentDate] = useState("");
  const [currentDateMoment, setCurrentDateMoment] = useState("");
  const [seco, setSecon] = useState(0);

  useEffect(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    setCurrentDate(moment().format("DD/MM/YYYY HH:mm"));

    return () => {};
  }, [seco]);
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>{currentDate}</Text>
      <Text>{currentDateMoment}</Text>
      <Text>{seco}</Text>
      <TouchableOpacity
        onPress={() => setSecon(1 + 3)}
        style={{
          height: 30,
          width: 200,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
        }}
      >
        <Text>Click here</Text>
      </TouchableOpacity>
    </View>
  );
}
