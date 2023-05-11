import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "./screens/HomeScreen";
import { ViewRecipeScreen } from "./screens/ViewRecipeScreen";
import { EditRecipeScreen } from "./screens/EditRecipeScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { CartScreen } from "./screens/CartScreen";
import { Pressable, Image, StyleSheet, View } from "react-native";
import { EditCartScreen } from "./screens/EditCartScreen";
import { createStackNavigator } from "@react-navigation/stack";

export type RootStackParamList = {
  CartScreen: undefined;
  EditCartScreen: undefined;
  EditRecipeScreen: { id: number };
  HomeScreen: undefined;
  LoginScreen: undefined;
  ViewRecipeScreen: { id: number };
};

const RootStack = createStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={({ route, navigation }) => ({
          headerRight: () =>
            route.name != "LoginScreen" && (
              <View style={styles.row}>
                <Pressable
                  onPress={() => {
                    navigation.navigate("HomeScreen");
                  }}
                >
                  <Image
                    style={styles.headerIcon}
                    source={require("./images/Logo.png")}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate("CartScreen");
                  }}
                >
                  <Image
                    style={styles.headerIcon}
                    source={require("./images/Cart.png")}
                  />
                </Pressable>
              </View>
            ),
        })}
      >
        <RootStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: "Login",
          }}
        />
        <RootStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Home",
          }}
        />
        <RootStack.Screen
          name="ViewRecipeScreen"
          component={ViewRecipeScreen}
          options={{
            title: "View Recipe",
          }}
        />
        <RootStack.Screen
          name="EditRecipeScreen"
          component={EditRecipeScreen}
          options={{
            title: "Edit Recipe",
          }}
        />
        <RootStack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{
            title: "Cart",
          }}
        />
        <RootStack.Screen
          name="EditCartScreen"
          component={EditCartScreen}
          options={{
            title: "Edit Cart",
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  headerIcon: {
    height: 40,
    width: 40,
    resizeMode: "contain",
    marginRight: 20,
    color: "#FFFFFF",
  },
});
