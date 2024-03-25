import {
  
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Alert,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useData } from "../context/Context";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";


type NoteObject = {
  title: string;
  description: string;
  category: string;
  dueDate: Date;
  image?: string; 
};

const Create = ({}) => {
  const { createNote, notes, editNote, loading } = useData();
  let { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const goback = () =>{
    navigation.goBack()
    setNoteCategory("");
    setNoteDescription("");
    setNoteTitle("");
    setImage('')
    
  }

  let note = notes.find((note) => note._id === id);

  console.log(id);

  useEffect(() => {
    setNoteTitle(note?.title || "");
    setNoteDescription(note?.description || "");
    setNoteCategory(note?.category || "");
    setImage(note?.image || "");
    setDueDate(note?.dueDate ? new Date(note.dueDate) : new Date());
  }, [note]);

  const [title, setNoteTitle] = useState<string>(note?.title || "");
  const [description, setNoteDescription] = useState<string>(
    note?.description || ""
  );
  const [category, setNoteCategory] = useState<string>(note?.category || "");
  const [image, setImage] = useState<string>(note?.image || "");
  const [dueDate, setDueDate] = useState<Date>(
    note?.dueDate ? new Date(note.dueDate) : new Date()
  );
  const [open, setOpen] = useState<boolean>(false);

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

  //handle datepicker
  const handleOpen = () => {
    setOpen(!open);
  };
  //handle onchange of date-picker
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setOpen(false);
    const currentDate = selectedDate || dueDate;
    setDueDate(currentDate);
  };
  //create new note
  const createNewNote = () => {
    if (!title && !description) {
      Toast.show({
        type: "error",
        text1: "You cannot create an empty note!",
      });
      return;
    }

    const noteObject: NoteObject = {
      title,
      description,
      category,
      dueDate,
    };
    if (image) {
      noteObject.image = image;
    }

    if (id) {
     
      editNote(id.toString(), noteObject);
    } else {
    
      createNote(noteObject);
    }

    
    setNoteCategory("");
    setNoteDescription("");
    setNoteTitle("");
  };

  //mark note complete
  const complete = () => {
    Alert.alert("Mark this note as completed?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Ask me later pressed"),
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => console.log("Mark as completed"),
        style: "destructive",
      },
    ]);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back-outline"
          size={32}
          color={Colors.light.colorPink}
          onPress={goback}
        />
      </View>

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
      <View style={styles.inputContainer}>
        <TextInput
          value={title}
          onChangeText={(text) => setNoteTitle(text)}
          placeholder="Title"
          style={styles.input}
          placeholderTextColor={Colors.light.background}
        />
        <TextInput
          value={description}
          onChangeText={(text) => setNoteDescription(text)}
          placeholder="Description"
          style={styles.input}
          placeholderTextColor={Colors.light.background}
        />
        <TextInput
          value={category}
          onChangeText={(text) => setNoteCategory(text)}
          placeholder="Category"
          style={styles.input}
          placeholderTextColor={Colors.light.background}
        />
      </View>

      <View style={styles.imageDisplay}>
        {image && (
          <View style={styles.imgCon}>
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100, borderRadius: 15 }}
            />
            <Entypo
              onPress={() => setImage("")}
              style={styles.cross}
              name="cross"
              size={24}
              color="white"
            />
          </View>
        )}
      </View>
      <View style={styles.filePicker}>
        <View style={styles.imagePicker}>
          <MaterialCommunityIcons
            onPress={pickImage}
            name="file-image-plus-outline"
            size={48}
            color="white"
          />
        </View>
      </View>

      <View style={styles.date}>
        <Text style={styles.text}>Due Date</Text>
        <Text onPress={handleOpen} style={styles.desc}>
          Add
        </Text>
        <Text>{moment(dueDate).format("MMMM Do YYYY")}</Text>

        {open && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            is24Hour={true}
            testID="datePicker"
            display="default"
            onChange={onChange}
            textColor="yellow"
          />
        )}
      </View>
      {/* <View style={styles.date}>
        <Text style={styles.text}>Reminders</Text>
        <Text style={styles.desc}>Add</Text>
      </View> */}
      {/* <View style={styles.complete}>
        <Text onPress={complete} style={styles.completed}>
          Completed
        </Text>
      </View> */}
      <View style={styles.done}>
        <Text onPress={goback} style={styles.completed}>
          Cancel
        </Text>
        <AntDesign
          onPress={createNewNote}
          name="checkcircle"
          size={38}
          color={Colors.light.colorPink}
        />
      </View>
    </ScrollView>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 16,
    marginBottom:20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginTop: 5,
  },
  inputContainer: {
    backgroundColor: Colors.light.colorPink,
    paddingHorizontal: 12,
    paddingVertical: 20,
    maxWidth: 550,
    width: "90%",

    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 10,
    borderRadius: 15,
  },
  input: {
    borderBottomColor: Colors.light.borderColor,
    borderBottomWidth: 1,
    color: Colors.light.background,
    paddingHorizontal: 3,
    marginBottom: 15,
  },
  imageDisplay: {
    marginBottom: 15,
  },
  imgCon: {
    borderRadius: 15,
    position: "relative",
    width: "25%",
  },
  cross: {
    position: "absolute",
    top: 3,
    right: -3,
  },
  filePicker: {
    marginBottom: 15,
  },
  imagePicker: {
    backgroundColor: Colors.light.colorPink,
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 15,
  },
  category: {
    marginBottom: 15,
  },
  date: {
    marginBottom: 15,
  },
  complete: {
    marginBottom: 15,
  },
  done: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    marginBottom: 5,
    fontSize: 16,
  },
  desc: {
    color: Colors.light.colorPink,
  },
  completed: {
    color: Colors.light.colorPink,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  waveformContainer: {
    marginTop: 20,
  },

});
