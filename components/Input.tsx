import { Text, TextInput, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { Octicons } from "@expo/vector-icons";

type InputPrps = {
  label: string;
  placeholder: string;
  value: string;
  handleChange: (text: string) => void;
  password?: boolean;
};

const Input = ({
  label,
  placeholder,
  value,
  handleChange,
  password,
}: InputPrps) => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChange}
        secureTextEntry={password && showPassword}
      />
      {password && showPassword ? (
        <Text
          onPress={() => setShowPassword(!showPassword)}
          style={styles.icon}
        >
          <Octicons color={Colors.light.colorPink} size={20} name="eye" />
        </Text>
      ) : (
        !showPassword && (
          <Text
            onPress={() => setShowPassword(!showPassword)}
            style={styles.icon}
          >
            <Octicons color={Colors.light.colorPink} size={20} name="eye-closed" />
          </Text>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    position: "relative",
  },
  label: {
    textAlign: "left",

    //width: "90%",
    marginBottom: 10,
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    borderWidth: 0.5,
    borderColor: "lightgrey",
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: Colors.light.inputBackground,

    marginBottom: 15,
    borderRadius: 15,

    width: "100%",
  },
  icon: {
    position: "absolute",
    top: "50%",
    right: 10,
  },
});

export default Input;
