import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import React from "react";
import { theme } from "../../contants/theme";
const AddMoneyDetail = ({ navigation, route }) => {
  const item = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <View style={styles.bodyView}>
        <View style={styles.header}>
          <ImageBackground
            source={require("../../image/addWallet-Trans.png")}
            style={{ height: 50, width: 50 }}
          />
          <View style={styles.headerItem}>
            <Text style={{ fontSize: 18 }}>NẠP TIỀN VÀO VÍ</Text>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              + {item.sotien}đ
            </Text>
            <Text style={styles.textDer}>Mã giao dịch: {item.magd}</Text>
          </View>
        </View>
        <View style={styles.status}>
          <ImageBackground
            source={require("../../image/check-transaction.png")}
            style={{ height: 18, width: 18, marginHorizontal: 10 }}
          />
          <Text style={styles.textDer}>Giao dịch thành công</Text>
        </View>
        <View style={{ ...styles.itemDeltail, borderBottomWidth: 0.3 }}>
          <Text style={styles.titileItem}>Thời gian thanh toán</Text>
          <Text style={{ ...styles.titileItem, fontWeight: "bold" }}>
            {item.time}
          </Text>
        </View>
        <View style={{ ...styles.itemDeltail, borderBottomWidth: 0.3 }}>
          <Text style={styles.titileItem}>Nguồn tiền</Text>
          <Text style={{ ...styles.titileItem, fontWeight: "bold" }}>
            MBBank
          </Text>
        </View>
        <View style={styles.itemDeltail}>
          <Text style={styles.titileItem}>Tổng phí</Text>
          <Text style={{ ...styles.titileItem, fontWeight: "bold" }}>
            Miễn phí
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => console.log(item.time)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Nạp thêm</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddMoneyDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  bodyView: {
    marginVertical: 10,
    backgroundColor: "#FFFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: Dimensions.get("window").width - 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginStart: 10,
  },
  headerItem: {
    marginStart: 10,
  },
  status: {
    flexDirection: "row",
    marginVertical: 15,
    marginStart: 10,
    backgroundColor: "#E6FFD9",
    height: 30,
    paddingHorizontal: 5,
    alignItems: "center",
    borderRadius: 3,
  },
  itemDeltail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
    height: 50,
    alignItems: "center",
    paddingHorizontal: 5,
  },
  titileItem: {
    fontSize: 16,
  },
  button: {
    width: Dimensions.get("window").width - 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    height: 50,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});
