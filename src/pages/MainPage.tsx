import React, { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { Recipe } from "../entities/recipe";
import { getRecipes } from "../firebase/recipe";
import { getImages } from "../firebase/storage";
import { RecipeImage } from "../entities/image";

interface Props {
  navigation: any;
}

export const MainPage = (props: Props) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [images, setImages] = useState<RecipeImage[]>([]);
  const [searchFieldVisibility, setSearchFieldVisibility] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getRecipes().then((response) => {
        if (searchInput) {
          const searchStrings = searchInput.split(", ");
          searchStrings.forEach((searchString) => {
            response = response.filter((recipe) =>
              recipe.ingredients.find((ingredient) =>
                ingredient.name
                  .toLocaleLowerCase()
                  .includes(searchString.toLocaleLowerCase())
              )
            );
          });
        }
        response.sort((a, b) => a.id - b.id);
        setRecipes(response);
      });
      getImages().then((response) => {
        setImages(response);
      });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

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
              <Image
                style={styles.headerIconPlus}
                source={require("../images/PlusIcon.png")}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                setSearchFieldVisibility(!searchFieldVisibility);
                setSearchInput("");
              }}
            >
              <Image
                style={styles.headerIconSearch}
                source={require("../images/SearchIcon.png")}
              />
            </Pressable>
          </View>
        </View>
        {searchFieldVisibility && (
          <TextInput
            placeholder="Search for ingredients, separated by ', '"
            placeholderTextColor="#bbbbbb"
            style={styles.searchField}
            value={searchInput}
            onChangeText={setSearchInput}
          />
        )}
        <View style={styles.recipes}>
          {recipes.map((recipe, index) => {
            const recipeImage = images.find(
              (image) => image.name === recipe.id.toString()
            );
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
  headerIconPlus: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    tintColor: "#4A9FCE",
    marginRight: "10%",
    marginTop: 20,
  },
  headerIconSearch: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    tintColor: "#4A9FCE",
    marginRight: "10%",
    marginTop: 20,
  },
  searchField: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: "4%",
  },
});
