import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import moment from "moment";
import React, { useState, useEffect, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../../firebase_config";
import uuid from "uuid";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  TaskEvent,
  getStorage,
} from "firebase/storage";

export default function TestCode() {
  const [currentDate, setCurrentDate] = useState("");
  const [currentDateMoment, setCurrentDateMoment] = useState("");
  const [seco, setSecon] = useState(0);
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    {
      async () => {
        if (Platform.OS != "web") {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== "granted") {
            alert("Sorry");
          }
        }
      };
    }
    setCurrentDate(moment().format("DD/MM/YYYY HH:mm"));
    return () => {};
  }, [seco]);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  }
  async function uploadImgae() {
    const blob = await new Promise((reslove, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        reslove(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request faile"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    const fileRef = ref(getStorage(), "Hinh1");
    const result2 = await uploadBytes(fileRef, blob);

    getDownloadURL(fileRef).then((url) => {
      setLoading(false);
      setImage2(url);
      console.log("download url: ", url);
      blob.close();
      return url;
    });
  }
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Image source={{ uri: image }} style={{ height: 200, width: 200 }} />
      <Image source={{ uri: image2 }} style={{ height: 200, width: 200 }} />
      <TouchableOpacity
        onPress={() => pickImage()}
        style={{
          height: 30,
          width: 200,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
        }}
      >
        <Text>PickImage</Text>
      </TouchableOpacity>
      {!loading ? (
        <Button title="upload" onPress={uploadImgae} />
      ) : (
        <ActivityIndicator size="large" color="#000" />
      )}
    </View>
  );
}
