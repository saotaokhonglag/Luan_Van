import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import Item from "./Item/orderItems";
import Feather from "react-native-vector-icons/Feather";
import { db } from "../../../firebase_config";
import {
  collection,
  query,
  onSnapshot,
  where,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { LogBox } from "react-native";
import { useUser } from "../../store/GlobalContext";
import { theme } from "../../contants/theme";
import AppLoader from "../../components/AppLoader";
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const { width, height } = Dimensions.get("window");

const AddOrder = ({ info, navigation }) => {
  const [hasPermision, sethHasPermision] = useState(null);
  const [scanned, setScanned] = useState(false);
  const {
    userInfo,
    userProfile,
    setUserProfile,
    product,
    setProduct,
    loginPending,
    setLoginPending,
  } = useUser();
  const [tc, settc] = useState(0);

  const askForCameraPermision = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      sethHasPermision(status == "granted");
    })();
  };

  async function getProductsTemp() {
    setLoginPending(true);
    const q = doc(db, "sinhvien", userInfo.id);
    const ref = query(collection(q, "Cart"), where("soluong", ">", 0));
    const unsubscribe = await onSnapshot(ref, (querySnapshot) => {
      const stock = [];
      querySnapshot.forEach((d) => {
        stock.push(d.data());
      });
      setProduct(stock);
      let totalPrice = 0;
      stock.forEach((item) => {
        totalPrice += item.soluong * item.gia;
      });
      settc(totalPrice);
    });
    setLoginPending(false);
  }

  async function handleBarCodeScaner({ data }) {
    setLoginPending(true);
    setScanned(true);
    const q = query(collection(db, "sanpham"), where("idsp", "==", data));
    const unsubscribe = await onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((d) => {
        const docRef = doc(db, "sinhvien", userProfile.iduser);
        if (Array.isArray(product) && product.length === 0) {
          setDoc(doc(docRef, "Cart", data), {
            idsp: data,
            gia: d.data().gia,
            soluong: 1,
            tensp: d.data().tensp,
            image: "",
            id_DV: d.data().id_DV,
            image: d.data().image,
          });
        } else {
          const found = product.some((el) => el.idsp === data);
          if (!found) {
            setDoc(doc(docRef, "Cart", data), {
              idsp: data,
              gia: d.data().gia,
              soluong: 1,
              tensp: d.data().tensp,
              image: "",
              id_DV: d.data().id_DV,
              image: d.data().image,
            });
            return true;
          } else {
            product.some((item) => {
              if (item.idsp === data) {
                updateDoc(doc(docRef, "Cart", data), {
                  soluong: item.soluong + 1,
                });
                return true;
              }
            });
          }
        }
      });
    });
    setLoginPending(false);
  }
  useEffect(() => {
    let isApiSubscribed = true;
    Total();
    askForCameraPermision();
    getProductsTemp();
    return () => {
      isApiSubscribed = false;
    };
  }, []);

  if (hasPermision === null) {
    return (
      <View style={styles.container}>
        <Text>Yêu cầu sử dụng camera</Text>
      </View>
    );
  }

  if (hasPermision === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>Không thể truy cập camera</Text>
        <Button title={"Allow Camera"} onPress={() => askForCameraPermision} />
      </View>
    );
  }

  async function Total() {
    let totalPrice = 0;
    product.forEach((item) => {
      totalPrice += item.soluong * item.gia;
    });
    settc(totalPrice);
  }

  function header() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.info}>
          <Feather size={25} name="info" color={"#FF3636"} />
          <Text style={{ paddingLeft: 10, fontSize: 18 }}>
            Bấm vào sản phẩm để chỉnh sửa
          </Text>
        </View>
        <View style={styles.barCodeBox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScaner}
            style={{ height: 600, width: 400, marginLeft: -30 }}
          />
        </View>
        {scanned && (
          <Button
            title={"Scanner Again?"}
            onPress={() => setScanned(false)}
            color="tomato"
          />
        )}
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2F85F8" />
        <FlatList
          keyExtractor={(item) => item.idsp}
          data={product}
          renderItem={({ item: product }) => {
            return <Item {...product} info={product} />;
          }}
          ListHeaderComponent={header}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("DetailOrder")}
          style={styles.buttonCheckout}
        >
          <Text style={{ ...styles.text, fontWeight: "bold" }}>
            {tc.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}đ
          </Text>
          <Text style={{ ...styles.text, fontWeight: "bold" }}>Tiếp tục</Text>
        </TouchableOpacity>
      </SafeAreaView>
      {loginPending ? <AppLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  barCodeBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: "100%",
    overflow: "hidden",
    backgroundColor: "tomato",
    marginTop: 10,
  },
  buttonCT: {
    width: "90%",
    height: 55,
    borderRadius: 15,
    backgroundColor: "#2F85F8",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    width: "30%",
  },
  info: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  buttonCheckout: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: theme.colors.primary,
    height: 55,
    marginTop: height - 120,
    width: width - 50,
    borderRadius: 5,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

export default AddOrder;
