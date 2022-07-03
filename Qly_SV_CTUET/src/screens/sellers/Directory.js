import {
  addDoc,
  collection,
  onSnapshot,
  query,
  setDoc,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
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
  FlatList,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { db } from "../../../firebase_config";
import AddCategoriesModal from "../../components/Modals/AddCategoriesModal";
import DirectoryItem from "./Item/DirectoryItem";
import moment from "moment";
import { useUser } from "../../store/GlobalContext";

const Directory = ({ navigation }) => {
  const { ManangerProfile } = useUser();
  const [ModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState();
  const [idDM, setIDDM] = useState();

  useEffect(() => {
    getData();
    getIDDM();
    return () => {};
  }, [ModalVisible]);
  async function getIDDM() {
    setIDDM("DM" + moment().format("DDMMYYYHHmmss"));
  }
  const AddCategories = async (bool, categoryName) => {
    const ref = query(
      collection(db, "danhmuc"),
      where("id_DV", "==", ManangerProfile.id_DV),
      where("TenDanhMuc", "==", categoryName.value.trim())
    );
    const data = await getDocs(ref);
    let nameDirec = "";
    data.forEach((d) => {
      nameDirec = d.data().TenDanhMuc;
    });
    if (nameDirec == "") {
      addDoc(collection(db, "danhmuc"), {
        TenDanhMuc: categoryName.value,
        id_DV: ManangerProfile.id_DV,
        idDanhMuc: idDM,
      });
    } else {
      Alert.alert(
        "Danh mục tồn tại",
        "Tên danh mục này đã có rồi, vui lòng chọn tên khác."
      );
    }
    console.log(categoryName.value);
    setModalVisible(bool);
  };
  const CancelModal = (bool) => {
    setModalVisible(bool);
  };

  async function getData() {
    const ref = query(
      collection(db, "danhmuc"),
      where("id_DV", "==", ManangerProfile.id_DV)
    );
    const un = await onSnapshot(ref, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((d) => {
        data.push(d.data());
      });
      setData(data);
    });
  }
  return (
    <SafeAreaView>
      <Modal
        visible={ModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => ModalVisible(false)}
      >
        <AddCategoriesModal
          AddCategories={AddCategories}
          cancelModal={CancelModal}
        />
      </Modal>
      <FlatList
        keyExtractor={(item) => item.idDanhMuc}
        data={data}
        renderItem={({ item: product }) => {
          return <DirectoryItem {...product} info={product} />;
        }}
      />
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
          Tạo danh mục
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  menuWapper: {
    marginTop: 10,
    width: "100%",
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
    marginTop: "120%",
    elevation: 5,
    flexDirection: "column",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    marginLeft: 0,
  },
  modalText: {
    marginBottom: 15,
  },
  textContainer: {},
});

export default Directory;
