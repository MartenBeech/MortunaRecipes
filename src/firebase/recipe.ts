import {
  doc,
  getDoc,
  collection,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { CreateRecipe, Recipe } from "../entities/recipe";
import { loginName } from "../pages/LoginPage";
import { db } from "./config";
import { uploadImage } from "./storage";

export async function getRecipe(recipeId: number) {
  let returnValue: Recipe | undefined;
  const docRef = doc(db, "users", loginName, "recipes", recipeId.toString());
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const snapData = docSnap.data();
    returnValue = snapData as Recipe;
  }
  return returnValue;
}

export async function getRecipes(): Promise<Recipe[]> {
  const returnValue: Recipe[] = [];
  const colRef = collection(db, "users", loginName, "recipes");
  const colSnap = await getDocs(colRef);
  colSnap.forEach((doc) => {
    const data = doc.data() as Recipe;
    returnValue.push(data);
  });
  return returnValue;
}

export async function createRecipe(props: CreateRecipe) {
  if (!props.id) {
    const recipes = await getRecipes();
    let highestId = recipes.length;
    recipes.map((recipe) => {
      if (recipe.id > highestId) {
        highestId = recipe.id;
      }
    });
    props.id = highestId + 1;
  }

  if (props.image) {
    props.image.data.name = props.id.toString();
    await uploadImage({ image: props.image });
  }

  await setDoc(doc(db, "users", loginName, "recipes", props.id.toString()), {
    id: props.id,
    title: props.title,
    ingredients: props.ingredients,
    lastUsed: new Date().toString(),
  } as Recipe);
  return props.id;
}

export async function deleteRecipe(id: number) {
  await deleteDoc(doc(db, "users", loginName, "recipes", id.toString()));
}
