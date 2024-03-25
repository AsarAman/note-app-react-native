import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
  
} from "react-native";
import { useData } from "../context/Context";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Link, useNavigation } from "expo-router";
import Toast from "react-native-toast-message";

function Profile() {
  const { user, updateUser, logOutUser, setLoading, loading } = useData();
  const [image, setImage] = useState<string | null>(user?.profile || null);
  const [name, setName] = useState<string>(user?.name || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation();

  const onSubmit = () => {
    if (!name || !email || !password) {
      return Toast.show({
        type: "error",
        text1: "Please provide the required fields!",
      });
    }
    const userObject = {
      name: name,
      email: email,
      password: password,
      picture: image,
    };

    updateUser(userObject);
  
  };

  //logout user 

  const logUserOut = ()=>{
    logOutUser()
  
    
  }

  //pick image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      let selectedImage = result.assets[0].base64;
      selectedImage = "data:image/jpeg;base64," + selectedImage;

      setImage(selectedImage);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Ionicons
        name="chevron-back-outline"
        size={32}
        color={Colors.light.colorPink}
        onPress={() => navigation.goBack()}
      />
       {loading && (
        <ActivityIndicator
          size={50}
          color={Colors.light.colorPink}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 15,
          }}
        />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.profileSection}
      >
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.image}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  margin: -10,
                  padding: -10,
                }}
                source={{
                  uri: image
                    ? image
                    : `https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png`,
                }}
              />
            </View>
          </TouchableOpacity>

          <Text style={styles.username}>{user?.name}</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <Text style={styles.label}>Your name</Text>
            <TextInput
              value={name}
              style={styles.textInput}
              placeholder="name"
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.label}>your email</Text>
            <TextInput
              value={email}
              style={styles.textInput}
              placeholder="email"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.label}>Your password</Text>
            <TextInput
              value={password}
              style={styles.textInput}
              placeholder="password"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>
        <View style={styles.btns}>
          <TouchableOpacity onPress={onSubmit} style={styles.btn}>
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <Link href='/' asChild>
          <TouchableOpacity
            onPress={logUserOut}
            style={styles.btnCancel}
          >
            <Text style={styles.btnTextCancel}>LogOut</Text>
          </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  profileSection: {},
  profileContainer: {
    alignItems: "center",
  },

  image: {
    borderColor: Colors.light.colorPink,
    borderWidth: 3,

    height: 120,
    width: 120,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 60,
  },
  username: {
    fontWeight: "900",
    fontSize: 20,
    textTransform: "capitalize",
    marginTop: 8,
    color: Colors.light.colorPink,
  },
  inputContainer: {
    marginVertical: 20,
  },
  input: {},
  label: {
    textTransform: "capitalize",
    marginBottom: 8,
    fontWeight: "700",
  },
  textInput: {
    borderWidth: 0.5,
    borderColor: "lightgrey",
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: Colors.light.inputBackground,

    marginBottom: 15,
    borderRadius: 15,

    width: "100%",
  },
  btns: {
    
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width:'100%',
    marginBottom:40
  },
  btn: {
    backgroundColor: Colors.light.colorPink,
    width: '100%',
    
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: "black",
    shadowRadius: 10,
    shadowOffset: {
      width: -2,
      height: 5,
    },
    shadowOpacity: 0.5,
    elevation: 5,
    height: 40,
  },
  btnText: {
    color: "white",
    fontWeight: "600",
  },
  btnCancel: {
    width: '100%',

    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.light.colorPink,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    
  },
  btnTextCancel: {
    fontWeight: "600",
  },
});
