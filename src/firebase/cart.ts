import { doc, getDoc, setDoc } from "firebase/firestore";
import { Cart, CreateCart } from "../entities/cart";
import { loginName } from "../screens/LoginScreen";
import { db } from "./config";

export async function getCart() {
  let returnValue: Cart = { ingredients: [] };
  const docRef = doc(db, "users", loginName, "carts", "1");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const snapData = docSnap.data();
    returnValue = snapData as Cart;
  } else {
    await clearCart();
  }
  return returnValue;
}

export async function createCart(props: CreateCart) {
  let cart = await getCart();
  const uncheckedValues = cart.ingredients.filter(
    (ingredient) => !ingredient.checked
  );
  if (uncheckedValues.length === 0) {
    cart = { ingredients: [] };
  }

  props.ingredients.map((ingredient) => {
    cart.ingredients.push({ ...ingredient, checked: false });
  });

  await setDoc(doc(db, "users", loginName, "carts", "1"), {
    ...cart,
  } as Cart);
}

export async function updateCart(props: Cart) {
  await setDoc(doc(db, "users", loginName, "carts", "1"), {
    ...props,
  } as Cart);
}

export async function clearCart() {
  await setDoc(doc(db, "users", loginName, "carts", "1"), { ingredients: [] });
}
