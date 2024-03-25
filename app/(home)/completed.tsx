import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import PageHeader from "@/components/Header";
import CategoriesComponent from "@/components/Categories";
import { useData } from "../context/Context";
import Colors from "@/constants/Colors";
import moment from "moment";

import Note from "@/components/Note";

const Categories = () => {
  const { completed, bookmarkOnBack, loading } = useData();

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
  note: {
    backgroundColor: Colors.light.colorPink,
    width: "48%",
    borderRadius: 10,
    padding: 5,
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  noteCat: {
    color: Colors.light.background,
    textAlign: "right",
  },
  noteTit: {
    color: Colors.light.background,
    fontWeight: "600",
    marginBottom: 5,
  },
  noteDesc: {
    color: Colors.light.background,
  },
  noteDate: {
    color: Colors.light.background,
    textAlign: "right",
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
  },
});
