import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Routing } from "./routing";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreLogs([
    "Warning: AsyncStorage has been extracted from react-native core",
  ]);
  return <Routing />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
