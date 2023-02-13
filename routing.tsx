import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainPage } from "./src/pages/MainPage";
import { ViewRecipePage } from "./src/pages/ViewRecipePage";
import { EditRecipePage } from "./src/pages/EditRecipePage";
import { LoginPage } from "./src/pages/LoginPage";
import { CartPage } from "./src/pages/CartPage";
import { Pressable, Image, StyleSheet, View } from "react-native";

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
                    navigation.navigate("MainPage");
                  }}
                >
                  <Image
                    style={styles.headerIcon}
                    source={require("./src/images/Logo.png")}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate("CartPage");
                  }}
                >
                  <Image
                    style={styles.headerIcon}
                    source={require("./src/images/Cart.png")}
                  />
                </Pressable>
              </View>
            ),
        })}
      >
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            title: "Login",
          }}
        />
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="ViewRecipePage"
          component={ViewRecipePage}
          options={{
            title: "View Recipe",
          }}
        />
        <Stack.Screen
          name="EditRecipePage"
          component={EditRecipePage}
          options={{
            title: "Edit Recipe",
          }}
        />
        <Stack.Screen
          name="CartPage"
          component={CartPage}
          options={{
            title: "Cart",
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
