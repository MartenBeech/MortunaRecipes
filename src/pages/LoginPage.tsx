import { Text, View, Pressable, TextInput, StyleSheet } from "react-native";
import { Auth } from "../firebase/auth";
import { useForm, Controller } from "react-hook-form";

interface Props {
  navigation: any;
}

interface Form {
  username: string;
}

export let loginName = "";

export const LoginPage = (props: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (data: Form) => {
    const username = data.username;
    const auth = await Auth({ username });
    if (auth) {
      loginName = username;
      props.navigation.navigate("MainPage");
    } else {
      alert("Username does not exist");
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="username"
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.inputField}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            placeholder="Username"
            placeholderTextColor="#bbbbbb"
            secureTextEntry={true}
          />
        )}
      />
      <View style={styles.lineBreak} />
      <Pressable style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
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
