import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from "react-native";
import { useData } from "./context/Context";
import { useEffect } from "react";
import { router } from "expo-router";
import Colors from "@/constants/Colors";

const Page = () => {
  const { user,loading } = useData();
  

  useEffect(() => {
    if (user) {
      router.navigate("(home)");
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/landing.png")}
          style={styles.image}
        />
      </View>
      <Text style={styles.appTitle}> Noter</Text>

      <Text style={styles.appInfo}>
        Simplifying note-taking. Capture, organize, and stay productive.
      </Text>
      <View style={styles.btns}>
        <Link href={"/login"} asChild>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </Link>
        <Link href={"/register"} asChild>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <StatusBar backgroundColor={'white'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
    

    backgroundColor: "white",
  },
  imageContainer: {
    marginBottom: 30,
    paddingTop:40
  },
  image: {
    width: 300,
    height: 300,
  },
  appInfo: {
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "center",
    width: "90%",
  },
  appTitle: {
    color: Colors.light.colorPink,
    textTransform: "uppercase",
    fontSize: 32,
    letterSpacing: 1.5,
    fontWeight: "bold",
    marginBottom: 10,
  },
  btns: {
    width: "100%",

    gap: 10,
    marginTop: 20,
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.light.colorPink,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
    width: "90%",
  },

  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "900",
  },
});

export default Page;
