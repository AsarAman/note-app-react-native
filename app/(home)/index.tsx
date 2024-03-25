import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import PageHeader from "@/components/Header";
import Categories from "@/components/Categories";
import { useData } from "../context/Context";

import Note from "@/components/Note";
import Colors from "@/constants/Colors";
export default function Home() {
  const { notes, loading } = useData();

  return (
    <ScrollView>
      <PageHeader />
      <Categories />
      {loading ? (
        <ActivityIndicator size={50} color={Colors.light.colorPink} />
      ) : (
        <>
          <View style={styles.container}>
            <Text>
              {notes && notes.length > 0
                ? `You have ${notes.length} notes`
                : "You have no notes"}
            </Text>
            <View style={styles.notes}>
              {notes &&
                notes.length > 0 &&
                notes.map((note, index) => {
                  return <Note key={note._id} {...note} />;
                })}
            </View>
          </View>
        </>
      )}
     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
   
  },
  notes: {
    marginVertical: 8,

    rowGap: 10,
  },
});
