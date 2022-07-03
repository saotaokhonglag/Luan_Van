import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  Image,
  View,
  Dimensions,
  FlatList,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useUser } from "../../store/GlobalContext";
import { db } from "../../../firebase_config";
import {
  doc,
  query,
  where,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
  deleteDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import AddServiceModal from "../../components/Modals/AddServiceModal";
import UpdateService from "../../components/Modals/UpdateService";
import ServiceItem from "./Item/ServiceItem";
import moment from "moment";
const { height, width } = Dimensions.get("window");

const Services = ({ navigation }) => {
  const {
    ModalVisible,
    setModalVisible,
    ModalVisibleDirectory,
    setModalVisibleDirectory,
    ModalVisibleDelete,
    setModalVisibleDelete,
    id_sp,
  } = useUser();
  const [id_DV, setIdDV] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    getData();
    getDV();
    return () => {};
  }, []);
  async function getDV() {
    setIdDV("DV" + moment().format("DDMMYYYHHmmss"));
  }
  async function getData() {
    const ref = query(collection(db, "dichvu"));
    const un = await onSnapshot(ref, (querySnapshot) => {
      const service = [];
      querySnapshot.forEach((d) => {
        service.push(d.data());
      });
      setData(service);
    });
  }
  const Ok = (bool, serviceName) => {
    const srname = serviceName.value.trim();
    data.forEach((d) => {
      let srname2 = d.tendv.trim();
      if (srname.toUpperCase() == srname2.toUpperCase()) {
        Alert.alert(
          "Dịch vụ tồn tại",
          "Dịch vụ này đã tồn tại, vui lòng đổi tên khác!"
        );
      } else {
        setDoc(doc(db, "dichvu", id_DV), {
          id_DV: id_DV,
          tendv: serviceName.value,
        });
        setModalVisible(false);
        Alert.alert("Thành công!", "Thêm dịch vụ thành công");
      }
    });
  };
  const CancelModal = (bool) => {
    setModalVisible(bool);
    setModalVisibleDirectory(bool);
    setModalVisibleDelete(bool);
  };

  const OkUpdate = async (bool, serviceName) => {
    const srname = serviceName.value.trim();
    data.forEach((d) => {
      let srname2 = d.tendv.trim();
      if (srname.toUpperCase() == srname2.toUpperCase()) {
        Alert.alert(
          "Dịch vụ tồn tại",
          "Tên dịch vụ này đã tồn tại, vui lòng đổi tên khác!"
        );
      } else {
        try {
          updateDoc(doc(db, "dichvu", id_sp), {
            tendv: serviceName.value,
          });
          setModalVisibleDelete(false);
          Alert.alert("Thành công!", "Cập nhật dịch vụ thành công");
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const OkDelete = async (bool) => {
    const ref = query(
      collection(db, "quanly"),
      where("id_DV", "==", id_sp),
      where("TrangThai", "==", 1)
    );
    const un = await onSnapshot(ref, (querySnapshot) => {
      let checkManan = [];
      querySnapshot.forEach((d) => {
        checkManan.push(d.data());
      });
      if (checkManan.length > 0) {
        Alert.alert(
          "Dịch này đang được sử dụng",
          "Vui lòng xóa nhân viên trước khi xóa dịch vụ!"
        );
      } else {
        deleteDoc(doc(db, "dichvu", id_sp));
        setModalVisibleDirectory(bool);
        Alert.alert("Thành công!", "Xóa dịch vụ thành công!");
        console.log(id_sp);
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Modal
        visible={ModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => ModalVisible(false)}
      >
        <AddServiceModal LogOut={Ok} cancelModal={CancelModal} />
      </Modal>
      <Modal
        visible={ModalVisibleDelete}
        animationType="fade"
        transparent={true}
        onRequestClose={() => ModalVisibleDelete(false)}
      >
        <UpdateService LogOut={OkUpdate} cancelModal={CancelModal} />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisibleDirectory}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Bạn có chắc muốn xóa danh mục? </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Pressable
              style={[styles.button, styles.buttonOk]}
              onPress={OkDelete}
            >
              <Text style={styles.textStyle}>Xác Nhận</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonCancel]}
              onPress={CancelModal}
            >
              <Text style={styles.textStyle}>Từ Chối</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View
        style={{
          width: width,
          marginVertical: 10,
          height: height - 180,
        }}
      >
        <FlatList
          keyExtractor={(item) => item.id_DV}
          data={data}
          renderItem={({ item: data }) => {
            return <ServiceItem {...data} info={data} />;
          }}
        />
      </View>
      <View style={{ width: "100%", height: 200 }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
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
            Thêm dịch vụ
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  buttonOk: {
    backgroundColor: "#2196F3",
    marginRight: 30,
  },
  addButton: {
    width: 195,
    height: 50,
    borderRadius: 100 / 2,
    borderWidth: 0.4,
    backgroundColor: "white",
    marginStart: "45%",
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#2F85F8",
  },
  infoBox: {
    width: "100%",
    height: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    marginTop: "100%",
    elevation: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: width - 20,
    marginLeft: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
    width: 100,
    alignItems: "center",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    marginLeft: 0,
    color: "#FFFF",
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
  },
});

export default Services;
