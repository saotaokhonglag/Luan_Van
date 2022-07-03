import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  Pressable,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Avatar, Title, Caption, Text } from "react-native-paper";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebase_config";
import { useUser } from "../../store/GlobalContext";
const { width } = Dimensions.get("window");
const AdminPage = ({ navigation }) => {
  const { setManangerProfile, setLoginPending } = useUser();
  const [totalMananger, setTotalMananger] = useState();
  const [totalStudent, setTotalStudent] = useState();
  const [ModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMananger();
    getStudents();
    return () => {};
  }, []);

  async function getMananger() {
    const ref = query(collection(db, "quanly"), where("TrangThai", "==", 1));
    const un = await onSnapshot(ref, (querySnap) => {
      let totalManan = 0;
      querySnap.forEach((d) => {
        totalManan += 1;
      });
      setTotalMananger(totalManan);
    });
  }
  async function getStudents() {
    const ref = query(collection(db, "sinhvien"));
    const un = await onSnapshot(ref, (querySnap) => {
      let totalStu = 0;
      querySnap.forEach((d) => {
        totalStu += 1;
      });
      setTotalStudent(totalStu);
    });
  }

  async function LogOut() {
    navigation.reset({
      index: 0,
      routes: [{ name: "StartScreen" }],
    });
    setModalVisible(false);
    setLoginPending(false);
    setManangerProfile();
  }
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={ModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => ModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Bạn có muốn đăng xuất? </Text>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              onPress={LogOut}
              style={[styles.button, styles.buttonOk]}
            >
              <Text style={styles.textStyle}>Xác Nhận</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={[styles.button, styles.buttonCancel]}
            >
              <Text style={styles.textCancel}>Hủy</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <StatusBar barStyle="light-content" backgroundColor="#2F85F8" />
      <View style={styles.circleShape}>
        <View style={styles.header}>
          <Avatar.Image
            source={{
              uri: "https://hinhnen123.com/wp-content/uploads/2021/06/anh-avatar-cute-dep-nhat-5.jpg",
            }}
            size={80}
          />
          <View style={{ marginLeft: 20, color: "#FCF4F4FF" }}>
            <Title style={styles.title}>Thai Ngoc</Title>
            <Caption style={styles.caption}>0855633053</Caption>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{ paddingLeft: 30, marginLeft: 90 }}
          >
            <ImageBackground
              style={{ width: 20, height: 20, marginVertical: 5 }}
              source={require("../../../assets/turn-off.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.profile}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title style={styles.titleA}>Nhân viên quản lý</Title>
          <Caption style={styles.textA}>{totalMananger}</Caption>
        </View>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title style={styles.titleA}>Sinh viên</Title>
          <Caption style={styles.textA}>{totalStudent}</Caption>
        </View>
      </View>
      <View style={styles.eye}>
        <TouchableOpacity
          style={{ ...styles.cusButton, marginStart: 10 }}
          onPress={() => {
            navigation.navigate("DSQL");
          }}
        >
          <Image
            source={require("../../image/adminicon.png")}
            style={{ width: "50%", height: "50%" }}
          />
          <Text>Nhân viên</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DSQLSV");
          }}
          style={{ ...styles.cusButton, marginHorizontal: 50 }}
        >
          <Image
            source={require("../../image/sinhvienicon.png")}
            style={{ width: "50%", height: "50%" }}
          />
          <Text>Sinh viên</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Services");
          }}
          style={styles.cusButton}
        >
          <Image
            source={require("../../image/technical-support.png")}
            style={{ width: "50%", height: "50%" }}
          />
          <Text>Dịch vụ</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("NVQL");
        }}
        style={styles.addButton}
      >
        <AntDesign
          name="plus"
          size={20}
          color="#FCF4F4FF"
          style={{ marginStart: 15 }}
        />
        <Text
          style={{
            color: "#FCF4F4FF",
            fontSize: 18,
            marginLeft: 10,
          }}
        >
          Thêm nhân viên
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  eye: {
    flexDirection: "row",
    width: width - 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textA: {
    marginTop: 15,
    justifyContent: "center",
    textAlign: "center",
    color: "#2F85F8",
    fontWeight: "bold",
    fontSize: 18,
  },
  cusButton: {
    width: 80,
    height: 80,
    borderRadius: 50 / 2,
    borderWidth: 0.4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingStart: 20,
  },
  titleA: {
    fontSize: 15,
    fontFamily: "sans-serif",
    textAlign: "center",
  },
  circleShape: {
    width: "100%",
    height: "25%",
    borderRadius: 110 / 2,
    backgroundColor: "#2F85F8",
    marginTop: -50,
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 20,
    paddingLeft: "18%",
  },
  profile: {
    width: "90%",
    height: 110,
    borderRadius: 40 / 2,
    backgroundColor: "#FFFFFF",
    marginTop: -45,
    borderWidth: 0.5,
    paddingLeft: 25,
    flexDirection: "row",
    paddingTop: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FCF4F4FF",
  },
  caption: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FCF4F4FF",
  },
  infoBox: {
    width: "50%",
  },
  addButton: {
    width: 195,
    height: 50,
    borderRadius: 100 / 2,
    borderWidth: 0.4,
    backgroundColor: "white",
    marginStart: "45%",
    marginTop: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#2F85F8",
  },
  modalView: {
    marginTop: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonOk: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    border: 3,
    width: 120,
    marginHorizontal: 10,
    alignItems: "center",
  },
  textCancel: {
    color: "black",
    fontWeight: "bold",
  },
  buttonCancel: {
    backgroundColor: "white",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default AdminPage;
