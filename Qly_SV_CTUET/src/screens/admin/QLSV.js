import React from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Avatar } from "react-native-paper";
import CusDSQL from "./CusDSQL.js";
const data = [
  {
    id: 1,
    ten: "THAINGUYEN",
    sdt: "0939205421",
  },
  {
    id: 3,
    ten: "HONGPHAT",
    sdt: "0123456789",
  },
  {
    id: 4,
    ten: "NHATMINH",
    sdt: "0123456789",
  },
];
const DSQLSV = ({ navigation }) => {
  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({ item: data }) => {
          return <CusDSQL {...data} info={data} />;
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
export default DSQLSV;
