import { ScrollView, StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";

import PageHeader from "@/components/Header";
import Categories from "@/components/Categories";

import { useData } from "../context/Context";
import Colors from "@/constants/Colors";
import moment from "moment";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Note from "@/components/Note";

const Bookmarked = () => {
  const { bookMarks, bookmarkOnBack, loading } = useData();

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
