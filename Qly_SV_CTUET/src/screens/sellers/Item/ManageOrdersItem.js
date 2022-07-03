import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../../firebase_config";
import { query, collection, where, onSnapshot } from "firebase/firestore";
const { width, height } = Dimensions.get("window");
const ManageOrdersItem = ({ info }) => {
  const navigation = useNavigation();
  const [slsp, setSlSP] = useState();
  const [idHD, setIdHD] = useState();
  const [userName, setUserName] = useState();
  useEffect(() => {
    getData();
    return () => {};
  }, []);

  async function getData() {
    const ref = query(collection(db, "HoaDon"), where("magd", "==", magd));
    const data = [];
    const id = [];
    const iduser = [];
    const un = await onSnapshot(ref, (querySnapshot) => {
      querySnapshot.forEach((d) => {
        data.push(d.data().SoLuongSP);
        id.push(d.data().id_HD);
        iduser.push(d.data().iduser);
      });
      setSlSP(data);
      setIdHD(id);
      setUserName(iduser);
    });
  }
  const { id_DV, ThoiGianGiaoDich, loaiGD, magd, sotien, iduser, hovaten } =
    info;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("DetailsOrder", {
          idHD: idHD,
          slsp: slsp,
          sotien: sotien,
          iduser: iduser,
        })
      }
      style={styles.container}
    >
      <View style={styles.bodyView}>
        <Text style={{ fontSize: 18, color: "#999999" }}>
          {ThoiGianGiaoDich}
        </Text>
        <View style={styles.detailView}>
          <Text style={{ fontSize: 18 }}>#{idHD}</Text>
          <View style={styles.price}>
            <Text style={{ fontSize: 18 }}>
              {sotien.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}đ
            </Text>
            <Text style={{ fontSize: 15 }}>{slsp} sản phẩm</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ManageOrdersItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    justifyContent: "center",
    marginVertical: 5,
  },
  bodyView: {
    width: width,
    paddingHorizontal: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  detailView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    height: 60,
  },
  price: {
    width: 180,
    alignItems: "flex-end",
  },
});
