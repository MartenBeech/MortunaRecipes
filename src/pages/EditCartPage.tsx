import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { clearCart, getCart, updateCart } from "../firebase/cart";
import { CheckedIngredient } from "../entities/cart";

interface Props {
  navigation: any;
  route: any;
}

export const EditCartPage = (props: Props) => {
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
          console.log(response);
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
    props.navigation.navigate("CartPage");
  };

  const trash = async () => {
    await clearCart();
    props.navigation.navigate("CartPage");
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
                placeholderTextColor="#bbbbbb"
                style={{ ...styles.input, ...styles.nameInput }}
                value={ingredient.name}
                onChangeText={(value) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index].name = value;
                  checkEmptyIngredients({ ingredients: newIngredients });
                }}
              />
              <TextInput
                placeholder="Amount"
                placeholderTextColor="#bbbbbb"
                style={{ ...styles.input, ...styles.amountInput }}
                value={ingredient.amount}
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
              <Text style={styles.submitText}>Clear</Text>
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
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  titleInput: {
    marginHorizontal: "4%",
  },
  nameInput: {
    marginLeft: "4%",
    marginRight: "2%",
    width: "63%",
  },
  amountInput: {
    marginLeft: "2%",
    marginRight: "4%",
    width: "25%",
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
