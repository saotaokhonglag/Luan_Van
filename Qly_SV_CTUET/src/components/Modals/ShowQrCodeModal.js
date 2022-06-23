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
import { useUser } from "../../store/GlobalContext";
import QRCode from "react-native-qrcode-svg";
const ShowQrCodeModal = (props) => {
  const { qrcode, setQrcode } = useUser();
  const showvisible = (bool) => {
    props.showvisible(bool);
  };
  const cancelModal = (bool) => {
    props.cancelModal(bool);
  };
  return (
    <TouchableOpacity disabled={true} style={styles.contaier}>
      <View style={styles.modal}>
        <View style={styles.textView}>
          <Text style={styles.text}>
            Thêm sản phẩm thành công, hãy chụp mã QR lại để in cho sản phẩm!
          </Text>
        </View>

        <QRCode value={qrcode ? qrcode : "NA"} size={200}></QRCode>

        <TouchableOpacity
          onPress={() => cancelModal(false)}
          style={styles.buttonModal}
        >
          <Text style={{ color: "#FFFF", fontWeight: "bold" }}>OK</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  modal: {
    height: 332,
    width: Dimensions.get("window").width - 80,
    backgroundColor: "#FFFF",
    borderRadius: 10,
    borderWidth: 0.5,
    alignItems: "center",
  },
  textView: {
    justifyContent: "center",
    height: 50,
    width: Dimensions.get("window").width - 80,
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    margin: 5,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  buttonModal: {
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    width: "100%",
    justifyContent: "center",
    height: 50,
    marginTop: 11,
  },
});

export default ShowQrCodeModal;
