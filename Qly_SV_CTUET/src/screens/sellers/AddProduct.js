import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";

const AddProduct = ({ navigation }) => {
  return (
    <View>
      <View style={styles.view}>
        <Text style={{ fontSize: 20 }}>Tất cả sản phẩm(1)</Text>
        <View style={{ paddingLeft: 260 }}></View>
      </View>
      <View
        style={{
          borderTopColor: "#dddddd",
          borderTopWidth: 1,
        }}
      />
      <TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.cusImage}
            source={require("../image/hoc-nau-bun-dau-mo-quan.jpg")}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 20 }}>
              Bún Nè
            </Text>
            <Text style={{ fontSize: 18, color: "#F6720B" }}>200.000</Text>
          </View>
        </View>
        <View
          style={[
            styles.menuItem,
            {
              borderTopColor: "#dddddd",
              borderTopWidth: 1,
            },
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.cusImage}
            source={require("../image/Thucuong.jpg")}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 20 }}>
              Đồ uống
            </Text>
            <Text style={{ fontSize: 18, color: "#F6720B" }}>20.000</Text>
          </View>
        </View>
        <View
          style={[
            styles.menuItem,
            {
              borderTopColor: "#dddddd",
              borderTopWidth: 1,
            },
          ]}
        />
      </TouchableOpacity>
      <View style={styles.addButton}>
        <TouchableOpacity
          onPress={() => {
            console.log("hello");
          }}
          style={{
            backgroundColor: "#2F85F8",
            width: 310,
            height: 50,
            borderRadius: 10,
            borderWidth: 0.4,
            marginTop: "100%",
            alignItems: "center",
            padding: 5,
            marginLeft: 30,
          }}
        >
          <Text
            style={{
              color: "#FCF4F4FF",
              fontSize: 18,
              marginLeft: 10,
              marginTop: 5,
            }}
          >
            Thêm sản phẩm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  view: {
    height: 40,
    marginStart: 10,
    marginTop: 10,
    flexDirection: "row",
  },
  cusImage: {
    width: 80,
    height: 90,
    borderRadius: 50 / 2,
    borderWidth: 0.4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  addButton: {
    marginLeft: 10,
    flexDirection: "row",
  },
});
export default AddProduct;
