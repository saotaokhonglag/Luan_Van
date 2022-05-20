import * as React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../students/HomePage'
import Wallet from '../students/Wallet';
import Profile from '../students/profile'
import EditProfile from '../students/EditProfile'
import AddOrder from '../students/AddOrder';
import Login from '../students/Login'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Signup from '../students/Signup';
import EditPd from '../students/EditPd'

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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerStyle: { backgroundColor: '#2F85F8' }, headerTitleAlign: 'center', headerTintColor: '#FFFFFF' }}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" component={MyTabs} options={{ headerShown: false }} />
        <Stack.Screen name="AddOrder" component={AddOrder} options={{ title: 'Tạo Hóa Đơn' }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: 'Thông tin cá nhân' }} />
        <Stack.Screen name="EditPd" component={EditPd} options={{ title: 'Thông tin cá nhân' }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: 'Chỉnh sửa thông tin cá nhân', headerShadowVisible: false }} />
        <Stack.Screen name="Wallet" component={Wallet} options={{ title: 'Ví', headerShadowVisible: false,
   headerRight: ()=>(
    <TouchableOpacity>
                        <AntDesign name="setting" size={28} style={{ color: 'white' }} />
                    </TouchableOpacity>
   ),
     
   }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default index;