import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useContext } from "react";
import { theme } from "../../contants/theme";
import { numberValidator } from "../../helpers/numberValidate";
import TextInput from "../TextInput";
const AddMoneyModal = (props) => {
  const [money, setMoney] = useState({ value: "", error: "" });

  const Add = (bool, moneyProp) => {
    const numberErr = numberValidator(money.value);
    if (numberErr) {
      setMoney({ ...money, error: numberErr });
      return;
    }
    props.Add(bool, moneyProp);
  };
  const cancelModal = (bool) => {
    props.cancelModal(bool);
  };
  return (
    <TouchableOpacity disabled={true} style={styles.contaier}>
      <View style={styles.modal}>
        <View style={styles.textView}>
          <Text style={styles.text}>Nạp tiền</Text>
          <TouchableOpacity
            onPress={() => cancelModal(false)}
            style={{
              height: 30,
              width: 30,
              justifyContent: "center",
              alignItems: "center",
              marginRight: -110,
              marginVertical: 1,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>X</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          label="Số tiền cần nạp"
          returnKeyType="next"
          value={money.value}
          onChangeText={(text) => setMoney({ value: text, error: "" })}
          error={!!money.error}
          errorText={money.error}
          autoCapitalize="none"
          keyboardType="numeric"
          maxLength={10}
        />
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => Add(false, money)}
          style={styles.buttonModal}
        >
          <Text
            style={{
              ...styles.text,
              color: "#FFFF",
              marginStart: 80,
            }}
          >
            Nạp tiền
          </Text>
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
  },
  modal: {
    height: 250,
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
    marginRight: 70,
  },
  buttonView: {
    height: 60,
    width: Dimensions.get("window").width - 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: -60,
  },
  buttonModal: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
  },
});

export default AddMoneyModal;
