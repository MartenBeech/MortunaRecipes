import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Cart } from "../entities/cart";
import { getCart, updateCart } from "../firebase/cart";
import { RootStackParamList } from "../Navigation";

type NavigationRoute = NativeStackScreenProps<RootStackParamList, "CartScreen">;

interface Props {
  navigation: NavigationRoute["navigation"];
  route: NavigationRoute["route"];
}

export const CartScreen = (props: Props) => {
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
          <View style={styles.row}>
            <Text style={styles.title}>Cart</Text>
            <Pressable
              onPress={() => {
                props.navigation.navigate("EditCartScreen");
              }}
            >
              <Image
                source={require("../images/Pencil.png")}
                style={styles.pencilImage}
              />
            </Pressable>
          </View>
          <View style={styles.lineBreak} />
          {cart.ingredients.map((ingredient, index) => {
            return (
              <View style={styles.row} key={`${"ingredient"}-${index}`}>
                <BouncyCheckbox
                  style={styles.checkboxBuy}
                  isChecked={ingredient.checked}
                  disableBuiltInState
                  text={`${ingredient.name}${
                    ingredient.amount ? `  ---  ${ingredient.amount}` : ""
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
    width: "100%",
  },
  lineBreak: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pencilImage: {
    height: 40,
    width: 40,
    resizeMode: "contain",
    marginRight: 12,
  },
});
