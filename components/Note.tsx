import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import CheckBox from "react-native-check-box";
import moment from "moment";
import { useData } from "@/app/context/Context";
import { useNavigation } from "expo-router";

type NoteProps = {
  isCompleted: boolean;
  _id: string;
  bookMark: boolean;
  category: string;
  title: string;
  description: string;
  image: string;
  dueDate: string;
};

const Note = ({
  title,
  isCompleted,
  bookMark,
  _id,
  category,
  description,
  image,
  dueDate,
}: NoteProps) => {
  const { toggleCompleted, bookmarkOnBack, deleteNote } = useData();
  const navigation = useNavigation();
  return (
    <View style={[styles.note, isCompleted ? { opacity: 0.7 } : null]}>
      <View style={styles.noteHeader}>
        {bookMark ? (
          <MaterialCommunityIcons
            onPress={() => bookmarkOnBack(_id)}
            name="bookmark"
            size={24}
            color={"black"}
          />
        ) : (
          <Octicons
            onPress={() => bookmarkOnBack(_id)}
            name="bookmark"
            size={24}
            color={"white"}
          />
        )}

        <Text style={styles.noteCat}>{category}</Text>
      </View>

      <Text style={[styles.noteTit, isCompleted ? { textDecorationLine:'line-through' } : null]}>{title}</Text>
      <Text style={styles.noteDesc}>{description}</Text>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 100,
            height: 80,
            borderRadius: 10,
            marginVertical: 10,
          }}
        />
      )}
      <View style={styles.noteFooter}>
        <View style={styles.icons}>
          <MaterialIcons
            onPress={() => deleteNote(_id)}
            name="delete"
            size={24}
            color={"black"}
          />

          <Feather
            onPress={() => {
              navigation.navigate("create", { id: _id });
            }}
            name="edit"
            size={24}
            color={"black"}
          />
          <CheckBox
            onClick={() => toggleCompleted(_id)}
            isChecked={isCompleted}
          />
        </View>
        <Text style={styles.noteDate}>
          {dueDate ? moment(dueDate).format("MMM Do YYYY") : ""}
        </Text>
      </View>
    </View>
  );
};

export default Note;

const styles = StyleSheet.create({
  note: {
    backgroundColor: Colors.light.colorPink,
    width: "100%",
    borderRadius: 10,
    padding: 5,
    justifyContent: "space-between",
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  noteCat: {
    color: Colors.light.background,
    textAlign: "right",
    textTransform: "lowercase",
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
  noteFooter: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icons: {
    flexDirection: "row",
    gap: 10,
  },
});
