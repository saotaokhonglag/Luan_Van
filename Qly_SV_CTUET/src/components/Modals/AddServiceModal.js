import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { theme } from "../../contants/theme";
import TextInput from "../TextInput";
import { userNameValidator } from "../../helpers/userNameValidator";

const AddServiceModal = (props) => {
  const [serviceName, setServiceName] = useState({ value: "", error: "" });

  const logOut = (bool, serviceName) => {
    props.LogOut(bool, serviceName);
  };
  const cancelModal = (bool) => {
    props.cancelModal(bool);
  };
  return (
    <TouchableOpacity disabled={true} style={styles.contaier}>
      <View style={styles.modal}>
        <View style={styles.textView}>
          <Text style={styles.text}>Thêm Dịch vụ</Text>
          <TouchableOpacity
            onPress={() => cancelModal(false)}
            style={{
              height: 30,
              width: 30,
              justifyContent: "center",
              alignItems: "center",
              marginRight: -80,
              marginVertical: 1,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>X</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            label="Tên dịch vụ"
            returnKeyType="next"
            value={serviceName.value}
            onChangeText={(text) => setServiceName({ value: text, error: "" })}
            error={!!serviceName.error}
            errorText={serviceName.error}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={() => logOut(false, serviceName)}
            style={styles.buttonModal}
          >
            <Text
              style={{
                ...styles.text,
                color: "#FFFF",
                marginStart: 60,
              }}
            >
              Thêm dịch vụ
            </Text>
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
    height: 200,
    width: Dimensions.get("window").width - 80,
    paddingTop: 10,
    backgroundColor: "#FFFF",
    borderRadius: 10,
    borderWidth: 0.5,
  },
  textView: {
    justifyContent: "center",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    height: 40,
  },
  text: {
    margin: 5,
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 60,
  },
  buttonView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginVertical: 11,
  },
  buttonModal: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
  },
});

export default AddServiceModal;
