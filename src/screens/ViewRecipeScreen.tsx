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
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Recipe } from "../entities/recipe";
import { createCart } from "../firebase/cart";
import { getRecipe, updateLastUsed } from "../firebase/recipe";
import { getYearMonthDay } from "../services/dateService";

interface Props {
  navigation: any;
  route: any;
}

export const ViewRecipeScreen = (props: Props) => {
  const [recipe, setRecipe] = useState<Recipe>();
  const [checkboxesChecked, setCheckboxesChecked] = useState<boolean[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getRecipe(props.route.params.name).then((response) => {
        setRecipe(response);

        const newCheckboxesChecked: boolean[] = [];
        response?.ingredients.map(() => {
          newCheckboxesChecked.push(true);
        });
        setCheckboxesChecked(newCheckboxesChecked);
      });
    }
  }, [isFocused]);

  const onClickCheckbox = (index: number) => {
    const newCheckboxesChecked = [...checkboxesChecked];
    newCheckboxesChecked[index] = !newCheckboxesChecked[index];
    setCheckboxesChecked(newCheckboxesChecked);
  };

  const addToCart = async () => {
    if (recipe) {
      const filteredIngredients = recipe.ingredients.filter(
        (ingredient, index) => !!checkboxesChecked[index]
      );
      if (filteredIngredients.length === 0) {
        alert("Can't add no ingredients");
        return;
      }
      await createCart({ ingredients: filteredIngredients });
      await updateLastUsed(recipe.id);
      props.navigation.navigate("CartScreen");
    }
  };

  return (
    <ScrollView>
      {recipe && (
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Pressable
              onPress={() => {
                props.navigation.navigate("EditRecipeScreen", {
                  name: recipe.id,
                });
              }}
            >
              <Image
                source={require("../images/Pencil.png")}
                style={styles.pencilImage}
              />
            </Pressable>
          </View>
          <Text style={styles.lastUsedText}>{`Last used: ${getYearMonthDay(
            recipe.lastUsed
          )}`}</Text>
          <View style={styles.lineBreak} />
          {recipe.ingredients.map((ingredient, index) => {
            return (
              <View style={styles.row} key={`${"ingredient"}-${index}`}>
                <BouncyCheckbox
                  style={styles.checkboxBuy}
                  isChecked={checkboxesChecked[index]}
                  disableBuiltInState
                  onPress={() => onClickCheckbox(index)}
                />
                <Text style={styles.nameInputBuy}>{ingredient.name}</Text>
                <Text style={styles.amountInputBuy}>{ingredient.amount}</Text>
              </View>
            );
          })}
          <View style={styles.submission}>
            <Pressable style={styles.submitButton} onPress={addToCart}>
              <View style={styles.row}>
                <Text style={styles.submitText}>Add to Cart</Text>
                <Image
                  style={styles.cartImage}
                  source={require("../images/Cart.png")}
                ></Image>
              </View>
            </Pressable>
          </View>
        </View>
      )}
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
    width: "80%",
    marginRight: "5%",
  },
  titleInput: {
    height: 40,
    marginVertical: 12,
    marginHorizontal: "4%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  checkboxBuy: {
    height: 40,
    marginVertical: 12,
    marginLeft: "4%",
  },
  nameInputBuy: {
    minHeight: 40,
    marginVertical: 12,
    marginLeft: "4%",
    marginRight: "2%",
    borderWidth: 1,
    padding: 10,
    width: "53%",
    borderRadius: 5,
  },
  amountInputBuy: {
    minHeight: 40,
    marginVertical: 12,
    marginLeft: "2%",
    marginRight: "4%",
    borderWidth: 1,
    padding: 10,
    width: "20%",
    borderRadius: 5,
  },
  lineBreak: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
  },
  submission: {
    marginTop: 40,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#4A9FCE",
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
  pencilImage: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
  cartImage: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    marginRight: 8,
    color: "#FFFFFF",
  },
  lastUsedText: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#666666",
  },
});
