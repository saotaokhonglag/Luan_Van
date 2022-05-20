import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import SplashScreen from './src/components/SplashScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomePage from './src/screens/students/HomePage';
import Wallet from './src/screens/students/Wallet';
import Profile from './src/screens/students/profile'
import EditProfile from './src/screens/students/EditProfile'
import AddOrder from './src/screens/students/AddOrder';
import Index from './src/screens/Navigation/index'
export default function App() {
  return (
    // <SafeAreaProvider>
    //   <SplashScreen>
        
    //   </SplashScreen>
    // </SafeAreaProvider>
  <Index/>
  );
}