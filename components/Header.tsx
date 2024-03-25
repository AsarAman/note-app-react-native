import { Text, View, StyleSheet, StatusBar, TextInput } from "react-native";
import { SafeAreaView } from "react-native";

import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useData } from "@/app/context/Context";

export default function PageHeader() {
  const { searchQuery, handleSearch, user } = useData();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.info}>
          <Text style={styles.logo}>Hi, {user?.name.toUpperCase()}</Text>
          <Link href={"/(home)/bookmarked"}>
            <MaterialCommunityIcons name="bookmark" size={32} color={"black"} />
          </Link>
        </View>
        <View style={styles.search}>
          <TextInput
            value={searchQuery}
            onChangeText={(text) => handleSearch(text)}
            placeholder="Search here..."
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  header: {
    backgroundColor: Colors.light.colorPink,
    paddingHorizontal: 12,

    marginBottom: 20,
    paddingVertical: 10,

    justifyContent: "space-between",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  logo: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.light.background,

    maxWidth: 250,
  },

  search: {
    backgroundColor: Colors.light.background,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
