import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  
  ActivityIndicator,
} from "react-native";
import React from "react";
import PageHeader from "@/components/Header";
import CategoriesComponent from "@/components/Categories";
import { useData } from "../context/Context";
import Colors from "@/constants/Colors";


import Note from "@/components/Note";

const Categories = () => {
  const { completed,  loading } = useData();

  return (
    <ScrollView>
      <PageHeader />
      <CategoriesComponent />
      {loading ? <ActivityIndicator size={50} color={Colors.light.colorPink} /> : completed.length > 0 ? (
        <View style={styles.notes}>
          {completed.map((bookmark) => {
            return <Note {...bookmark} key={bookmark._id} />;
          })}
        </View>
      ) : (
        <Text style={styles.empty}>OOps! No note found!</Text>
      )}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  notes: {
    paddingHorizontal: 12,
    marginTop: 8,
    flexDirection: "row",

    justifyContent: "space-between",
    flexWrap: "wrap",
    rowGap: 10,
  },
  
  empty: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
  },
});
