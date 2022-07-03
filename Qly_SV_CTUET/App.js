import React from "react";
import Index from "./src/Navigation";
import { UserProvider, userContext } from "./src/store/GlobalContext";

export default function App() {
  return (
    <UserProvider>
      <Index />
    </UserProvider>
  );
}
