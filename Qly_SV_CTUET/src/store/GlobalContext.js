import React, { createContext, useContext, useState } from "react";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const userContext = createContext({
  userInfo: null,
  userProfile: null,
});

function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState();
  const [userProfile, setUserProfile] = useState();
  const [ManangerProfile, setManangerProfile] = useState();
  const [walletBalance, setWalletBalance] = useState();
  const [product, setProduct] = useState([]);
  const [loginPending, setLoginPending] = useState(false);
  const [ModalVisible, setModalVisible] = useState(false);
  const [ModalVisibleDirectory, setModalVisibleDirectory] = useState(false);
  const [ModalVisibleDelete, setModalVisibleDelete] = useState(false);
  const [ModalVisibleDeleteMananger, setModalVisibleDeleteMananger] =
    useState(false);
  const [qrcode, setQrcode] = useState();
  const [id_sp, setId_sp] = useState();
  const classs = ["HTTT0118", "KTPM0118", "KHMT0118"];
  const genders = ["Nam", "Nữ", "Khác"];
  return (
    <userContext.Provider
      value={{
        userInfo,
        setUserInfo,
        userProfile,
        setUserProfile,
        product,
        setProduct,
        classs,
        genders,
        walletBalance,
        setWalletBalance,
        loginPending,
        setLoginPending,
        qrcode,
        setQrcode,
        ModalVisible,
        setModalVisible,
        ModalVisibleDirectory,
        setModalVisibleDirectory,
        ModalVisibleDelete,
        setModalVisibleDelete,
        id_sp,
        setId_sp,
        setManangerProfile,
        ManangerProfile,
        ModalVisibleDeleteMananger,
        setModalVisibleDeleteMananger,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
export const useUser = () => useContext(userContext);
export { userContext, UserProvider };
