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
import { getImages } from "../firebase/storage";
import { RecipeImage } from "../entities/image";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation";
import { TextInput } from "../components/TextInput";

type NavigationRoute = NativeStackScreenProps<RootStackParamList, "HomeScreen">;

interface Props {
  navigation: NavigationRoute["navigation"];
  route: NavigationRoute["route"];
}

export const HomeScreen = (props: Props) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [images, setImages] = useState<RecipeImage[]>([]);
  const [searchFieldVisibility, setSearchFieldVisibility] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const delayTime = searchInput ? 300 : 0;
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
          response.sort((a, b) => {
            if (new Date(a.lastUsed) > new Date(b.lastUsed)) {
              return 1;
            }
            return -1;
          });
          setRecipes(response);
        });
        getImages().then((response) => {
          setImages(response);
        });
      }, delayTime);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchInput, isFocused]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <Image style={styles.logo} source={require("../images/Logo.png")} />
          <View style={styles.column}>
            <Pressable
              onPress={() => {
                props.navigation.navigate("EditRecipeScreen", {
                  id: 0,
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
            size="xl"
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
                  props.navigation.navigate("ViewRecipeScreen", {
                    id: recipe.id,
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
    resizeMode: "cover",
    height: 120,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
});
