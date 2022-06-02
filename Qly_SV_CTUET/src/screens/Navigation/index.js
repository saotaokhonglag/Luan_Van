import * as React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HomePage from '../students/HomePage'
import Wallet from '../students/Wallet';
import Profile from '../students/profile'
import EditProfile from '../students/EditProfile'
import addOrder from '../students/AddOrder';
import Login from '../students/Login'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Signup from '../students/Signup';
import EditPd from '../students/EditPd'
import DetailOrder from '../students/DetailOrder';
import StartScreen from '../students/StartScreen';
import Dashboard from '../students/Dashboard';
import CreateProfile from '../Start/CreateProfile';
import { theme } from '../../contants/theme'
import { Provider } from 'react-native-paper'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={'red'} size={20} />),
          tabBarColor: 'green', tabBarLabel: 'Home'
        }} />
      <Tab.Screen name="Profile" component={Profile} options={{
        title: 'Thông tin Cá Nhân', headerShadowVisible: false, headerStyle: { backgroundColor: '#2F85F8' }, headerTitleAlign: 'center', headerTintColor: '#FFFFFF',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="smart-card" color={'red'} size={20} />),
        tabBarColor: '#d02860', tabBarLabel: 'Profile'
      }} />
    </Tab.Navigator>
  );
}
const Stack = createNativeStackNavigator();

function index() {
  return (
    <Provider theme={theme}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateProfile" screenOptions={{ headerStyle: { backgroundColor: '#2F85F8' }, headerTitleAlign: 'center', headerTintColor: '#FFFFFF' }}>
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateProfile" component={CreateProfile} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" component={MyTabs} options={{ headerShown: false }} />
        <Stack.Screen name="AddOrder" component={addOrder} options={{ title: 'Tạo Hóa Đơn' }} />
        <Stack.Screen name="EditPd" component={EditPd} options={{ title: 'Thông tin cá nhân' }} />
        <Stack.Screen name="DetailOrder" component={DetailOrder} options={{ title: 'Chi tiết hóa đơn' }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: 'Thông tin cá nhân' }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: 'Chỉnh sửa thông tin cá nhân', headerShadowVisible: false }} />
        <Stack.Screen name="Wallet" component={Wallet} options={{
          title: 'Ví', headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity>
              <AntDesign name="setting" size={28} style={{ color: 'white' }} />
            </TouchableOpacity>
          ),
        }} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default index;