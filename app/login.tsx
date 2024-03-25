import React, { useLayoutEffect, useEffect } from "react";

import { useNavigation, router} from "expo-router";

import InputForm from "@/components/Form";
import { View, StyleSheet, Image } from "react-native";
import { useData } from "./context/Context";
import { useIsFocused } from "@react-navigation/native";

const Login = () => {
  const focused = useIsFocused()
  console.log(focused, 'from login')
  const navigation = useNavigation();
  const {user,loading, setLoading} = useData()
  console.log(loading, 'loading')

  
  
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
      <InputForm title={"Login"}  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Login;
