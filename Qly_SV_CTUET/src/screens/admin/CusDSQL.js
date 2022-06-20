import React from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Avatar } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
const CusDSQL = ({ info }) => {
  const { hovaten, sdt } = info;
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          marginTop: 5,
          paddingHorizontal: 5,
          backgroundColor: "#FFFF",
          height: 80,
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 0.5,
        }}
      >
        <Avatar.Image
          source={{
            uri: "https://hinhnen123.com/wp-content/uploads/2021/06/anh-avatar-cute-dep-nhat-5.jpg",
          }}
          size={70}
        />
        <View
          style={{ flexDirection: "column", marginLeft: 10, marginTop: 10 }}
        >
          <Text style={styles.lineLeft}>{hovaten}</Text>
          <Text style={styles.lineLeft}>Điện thoại: {sdt}</Text>
        </View>
        <Ionicons
          name="menu"
          size={30}
          color="black"
          style={{ marginLeft: 50, alignSelf: "center" }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lineLeft: {
    fontSize: 20,
    color: "#333333",
    marginLeft: 5,
  },
});
export default CusDSQL;
