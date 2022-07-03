import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useContext } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { db } from "../../../firebase_config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useUser } from "../../store/GlobalContext";
import { theme } from "../../contants/theme";
import AppLoader from "../../components/AppLoader";

const { width, height } = Dimensions.get("window");
const EditPd = ({ route, navigation }) => {
  const item = route.params;
  const { loginPending, setLoginPending, userProfile } = useUser();
  const [curPrice, setCurPrice] = useState(item.totals);

  function AddQty(item) {
    item.quantity++;
    setCurPrice(item.quantity * item.price);
  }
  function DecQty(item) {
    if (item.quantity > 0) {
      item.quantity--;
      setCurPrice(item.quantity * item.price);
    }
  }

  async function updateCart() {
    setLoginPending(true);
    const ref = doc(db, "sinhvien", userProfile.iduser);
    await updateDoc(doc(ref, "Cart", item.idsp), {
      soluong: item.quantity,
    });
    navigation.navigate("AddOrder");
    setLoginPending(false);
  }

  async function deleteCart() {
    setLoginPending(true);
    const ref = doc(db, "sinhvien", userProfile.iduser);
    await deleteDoc(doc(ref, "Cart", item.idsp));
    navigation.navigate("AddOrder");
    setLoginPending(false);
  }
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.infoContainer}>
            {item.img != "" ? (
              <ImageBackground
                source={{
                  uri: item.img,
                }}
                style={{ height: 65, width: 65 }}
              />
            ) : (
              <ImageBackground
                source={require("../../image/imagenull.jpg")}
                style={{ height: 65, width: 65 }}
              />
            )}

            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.location}>
                Giá:{" "}
                {item.price
                  .toFixed(0)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                đ
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "flex-start",
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "300" }}>
                  Số lượng:{" "}
                </Text>
                <AntDesign
                  name="minuscircle"
                  size={24}
                  color="black"
                  onPress={() => DecQty(item)}
                />
                <Text style={{ marginLeft: 10 }}>{item.quantity}</Text>
                <AntDesign
                  style={{ marginLeft: 10 }}
                  name="pluscircle"
                  size={24}
                  color="black"
                  onPress={() => AddQty(item)}
                />
              </View>
              <Text style={styles.location}>
                Thành tiền:{" "}
                {curPrice.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}đ
              </Text>
              <TouchableOpacity
                onPress={() => {
                  updateCart();
                }}
                style={styles.update}
              >
                <Text style={styles.textButton}>Cập nhật</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  deleteCart();
                }}
                style={styles.delete}
              >
                <Text style={styles.textButton}>Xóa sản phẩm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {loginPending ? <AppLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  infoContainer: {
    padding: 15,
    backgroundColor: "#FFEFD5",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "black",
  },
  location: {
    fontSize: 16,
    fontWeight: "400",
    color: "#787878",
    marginBottom: 10,
    color: "black",
  },
  icon: {
    alignItems: "flex-start",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  delete: {
    flex: 1,
    backgroundColor: "red",
    height: 50,
    width: width - 30,
    marginVertical: 7,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "#FFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  update: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    height: 50,
    width: width - 30,
    marginVertical: 7,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditPd;
