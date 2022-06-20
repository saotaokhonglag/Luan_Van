import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";

const LogoutModal = (props) => {
  const logOut = (bool) => {
    props.LogOut(bool);
  };
  const cancelModal = (bool) => {
    props.cancelModal(bool);
  };
  return (
    <TouchableOpacity disabled={true} style={styles.contaier}>
      <View style={styles.modal}>
        <View style={styles.textView}>
          <Text style={styles.text}>Đăng xuất</Text>
          <Text style={styles.text}>Bạn có muốn đăng xuất không?</Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={() => logOut(false)}
            style={styles.buttonModal}
          >
            <Text style={{ ...styles.text, color: "blue" }}>OK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => cancelModal(false)}
            style={{ ...styles.buttonModal, borderLeftWidth: 0.5 }}
          >
            <Text style={{ ...styles.text, color: "blue" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    height: 150,
    width: Dimensions.get("window").width - 80,
    paddingTop: 10,
    backgroundColor: "#FFFF",
    borderRadius: 10,
    borderWidth: 0.5,
  },
  textView: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    margin: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonView: {
    width: "100%",
    flexDirection: "row",
    borderTopWidth: 0.5,
  },
  buttonModal: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
});

export default LogoutModal;
