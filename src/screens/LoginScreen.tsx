import { Text, View, Pressable, TextInput, StyleSheet } from "react-native";
import { Auth } from "../firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation";
import { useEffect, useState } from "react";
import { getStoreValue, setStorePair } from "../store";

type NavigationRoute = NativeStackScreenProps<
  RootStackParamList,
  "LoginScreen"
>;

interface Props {
  navigation: NavigationRoute["navigation"];
  route: NavigationRoute["route"];
}

export let loginName = "";

export const LoginScreen = (props: Props) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getStore = async () => {
      const storeValue = await getStoreValue("username");
      setUsername(storeValue);
    };
    getStore();
  }, []);

  const onSubmit = async () => {
    const auth = await Auth({ username });
    if (auth) {
      loginName = username;
      setStorePair("username", username);
      props.navigation.navigate("HomeScreen");
    } else {
      alert("Username does not exist");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        value={username}
        onChangeText={(value) => setUsername(value)}
        placeholder="Username"
        placeholderTextColor="#bbbbbb"
        secureTextEntry={true}
      />
      <View style={styles.lineBreak} />
      <Pressable style={styles.loginButton} onPress={onSubmit}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputField: {
    height: 60,
    width: "80%",
    marginVertical: 12,
    marginHorizontal: "4%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
  },
  loginButton: {
    height: 60,
    width: "80%",
    marginVertical: 12,
    marginHorizontal: "4%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A9FCE",
  },
  loginButtonText: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  lineBreak: {
    marginBottom: 40,
  },
});
