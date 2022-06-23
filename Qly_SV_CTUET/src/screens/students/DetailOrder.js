import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";
import { db } from "../../../firebase_config";
import {
  collection,
  addDoc,
  query,
  getDoc,
  onSnapshot,
  where,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../contants/theme";
import Item from "../../components/confirmItems";
import { userContext } from "../../store/GlobalContext";
import moment from "moment";

const { width } = Dimensions.get("window");

const DetailOrder = ({ navigation, info }) => {
  const { userInfo, product, setProduct, userProfile, walletBalance } =
    useContext(userContext);
  const [idHD, setIdHD] = useState("");
  const [idGD, setIdGD] = useState("");
  const [idDV, setIdDV] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isApiSubscribed = true;
    getIdHD();
    getIdGD();
    getProductsTemp();
    Total();
    return () => {
      isApiSubscribed = false;
    };
  }, [isLoading]);

  async function getIdHD() {
    setIdHD("HD" + moment().format("DDMMYYYYHHmmss"));
  }
  async function getIdGD() {
    setIdGD("GD" + moment().format("DDMMYYYYHHmmss"));
    setCurrentDate(moment().format("DD/MM/YYYY HH:mm"));
  }

  async function getProductsTemp() {
    const q = doc(db, "sinhvien", userInfo.id);
    const ref = query(collection(q, "Cart"), where("soluong", ">", 0));
    const unsubscribe = await onSnapshot(ref, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((d) => {
        cities.push(d.data());
        cities.find((o, i) => {
          if (o.id_DV === cities[i].id_DV) {
            setIdDV(cities[i].id_DV);
            return true;
          }
        });
      });
      setProduct(cities);
    });
  }
  async function Total() {
    let ttp = 0;
    let tt = 0;
    product.forEach((item) => {
      ttp += item.soluong;
      tt += item.soluong * item.gia;
      setTotalPrice(tt);
      setTotalProducts(ttp);
    });
  }

  async function CheckOut() {
    setIsLoading(true);
    if (Array.isArray(product) && product.length === 0) {
      alert("Hóa đơn của bạn hiện tại đang trống");
    } else {
      if (walletBalance < totalPrice) {
        Alert.alert(
          "Số dư không đủ",
          "Vui lòng nạp thêm tiền vào ví để thực hiện dịch vụ"
        );
        setIsLoading(false);
      } else {
        const ref = doc(db, "sinhvien", userProfile.iduser);
        addDoc(collection(db, "HoaDon"), {
          id_HD: idHD,
          iduser: userInfo.id,
          magd: idGD,
          TongTien: totalPrice,
          SoLuongSP: totalProducts,
          id_DV: idDV,
        });
        setDoc(doc(db, "giaodich", idGD), {
          magd: idGD,
          iduser: userInfo.id,
          mota: "Thanh toán hóa đơn",
          ThoiGianGiaoDich: currentDate,
          sotien: totalPrice,
          loaiGD: "tt",
          id_DV: idDV,
        });
        product.forEach(async (item) => {
          addDoc(collection(db, "ct_hoadon"), {
            id_HD: idHD,
            id_SP: item.idsp,
            tensp: item.tensp,
            gia: item.gia,
            soluong: item.soluong,
            image: "",
          });
        });
        updateDoc(doc(ref, "vi", userProfile.iduser), {
          sodu: walletBalance - totalPrice,
        });
        Alert.alert("Thanh toán thành công", "Bạn đã hoàn tất thanh toán");
        navigation.replace("CheckOut", { idHD, currentDate });
      }
    }
    setIsLoading(false);
  }

  function footer() {
    return (
      <View style={styles.deltialView}>
        <View style={styles.textDeltialView}>
          <Text style={{ fontSize: 18 }}>Tổng {totalProducts} sản phẩm</Text>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            {totalPrice.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
          </Text>
        </View>
        <View style={styles.textDeltialView}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Tổng cộng</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FF0000" }}>
            {totalPrice.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
          </Text>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFF" />
      <View style={styles.productsView}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.addProduct}
        >
          <Text style={{ color: theme.colors.primary, fontSize: 16 }}>
            + Thêm sản phẩm
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        keyExtractor={(item) => item.idsp}
        data={product}
        renderItem={({ item: product }) => {
          return <Item {...product} info={product} />;
        }}
        // ListHeaderComponent={header}
        ListFooterComponent={footer}
      />

      <TouchableOpacity
        onPress={() => CheckOut()}
        style={{
          height: 55,
          backgroundColor: theme.colors.primary,
          width: width - 40,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#FFFF", fontSize: 18, fontWeight: "bold" }}>
          Thanh toán
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    fontFamily: "sans-serif",
  },

  imageProducts: {
    flexDirection: "row",
    alignItems: "center",
  },
  addProduct: {
    alignItems: "flex-end",
    justifyContent: "center",
  },

  productsView: {
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    marginTop: 7,
    width: "100%",
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    height: 40,
    justifyContent: "center",
  },

  deltialView: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    backgroundColor: "#FFFF",
    width: width,
  },
  textDeltialView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width,
    marginVertical: 5,
    paddingHorizontal: 20,
  },
});

export default DetailOrder;
