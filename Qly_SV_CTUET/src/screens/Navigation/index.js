import * as React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomePage from "../students/HomePage";
import Wallet from "../students/Wallet";
import Historys from "../students/Historys";
import Profile from "../students/profile";
import EditProfile from "../students/EditProfile";
import addOrder from "../students/AddOrder";
import Login from "../Start/Login";
import Signup from "../Start/Signup";
import EditPd from "../students/EditPd";
import DetailOrder from "../students/DetailOrder";
import StartScreen from "../Start/StartScreen";
import Dashboard from "../Start/Dashboard";
import CreateProfile from "../Start/CreateProfile";
import LogoutModal from "../../components/Modals/LogoutModal";
import HomePageSeller from "../sellers/HomePage";
import Product from "../sellers/Product";
import Directory from "../sellers/Directory";
import Chart from "../sellers/Chart";
import Order from "../sellers/Order";
import WareHouse from "../sellers/WareHouse";
import CatalogDetails from "../sellers/CatalogDetails";
import AddProduct from "../sellers/AddProduct";
import CreateProduct from "../sellers/CreateProduct";
import DetailsOrder from "../sellers/DetailsOrder";
import AddWareHouse from "../sellers/AddWareHouse";
import CreateAdd from "../sellers/CreateAdd";
import NVQL from "../admin/AddNVQL";
import AdminPage from "../admin/AdminPage";
import DSQL from "../admin/DSQL";
import DSQLSV from "../admin/QLSV";
import BaoCaoKho from "../sellers/BaoCaoKho";
import Services from "../admin/Services";
import TestCode from "../Start/TestCode";
import CheckOut from "../students/CheckOut";
import AddMoneyDetail from "../students/AddMoneyDetail";
import DirectoryDetail from "../students/DirectoryDetail";
import { theme } from "../../contants/theme";
import { Provider } from "react-native-paper";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={"red"} size={20} />
          ),
          tabBarColor: "green",
          tabBarLabel: "Trang chủ",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Thông tin Cá Nhân",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#2F85F8" },
          headerTitleAlign: "center",
          headerTintColor: "#FFFFFF",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="smart-card" color={"red"} size={20} />
          ),
          tabBarColor: "#d02860",
          tabBarLabel: "Cá nhân",
        }}
      />
    </Tab.Navigator>
  );
}
const TabTop = createMaterialTopTabNavigator();
function MyTabsTop() {
  return (
    <TabTop.Navigator>
      <TabTop.Screen
        name="Products"
        component={Product}
        options={{ title: "Sản phẩm" }}
      />
      <TabTop.Screen
        name="Directory"
        component={Directory}
        options={{ title: "Danh mục" }}
      />
    </TabTop.Navigator>
  );
}
const Stack = createNativeStackNavigator();

function index() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerStyle: { backgroundColor: "#2F85F8" },
            headerTitleAlign: "center",
            headerTintColor: "#FFFFFF",
          }}
        >
          <Stack.Screen
            name="StartScreen"
            component={StartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TestCode"
            component={TestCode}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LogoutModal"
            component={LogoutModal}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateProfile"
            component={CreateProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomePage"
            component={MyTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddOrder"
            component={addOrder}
            options={{ title: "Tạo Hóa Đơn" }}
          />
          <Stack.Screen
            name="EditPd"
            component={EditPd}
            options={{ title: "Sửa sản phẩm" }}
          />
          <Stack.Screen
            name="DetailOrder"
            component={DetailOrder}
            options={{
              headerStyle: { backgroundColor: "#FFFF" },
              headerTitleAlign: "center",
              headerTintColor: "#333",
              title: "Xác nhận hóa đơn",
            }}
          />
          <Stack.Screen
            name="CheckOut"
            component={CheckOut}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ title: "Thông tin cá nhân" }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              title: "Chỉnh sửa thông tin cá nhân",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Wallet"
            component={Wallet}
            options={{
              title: "Ví",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Historys"
            component={Historys}
            options={{
              title: "Lịch sử giao dịch",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="HomePageSeller"
            component={HomePageSeller}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Product"
            component={MyTabsTop}
            options={{ title: "Quản lý" }}
          />
          <Stack.Screen
            name="Order"
            component={Order}
            options={{ title: "Quản lý đơn hàng" }}
          />
          <Stack.Screen
            name="WareHouse"
            component={WareHouse}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chart"
            component={Chart}
            options={{ title: "Báo cáo thu nhập" }}
          />
          <Stack.Screen
            name="CatalogDetails"
            component={CatalogDetails}
            options={{ title: "Chi tiết danh mục" }}
          />
          <Stack.Screen
            name="AddProduct"
            component={AddProduct}
            options={{ title: 'Thêm vào "Bún nè"' }}
          />
          <Stack.Screen
            name="AddMoneyDetail"
            component={AddMoneyDetail}
            options={{ title: "Chi tiết giao dịch" }}
          />
          <Stack.Screen
            name="DirectoryDetail"
            component={DirectoryDetail}
            options={{ title: "Chi tiết giao dịch" }}
          />
          <Stack.Screen
            name="CreateProduct"
            component={CreateProduct}
            options={{ title: "Tạo sản phẩm" }}
          />
          <Stack.Screen
            name="DetailsOrder"
            component={DetailsOrder}
            options={{ title: "Chi tiết đơn hàng" }}
            backBehavior="firstRoute"
          />
          <Stack.Screen
            name="AddWareHouse"
            component={AddWareHouse}
            options={{ title: "Thêm sản phẩm vào kho" }}
          />
          <Stack.Screen
            name="CreateAdd"
            component={CreateAdd}
            options={{ title: "Tạo nhập hàng" }}
          />
          <Stack.Screen
            name="NVQL"
            component={NVQL}
            options={{ title: "Thêm NVQL" }}
          />
          <Stack.Screen
            name="AdminPage"
            component={AdminPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DSQL"
            component={DSQL}
            options={{ title: "Nhân viên quản lý" }}
          />
          <Stack.Screen
            name="DSQLSV"
            component={DSQLSV}
            options={{ title: "Danh sách sinh viên" }}
          />
          <Stack.Screen
            name="BaoCaoKho"
            component={BaoCaoKho}
            options={{ title: "Báo cáo kho hàng" }}
          />
          <Stack.Screen
            name="Services"
            component={Services}
            options={{ title: "Dịch vụ" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default index;
