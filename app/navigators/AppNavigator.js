import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserListScreen from "../screens/UserListScreen";
import UserPostsScreen from "../screens/UserPostsScreen";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="UserListScreen">
      <Stack.Screen
        name="UserListScreen"
        component={UserListScreen}
        options={{ title: "Users" }}
      />
      <Stack.Screen
        name="Posts"
        component={UserPostsScreen}
        options={{ title: "Posts" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
