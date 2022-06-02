import React, { useCallback, useEffect, useState } from 'react';
import Index from './src/screens/Navigation/index'
import {UserProvider, userContext} from './src/store/GlobalContext'

export default function App() {
  return (
   <UserProvider>
  <Index />
   </UserProvider>   
       
  
 
   
     
  


  );
}