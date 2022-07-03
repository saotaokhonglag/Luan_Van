import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import Swipeout from "react-native-swipeout";
import { useUser } from "../../../store/GlobalContext";
import { useNavigation } from "@react-navigation/native";
const CusDSQL = ({ info }) => {
  const navigation = useNavigation();
  const { hovaten, sdt, image, id_NV, id_DV } = info;
  const { setModalVisibleDeleteMananger, setId_sp } = useUser();
  async function onPressDelete() {
    setModalVisibleDeleteMananger(true);
    setId_sp(id_NV);
  }

  async function onPressEdit() {
    navigation.navigate("UpdateMananger", {
      hovaten: info.hovaten,
      sdt: info.sdt,
      image: info.image,
      id_NV: info.id_NV,
      id_DV: info.id_DV,
    });
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
    <Swipeout right={swipeoutBtns}>
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
    </Swipeout>
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
