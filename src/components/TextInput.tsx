import { StyleSheet, TextInput as Input } from "react-native";

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  size: "large" | "small" | "xl";
}

export const TextInput = (props: Props) => {
  return (
    <Input
      placeholder={props.placeholder}
      placeholderTextColor="#bbbbbb"
      style={
        props.size === "large"
          ? { ...styles.input, ...styles.nameInput }
          : props.size === "small"
          ? { ...styles.input, ...styles.amountInput }
          : { ...styles.input, ...styles.titleInput }
      }
      value={props.value}
      onChangeText={props.onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 41,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  nameInput: {
    marginLeft: "4%",
    marginRight: "2%",
    width: "63%",
  },
  amountInput: {
    marginLeft: "2%",
    marginRight: "4%",
    width: "25%",
  },
  titleInput: {
    marginHorizontal: "4%",
  },
});
