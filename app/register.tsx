import React, { useLayoutEffect, useEffect } from "react";

import { useNavigation, router } from "expo-router";

import InputForm from "@/components/Form";
import { StyleSheet, View } from "react-native";
import { useData } from "./context/Context";

const Register = () => {
  const navigation = useNavigation();

  const {user} = useData()

  useEffect(() => {
    if (user) {
      router.navigate("(home)");
    }
  }, [user]);
 
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <InputForm name title="Sign Up" />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
