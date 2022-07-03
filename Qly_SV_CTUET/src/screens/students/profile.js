import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useUser } from "../../store/GlobalContext";
import { db } from "../../../firebase_config";
import { doc, getDoc } from "firebase/firestore";
import { Avatar, Title, Caption, Text } from "react-native-paper";

const Profile = ({ navigation }) => {
  const { walletBalance, userProfile, setUserProfile } = useUser();
  useEffect(() => {
    let op = true;
    getProfile();
    return () => {
      op = false;
    };
  }, []);

  async function getProfile() {
    const docRef = doc(db, "sinhvien", userProfile.iduser);
    const docSnap = await getDoc(docRef);
    if (docSnap.data() !== undefined) {
      setUserProfile(docSnap.data());
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2F85F8" />
      <View style={styles.circleShape}></View>
      <View style={styles.profile}>
        <Avatar.Image
          source={{
            uri: userProfile.image,
          }}
          size={80}
        />
        <View style={{ marginLeft: 20 }}>
          <Title style={styles.title}>{userProfile.hovaten}</Title>
          <Caption style={styles.caption}>{userProfile.sdt}</Caption>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            <Text style={{ fontSize: 18, fontWeight: "500", color: "#2F85F8" }}>
              Chỉnh sửa thông tin
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.infoBoxWapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title style={styles.title}>
            {walletBalance.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
            đ
          </Title>
          <Caption style={styles.caption}>Ví</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title style={styles.title}>12</Title>
          <Caption style={styles.caption}>Hóa đơn</Caption>
        </View>
      </View>

      <View style={styles.menuWapper}>
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <View
            style={[
              styles.menuItem,
              {
                borderTopColor: "#dddddd",
                borderTopWidth: 1,
              },
            ]}
          >
            <AntDesign name="setting" color="#2F85F8" size={25} />
            <Text style={styles.menuItemText}>Cài đặt</Text>
          </View>
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingStart: 20,
  },
  circleShape: {
    width: "100%",
    height: "20%",
    borderRadius: 110 / 2,
    backgroundColor: "#2F85F8",
    marginTop: -100,
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
  },
  caption: {
    fontSize: 18,
    fontWeight: "500",
  },
  infoBoxWapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
  },
  infoBox: {
    width: "50%",
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  menuItem: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingLeft: 10,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontSize: 16,
  },
  menuWapper: {
    marginTop: 10,
    width: "100%",
  },
});

export default Profile;
