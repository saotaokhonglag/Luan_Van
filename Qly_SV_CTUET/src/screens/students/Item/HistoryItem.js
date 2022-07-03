import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
const HistoryItem = ({ info }) => {
  const navigation = useNavigation();
  const { magd, iduser, loaiGD, mota, sotien, ThoiGianGiaoDich, id_DV } = info;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(
          loaiGD == "nt" ? "AddMoneyDetail" : "DirectoryDetail",
          {
            magd: info.magd,
            iduser: info.iduser,
            loaiGD: info.loaiGD,
            mota: info.mota,
            time: info.ThoiGianGiaoDich,
            sotien: info.sotien,
            id_DV: info.id_DV,
          }
        );
      }}
      style={styles.historyView}
    >
      <View style={styles.historyHeader}>
        {loaiGD == "tt" ? (
          <ImageBackground
            source={require("../../../image/order.png")}
            style={{ height: 25, width: 25, marginRight: 5 }}
          />
        ) : (
          <ImageBackground
            source={require("../../../image/money.png")}
            style={{ height: 25, width: 25, marginRight: 5 }}
          />
        )}

        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
          {loaiGD == "tt" ? "Thanh toán" : "Nạp tiền"}
        </Text>
      </View>
      <View style={styles.historyBody}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{mota}</Text>
        <Text style={{ fontSize: 15 }}>
          {loaiGD == "nt"
            ? "Quý khách đã nạp thành công số tiền "
            : "Bạn đã thực hiện thanh toán hóa đơn thành công với số tiền "}
          {sotien}đ. Cảm ơn bạn đã sử dụng dịch vụ.
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  historyView: {
    width: width - 20,
    backgroundColor: "#FFFF",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  historyHeader: {
    flexDirection: "row",
    width: width - 50,
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    alignItems: "center",
  },
  historyBody: {
    width: width - 50,
    marginVertical: 5,
  },
});

export default HistoryItem;
