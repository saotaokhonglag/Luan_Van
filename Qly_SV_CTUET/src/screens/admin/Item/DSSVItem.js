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
const DSSVItem = ({ info }) => {
  const { hovaten, sdt, image, id_NV } = info;
  async function onPressDelete() {
    setModalVisibleDirectory(true);
    setId_sp(id_NV);
  }

  async function onPressEdit() {
    setModalVisibleDelete(true);
    setId_sp(id_NV);
    console.log(id_NV);
  }
  var swipeoutBtns = [
    {
      backgroundColor: "red",
      text: "Xóa",
      onPress: onPressDelete,
    },
    {
      backgroundColor: "green",
      text: "Sửa",
      onPress: onPressEdit,
    },
  ];
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          marginTop: 5,
          paddingHorizontal: 5,
          backgroundColor: "#FFFF",
          height: 90,
          justifyContent: "flex-start",
          alignItems: "center",
          borderBottomWidth: 0.5,
        }}
      >
        {image != "" ? (
          <Avatar.Image
            source={{
              uri: image,
            }}
            size={70}
          />
        ) : (
          <Avatar.Image
            source={{
              uri: "https://hinhnen123.com/wp-content/uploads/2021/06/anh-avatar-cute-dep-nhat-5.jpg",
            }}
            size={70}
          />
        )}

        <View
          style={{ flexDirection: "column", marginLeft: 10, marginTop: 10 }}
        >
          <Text style={styles.lineLeft}>{hovaten}</Text>
          <Text style={styles.lineLeft}>Điện thoại: {sdt}</Text>
        </View>
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
export default DSSVItem;
