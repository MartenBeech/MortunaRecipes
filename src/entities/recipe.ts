export interface Ingredient {
  name: string;
  amount: string;
}

export interface CreateRecipe {
  id?: number;
  title: string;
  ingredients: Ingredient[];
  image: any;
}

export interface Recipe {
  id: number;
  title: string;
  ingredients: Ingredient[];
  lastUsed: string;
}
