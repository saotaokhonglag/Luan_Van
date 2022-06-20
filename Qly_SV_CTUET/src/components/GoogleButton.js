import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const windowHeight = Dimensions.get("window").height;

export default function GoogleButton(props) {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, { backgroundColor: "#f5e7ea" }]}
      {...props}
    >
      <View style={styles.iconWrapper}>
        <FontAwesome
          name="google"
          style={styles.icon}
          size={22}
          color={"red"}
        />
      </View>
      <View style={styles.btnTxtWarpper}>
        <Text style={[styles.btnText, { color: "#de4d41" }]}>
          Đăng nhập với Student email
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: windowHeight / 15,
    padding: 10,
    flexDirection: "row",
    borderRadius: 3,
  },
  iconWrapper: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontWeight: "bold",
  },
  btnTxtWarpper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
