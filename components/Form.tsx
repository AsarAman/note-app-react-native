import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  
  Image,
  ScrollView,
  Keyboard
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { useData } from "@/app/context/Context";
import Input from "./Input";

import Toast from "react-native-toast-message";
import { useIsFocused } from "@react-navigation/native";

type InputFormProps = {
  title: string;
  name?: boolean;
};

const InputForm = ({ title, name }: InputFormProps) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [userName, setUserName] = useState<string>();

  const { loginUser, registerUser, loading, setLoading } = useData();

  const focused = useIsFocused();

  useEffect(() => {
    
    if(focused){
      setLoading(false);
    }
    
  }, [focused]);

  const handleSubmit = () => {
    Keyboard.dismiss()
    if (!email || !password) {
      return Toast.show({
        type: "error",
        text1: "Please provide the missing fields!",
      });
    }
    if (password && email && userName) {
      return registerUser({ name: userName, email: email, password: password });
    }

    loginUser({ email: email, password: password });
   
  };

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
      style={styles.container}
      keyboardShouldPersistTaps='handled'
    >
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/dign-up-img.png")}
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.form}>
        {name && (
          <>
            <Input
              label="Name"
              placeholder="Enter your name"
              value={userName!}
              handleChange={(text) => setUserName(text)}
            />
          </>
        )}
        <Input
          label="Email"
          value={email!}
          handleChange={(text) => setEmail(text)}
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          handleChange={(text) => setPassword(text)}
          value={password!}
          password
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
        <Text style={styles.btnText}>{loading ? "Loading..." : title}</Text>
      </TouchableOpacity>
      {name ? (
        <Text style={styles.member}>
          Already have an account?{" "}
          <Link style={styles.link} href={"/login"}>
            Login
          </Link>
        </Text>
      ) : (
        <Text style={styles.member}>
          Don't have an account?{" "}
          <Link style={styles.link} href={"/register"}>
            Register
          </Link>
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.light.background,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  image: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 10,
    textAlign: "center",
    color: Colors.light.colorPink,
  },

  form: {
    marginTop: 15,
    width: "100%",

    alignItems: "center",
    justifyContent: "flex-start",
  },

  btn: {
    backgroundColor: Colors.light.colorPink,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 15,
    width: "90%",
  },

  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 20,
  },
  member: {
    marginTop: 15,
    marginBottom: 15,
  },
  link: {
    color: Colors.light.colorPink,
    fontWeight: "600",
    fontSize: 16,
  },
});

export default InputForm;
