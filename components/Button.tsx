import { Link } from "expo-router";
import { TouchableOpacity, Text, StyleSheet, Pressable } from "react-native";

type ButtonProps = {
  btnText: string;
  onClicked?: () => void;
};
function Button({ btnText, onClicked }: ButtonProps) {
  return (
    <Pressable onPress={onClicked} style={styles.btn}>
      <Text style={styles.btnText}>{btnText}</Text>
    </Pressable>
  );
}

export default Button;
const styles = StyleSheet.create({
  btn: {
    backgroundColor: "blue",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
  },

  btnText: {
    color: "white",
  },
});
