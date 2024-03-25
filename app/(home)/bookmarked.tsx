import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";

import PageHeader from "@/components/Header";
import Categories from "@/components/Categories";

import { useData } from "../context/Context";
import Colors from "@/constants/Colors";

import Note from "@/components/Note";

const Bookmarked = () => {
  const { bookMarks,loading } = useData();

  return (
    <ScrollView>
      <PageHeader />
      <Categories />
      {loading ? <ActivityIndicator size={50} color={Colors.light.colorPink} /> : bookMarks.length > 0 ? (
        <View style={styles.notes}>
          {bookMarks.map((bookmark) => {
            return <Note {...bookmark} key={bookmark._id} />;
          })}
        </View>
      ) : (
        <Text style={styles.empty}>OOps! No note found!</Text>
      )}
    </ScrollView>
  );
};

export default Bookmarked;

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
