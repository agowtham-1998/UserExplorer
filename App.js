import "@expo/metro-runtime";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app/navigators/AppNavigator";
import store from "./app/models/RootStore";
import { Provider } from 'mobx-react'



function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
         <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
