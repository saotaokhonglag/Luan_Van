import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { Feather } from "@expo/vector-icons";
import { theme } from "../../contants/theme";

const { width } = Dimensions.get("window");
const CreateProduct = ({ navigation }) => {
  return (
    <View style={{ flexDirection: "column", alignItems: "center" }}>
      <TouchableOpacity style={styles.addButton}>
        <Image
          source={require("../image/add-image.png")}
          style={{ width: 30, height: 30 }}
        />
        <Text style={styles.text}>Tải ảnh lên</Text>
      </TouchableOpacity>
      <View style={[styles.addView, { marginTop: 40 }]}>
        <TextInput
          style={styles.textv}
          autoCapitalize="none"
          placeholder=" Ví dụ: Bún đậu để dành mai ăn 24 chả/phần"
        ></TextInput>
      </View>
      <View style={[{ marginTop: 20, flexDirection: "row" }]}>
        <View style={[styles.addView1, { marginLeft: 10 }]}>
          <TextInput
            style={styles.textv}
            autoCapitalize="none"
            placeholder="Giá"
          ></TextInput>
        </View>
        <View style={[styles.addView1, { marginLeft: 30 }]}>
          <TextInput
            style={styles.textv}
            autoCapitalize="none"
            placeholder="Số lượng"
          ></TextInput>
        </View>
      </View>
      <View
        style={[
          styles.addView1,
          { width: width - 25, marginVertical: 10, marginLeft: 10 },
        ]}
      >
        <TextInput
          style={styles.textv}
          autoCapitalize="none"
          placeholder="Đơn vị"
        ></TextInput>
      </View>
      <View style={[styles.addView, { marginTop: 20 }]}>
        <TextInput
          style={styles.textv}
          autoCapitalize="none"
          placeholder="Mã sản phẩm"
        ></TextInput>
      </View>
      <View style={[styles.addView, { marginTop: 20 }]}>
        <TextInput
          style={styles.textv}
          autoCapitalize="none"
          placeholder="Danh mục"
        ></TextInput>
        <View style={{ paddingLeft: 220 }}>
          <Feather name="chevron-down" size={30} />
        </View>
      </View>
      <TouchableOpacity style={styles.createButton}>
        <Text style={{ color: "#FFFF", fontSize: 18, fontWeight: "bold" }}>
          Tạo sản phẩm
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  addButton: {
    width: 150,
    height: 50,
    borderRadius: 10,
    borderWidth: 0.4,
    alignItems: "center",
    marginTop: 20,
    marginLeft: 10,
    padding: 5,
    backgroundColor: "white",
    borderColor: "#2F85F8",
    flexDirection: "row",
  },
  addView: {
    width: 370,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    marginLeft: 10,
    padding: 5,
    backgroundColor: "white",
    borderColor: "black",
    flexDirection: "row",
  },
  addView1: {
    width: 170,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    padding: 5,
    backgroundColor: "white",
    borderColor: "black",
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
    color: "#2F85F8",
    marginLeft: 10,
  },
  textv: {
    fontSize: 16,
    color: "#B5B5B5",
    marginLeft: 20,
    alignItems: "center",
  },
  createButton: {
    height: 50,
    width: width - 20,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
});
export default CreateProduct;
