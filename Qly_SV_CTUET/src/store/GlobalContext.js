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
  const [walletBalance, setWalletBalance] = useState();
  const [product, setProduct] = useState([]);
  const [loginPending, setLoginPending] = useState(false);
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
      }}
    >
      {children}
    </userContext.Provider>
  );
}
export const useUser = () => useContext(userContext);
export { userContext, UserProvider };
