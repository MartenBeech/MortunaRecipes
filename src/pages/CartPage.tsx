import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Cart } from "../entities/cart";
import { getCart, updateCart } from "../firebase/cart";

interface Props {
  navigation: any;
  route: any;
}

export const CartPage = (props: Props) => {
  const [cart, setCart] = useState<Cart>({ ingredients: [] });
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getCart().then((response) => {
        setCart(response);
      });
    }
  }, [isFocused]);

  const onClickCheckbox = (index: number) => {
    const newCart = { ...cart };
    newCart.ingredients[index].checked = !newCart.ingredients[index].checked;
    setCart(newCart);
    updateCart(newCart);
  };

  return (
    <ScrollView>
      {cart && (
        <View style={styles.container}>
          <Text style={styles.title}>Cart</Text>
          <View style={styles.lineBreak} />
          {cart.ingredients.map((ingredient, index) => {
            return (
              <View style={styles.row} key={`${"ingredient"}-${index}`}>
                <BouncyCheckbox
                  style={styles.checkboxBuy}
                  isChecked={ingredient.checked}
                  disableBuiltInState
                  text={`${ingredient.name}${
                    ingredient.amount ? ` (${ingredient.amount})` : ""
                  }`}
                  onPress={() => onClickCheckbox(index)}
                />
              </View>
            );
          })}
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
  },
  checkboxBuy: {
    minHeight: 40,
    marginVertical: 12,
    marginLeft: "4%",
  },
  lineBreak: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
