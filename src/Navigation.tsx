import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainScreen } from "./screens/MainScreen";
import { ViewRecipeScreen } from "./screens/ViewRecipeScreen";
import { EditRecipeScreen } from "./screens/EditRecipeScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { CartScreen } from "./screens/CartScreen";
import { Pressable, Image, StyleSheet, View } from "react-native";
import { EditCartScreen } from "./screens/EditCartScreen";

const Stack = createNativeStackNavigator();

export const Routing = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route, navigation }) => ({
          headerRight: () =>
            route.name != "Login" && (
              <View style={styles.row}>
                <Pressable
                  onPress={() => {
                    navigation.navigate("MainScreen");
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
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Login",
          }}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="ViewRecipeScreen"
          component={ViewRecipeScreen}
          options={{
            title: "View Recipe",
          }}
        />
        <Stack.Screen
          name="EditRecipeScreen"
          component={EditRecipeScreen}
          options={{
            title: "Edit Recipe",
          }}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{
            title: "Cart",
          }}
        />
        <Stack.Screen
          name="EditCartScreen"
          component={EditCartScreen}
          options={{
            title: "Edit Cart",
          }}
        />
      </Stack.Navigator>
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
