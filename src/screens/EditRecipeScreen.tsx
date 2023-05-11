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
import { Ingredient } from "../entities/recipe";
import { createRecipe, deleteRecipe, getRecipe } from "../firebase/recipe";
import {
  ImagePickerResult,
  launchImageLibraryAsync,
  MediaTypeOptions,
  launchCameraAsync,
} from "expo-image-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation";
import { TextInput } from "../components/TextInput";

type NavigationRoute = NativeStackScreenProps<
  RootStackParamList,
  "EditRecipeScreen"
>;

interface Props {
  navigation: NavigationRoute["navigation"];
  route: NavigationRoute["route"];
}

export const EditRecipeScreen = (props: Props) => {
  const screenId: number = props.route.params.id ?? 0;
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", amount: "" },
    { name: "", amount: "" },
    { name: "", amount: "" },
  ]);
  const [image, setImage] = useState<any>();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (screenId > 0) {
        getRecipe(screenId).then((response) => {
          if (response) {
            setTitle(response.title);
            checkEmptyIngredients({ ingredients: response.ingredients });
          }
        });
      }
    }
  }, [isFocused]);

  const checkEmptyIngredients = (props: { ingredients: Ingredient[] }) => {
    const newIngredients = [...props.ingredients];
    if (props.ingredients[props.ingredients.length - 1].name) {
      newIngredients.push({ amount: "", name: "" });
    }
    if (
      props.ingredients.length > 3 &&
      !props.ingredients[props.ingredients.length - 1].name &&
      !props.ingredients[props.ingredients.length - 2].name
    ) {
      newIngredients.splice(props.ingredients.length - 1);
    }
    setIngredients(newIngredients);
  };

  const submit = async () => {
    const filteredIngredients = ingredients.filter(
      (ingredient) => !!ingredient.name
    );
    if (title === "") {
      alert("You need a Title");
      return;
    }
    if (filteredIngredients.length === 0) {
      alert("You need ingredients");
      return;
    }
    const id = await createRecipe({
      id: screenId,
      ingredients: filteredIngredients,
      title: title,
      image: image,
    });
    props.navigation.navigate("ViewRecipeScreen", {
      id: id,
    });
  };

  const trash = async () => {
    await deleteRecipe(screenId);
    props.navigation.navigate("HomeScreen");
  };

  const submitImage = async (result: ImagePickerResult) => {
    if (result && result.assets) {
      const data = result.assets[0];
      if (data.uri) {
        const response = await fetch(data.uri);
        const blob = await response.blob();
        const newImage = new File([blob], screenId.toString(), {
          type: blob.type,
        }) as any;
        setImage(newImage);
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Title:</Text>
          <Pressable
            onPress={async () => {
              const result = await launchCameraAsync({
                mediaTypes: MediaTypeOptions.Images,
                aspect: [9, 16],
              });
              submitImage(result);
            }}
          >
            <Image
              style={styles.imageUploader}
              source={require("../images/TakePicture.png")}
            />
          </Pressable>
          <Pressable
            onPress={async () => {
              const result = await launchImageLibraryAsync({
                mediaTypes: MediaTypeOptions.Images,
              });
              submitImage(result);
            }}
          >
            <Image
              style={styles.imageUploader}
              source={require("../images/UploadImage.png")}
            />
          </Pressable>
        </View>
        <TextInput
          placeholder="Title"
          size="xl"
          value={title}
          onChangeText={setTitle}
        />
        <View style={styles.lineBreak} />
        <Text style={styles.title}>Ingredients:</Text>
        {ingredients.map((ingredient, index) => {
          return (
            <View style={styles.row} key={`${"ingredient"}-${index}`}>
              <TextInput
                placeholder="Name"
                size="large"
                value={ingredient.name}
                onChangeText={(value) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index].name = value;
                  checkEmptyIngredients({ ingredients: newIngredients });
                }}
              />
              <TextInput
                placeholder="Amount"
                size="small"
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
              <Text style={styles.submitText}>
                {screenId ? "Save Changes" : "Create Recipe"}
              </Text>
              <Image
                style={styles.buttonImage}
                source={require("../images/Save.png")}
              ></Image>
            </View>
          </Pressable>
        </View>
        {screenId > 0 && (
          <View style={styles.submission}>
            <Pressable style={styles.trashButton} onPress={trash}>
              <View style={styles.row}>
                <Text style={styles.submitText}>Delete</Text>
                <Image
                  style={styles.buttonImage}
                  source={require("../images/Trash.png")}
                ></Image>
              </View>
            </Pressable>
          </View>
        )}
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
