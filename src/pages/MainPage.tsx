import React, { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Recipe } from "../entities/recipe";
import { getRecipes } from "../firebase/recipe";
import { useIsFocused } from "@react-navigation/native";
import { getImages } from "../firebase/storage";
import { RecipeImage } from "../entities/image";

interface Props {
  navigation: any;
}

export const MainPage = (props: Props) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [images, setImages] = useState<RecipeImage[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getRecipes().then((response) => {
        response.sort((a, b) => a.id - b.id);
        setRecipes(response);
      });
      getImages().then((response) => {
        setImages(response);
      });
    }
  }, [isFocused]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <Image style={styles.logo} source={require("../images/Logo.png")} />
          <View style={styles.column}>
            <Pressable
              onPress={() => {
                props.navigation.navigate("EditRecipePage", {
                  name: 0,
                });
              }}
            >
              <Text style={styles.headerIcon}>+</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.recipes}>
          {recipes.map((recipe, index) => {
            const recipeImage = images.find(
              (image) => image.name === recipe.id.toString()
            );
            console.log(recipeImage);
            return (
              <Pressable
                style={styles.box}
                key={`${recipe.id}-${index}`}
                onPress={() => {
                  props.navigation.navigate("ViewRecipePage", {
                    name: recipe.id,
                  });
                }}
              >
                <Image
                  style={styles.image}
                  source={
                    recipeImage
                      ? { uri: recipeImage.url }
                      : require("../images/PlaceholderRecipe.jpg")
                  }
                />
                <Text
                  style={styles.title}
                >{`${recipe.id} - ${recipe.title}`}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recipes: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    margin: 5,
  },
  box: {
    backgroundColor: "#222222",
    width: "80%",
    marginVertical: 15,
    borderRadius: 15,
  },
  image: {
    resizeMode: "contain",
    height: 120,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column: {
    alignItems: "center",
    marginLeft: "10%",
  },
  logo: { height: 150, width: 150, resizeMode: "contain", marginLeft: "30%" },
  headerIcon: {
    fontSize: 40,
    color: "#4A9FCE",
    marginRight: "10%",
  },
});
