import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { createEmptyCart, getCart, updateCart } from "../firebase/cart";
import { CheckedIngredient } from "../entities/cart";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation";
import { TextInput } from "../components/TextInput";

type NavigationRoute = NativeStackScreenProps<
  RootStackParamList,
  "EditCartScreen"
>;

interface Props {
  navigation: NavigationRoute["navigation"];
  route: NavigationRoute["route"];
}

export const EditCartScreen = (props: Props) => {
  const [ingredients, setIngredients] = useState<CheckedIngredient[]>([
    { name: "", amount: "", checked: false },
    { name: "", amount: "", checked: false },
    { name: "", amount: "", checked: false },
  ]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getCart().then((response) => {
        if (response) {
          checkEmptyIngredients({ ingredients: response.ingredients });
        }
      });
    }
  }, [isFocused]);

  const checkEmptyIngredients = (props: {
    ingredients: CheckedIngredient[];
  }) => {
    if (props.ingredients.length) {
      const newIngredients = [...props.ingredients];
      if (props.ingredients[props.ingredients.length - 1].name) {
        newIngredients.push({ amount: "", name: "", checked: false });
      }
      if (
        props.ingredients.length > 3 &&
        !props.ingredients[props.ingredients.length - 1].name &&
        !props.ingredients[props.ingredients.length - 2].name
      ) {
        newIngredients.splice(props.ingredients.length - 1);
      }
      setIngredients(newIngredients);
    }
  };

  const submit = async () => {
    const filteredIngredients = ingredients.filter(
      (ingredient) => !!ingredient.name
    );
    await updateCart({
      ingredients: filteredIngredients,
    });
    props.navigation.navigate("CartScreen");
  };

  const trash = async () => {
    await createEmptyCart();
    props.navigation.navigate("CartScreen");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Cart:</Text>
        {ingredients.map((ingredient, index) => {
          return (
            <View style={styles.row} key={`${"ingredient"}-${index}`}>
              <TextInput
                placeholder="Name"
                value={ingredient.name}
                size="large"
                onChangeText={(value) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index].name = value;
                  checkEmptyIngredients({ ingredients: newIngredients });
                }}
              />
              <TextInput
                placeholder="Amount"
                value={ingredient.amount}
                size="small"
                onChangeText={(value) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index].amount = value;
                  checkEmptyIngredients({ ingredients: newIngredients });
                }}
              />
            </View>
          );
        })}
        <View style={styles.submission}>
          <Pressable style={styles.submitButton} onPress={submit}>
            <View style={styles.row}>
              <Text style={styles.submitText}>Save Changes</Text>
              <Image
                style={styles.buttonImage}
                source={require("../images/Save.png")}
              ></Image>
            </View>
          </Pressable>
        </View>

        <View style={styles.submission}>
          <Pressable style={styles.trashButton} onPress={trash}>
            <View style={styles.row}>
              <Text style={styles.submitText}>Clear Cart</Text>
              <Image
                style={styles.buttonImage}
                source={require("../images/Trash.png")}
              ></Image>
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
  title: {
    fontSize: 24,
    width: "73%",
  },
  lineBreak: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
  },
  submission: {
    marginTop: 40,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  submitButton: {
    backgroundColor: "#4A9FCE",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  trashButton: {
    backgroundColor: "#C80E17",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  submitText: {
    color: "#FFF",
    fontSize: 20,
    marginHorizontal: 8,
  },
  imageUploader: {
    height: 40,
    width: 40,
    resizeMode: "contain",
    marginRight: "2%",
  },
  buttonImage: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    marginRight: 8,
    color: "#FFFFFF",
  },
});
