import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");

const DetialsOrderItem = ({ info }) => {
  const navigation = useNavigation();
  const { idsp, tensp, gia, soluong } = info;

  return (
    <SafeAreaView>
      <View style={styles.orderBodyItem}>
        <View
          style={{
            width: 150,
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Text style={styles.text}>{tensp}</Text>
          <Text
            style={{
              marginTop: 5,
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            {gia.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
          </Text>
        </View>

        <View
          style={{
            width: 50,
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>x{soluong}</Text>
        </View>
        <View style={{ width: 130, alignItems: "flex-end" }}>
          <Text style={styles.text}>
            {(gia * soluong)
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  orderBodyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default DetialsOrderItem;
