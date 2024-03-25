import React, { useLayoutEffect, useEffect } from "react";

import { useNavigation, router} from "expo-router";

import InputForm from "@/components/Form";
import { View, StyleSheet} from "react-native";
import { useData } from "./context/Context";


const Login = () => {
  
  
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
