import { Ingredient } from "./recipe";

export interface Cart {
  ingredients: CheckedIngredient[];
}

export interface CreateCart {
  ingredients: Ingredient[];
}

interface CheckedIngredient extends Ingredient {
  checked: boolean;
}
