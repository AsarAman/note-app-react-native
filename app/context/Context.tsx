import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import Toast from "react-native-toast-message";

import { ParamListBase } from "@react-navigation/native";
//navigation error fix
declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParamListBase {}
  }
}

//export function useNavigation<T extends NavigationProp>(): T;

import AsyncStorage from "@react-native-async-storage/async-storage";
//user i am expecting from my backend
type User = {
  id: string;
  name: string;
  email: string;
  token: string;
  profile?: string;
};
//note i am expecting to get from backend
type Note = {
  _id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  dueDate: string;
  image: string;
  bookMark: boolean;
  isCompleted: boolean;
};
//note i am sending to backend
type CreateNote = {
  title: string;
  description: string;
  category: string;
  dueDate: any;
  image?: string;
};
//user i am sending to backend
type SetUpUser = {
  name?: string;
  email: string;
  password: string;
  image?: string;
};

//data type for my app
type DataType = {
  //user
  registerUser: (currentUser: SetUpUser) => void;
  loginUser: (currentUser: SetUpUser) => void;
  logOutUser: () => void;
  updateUser: (currentUser: SetUpUser) => void;

  //note
  createNote: (currentNote: CreateNote) => void;
  handleSearch: (text: string) => void;
  getNotes: () => void;
  setCategory: (text: string) => void;
  deleteNote: (id: string) => void;
  editNote: (id: string, currentNote: CreateNote) => void;
  bookmarkOnBack: (id: string) => void;
  toggleCompleted: (id: string) => void;

  setLoading: Dispatch<SetStateAction<boolean>>;

  //state
  user: User | null;
  loading: boolean;
  notes: Note[];
  bookMarks: Note[];
  completed: Note[];
  searchQuery: string;
  category: string | null;
  categories: string[];
  modal: boolean;
};

const AppContext = createContext<DataType>({
  registerUser: (currentUser: SetUpUser) => {},
  loginUser: (currentUser: SetUpUser) => {},
  logOutUser: () => {},
  updateUser: (currentUser: SetUpUser) => {},

  createNote: (currentNote: CreateNote) => {},
  handleSearch: (text: string) => {},
  getNotes: () => {},
  deleteNote: (id: string) => {},
  editNote: (id: string, currentNote: CreateNote) => {},
  bookmarkOnBack: (id: string) => {},
  toggleCompleted: (id: string) => {},
  setCategory: (text: string) => {},

  setLoading: () => {},

  user: null,
  loading: false,
  notes: [],
  bookMarks: [],
  completed: [],
  searchQuery: "",
  category: null,
  categories: [],
  modal: false,
});

const AppProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [bookMarks, setBookMarks] = useState<Note[]>([]);
  const [searchQuery, setSearchquery] = useState<string>("");
  const [category, setCategory] = useState<string | null>("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [completed, setCompleted] = useState<Note[]>([]);
  const [modal, setModal] = useState<boolean>(false);

  //logout user

  const logOutUser = async () => {
    try {
    setLoading(false);
      const logout = await AsyncStorage.removeItem("User");
      
      setUser(null);

      
    } catch (error) {
      setLoading(false);
      console.log("Error logging out user");
    }
  };
  //fetch user from local storage

  const fetchUser = async () => {
    try {
      const jsonUser = await AsyncStorage.getItem("User");
      if (!jsonUser) {
        throw new Error("User not found in local storage");
      }
      const userData = JSON.parse(jsonUser) as User;
      setLoading(false);
      setUser(userData);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  //save user to local storage

  const saveUserToLocalStorage = async (currentUser: User) => {
    try {
      const jsonUser = JSON.stringify(currentUser);
      await AsyncStorage.setItem("User", jsonUser);
    } catch (error) {
      console.log(error);
    }
  };
  // register user
  const registerUser = async (currentUser: SetUpUser) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://note-app-server-mobile-2.onrender.com/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentUser),
        }
      );
      const data = await response.json();
      const msg = data.msg;
      const searchString = "than the minimum allowed length (8)";
      const nameSearchString = "Path `name`";
      setLoading(false)

      if (msg && msg === "email field has to be unique") {
        Toast.show({
          type: "error",
          text1: "This email already exists!",
        });
        

        return;
      } else if (msg && msg === "please provide valid email") {
        Toast.show({
          type: "error",
          text1: "Please provide a valid email!",
        });

        return;
      } else if (msg && msg.indexOf(searchString) !== -1) {
        Toast.show({
          type: "error",
          text1: "Password should be minimum of 8 characters!",
        });

        return;
      } else if (msg && msg.indexOf(nameSearchString) !== -1) {
        Toast.show({
          type: "error",
          text1: "UserName should be between 4 to 17 characters!",
        });

        return;
      } else {
        setUser(data.user);

        saveUserToLocalStorage(data.user);
        Toast.show({
          type: "success",
          text1: "You have been registered!",
        });
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Error in registering you!",
      });
    }
  };
  //Login user
  const loginUser = async (currentUser: SetUpUser) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://note-app-server-mobile-2.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentUser),
        }
      );
      const data = await response.json();
      setLoading(false);
      if (data.msg === "Invalid credentials") {
        Toast.show({
          type: "error",
          text1: data.msg,
        });
        setLoading(false);
        return;
      }

      setUser(data.user);
      saveUserToLocalStorage(data.user);
      Toast.show({
        type: "success",
        text1: "Login Successfull!",
      });
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Login failed!",
      });
    }
  };
  //fetch categories
  const getCategories = async () => {
    setLoading(true);
    try {
      if (user) {
        const token = user.token;
        const response = await fetch(
          `https://note-app-server-mobile-2.onrender.com/api/v1/notes/categories`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        setCategories(data.categories);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, [user]);
  //create note

  const createNote = async (currentNote: CreateNote) => {
    setLoading(true);
    try {
      if (user) {
        const token = user.token;
        const response = await fetch(
          "https://note-app-server-mobile-2.onrender.com/api/v1/notes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(currentNote),
          }
        );
        const data = await response.json();

        getNotes();
        getCategories();
        Toast.show({
          type: "success",
          text1: "Your note have been created successfully!",
        });

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Error in creating your note!",
      });
    }
  };

  //get notes

  const getNotes = async () => {
    setLoading(true);
    let url = `https://note-app-server-mobile-2.onrender.com/api/v1/notes?category=${category}&sort=latest`;

    if (searchQuery) {
      url = url + `&search=${searchQuery}`;
    }

    try {
      if (user) {
        const token = user.token;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setLoading(false);
        setNotes(data.notes);

        const bookMarked = data.notes.filter(
          (note: Note) => note.bookMark === true
        );
        setBookMarks(bookMarked);
        const completed = data.notes.filter(
          (note: Note) => note.isCompleted === true
        );
        setCompleted(completed);
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Failed to fetch notes!",
      });
    }
  };
  useEffect(() => {
    getNotes();
  }, [user, searchQuery, category]);

  // useEffect(() => {

  //   getNotes();
  //   getCategories();
  // }, []);

  //handleSearch

  const handleSearch = (text: string) => {
    console.log("search", searchQuery);
    setSearchquery(text);
  };

  // delete note

  const deleteNote = async (id: string) => {
    setLoading(true);
    try {
      if (user) {
        const token = user.token;
        const response = await fetch(
          `https://note-app-server-mobile-2.onrender.com/api/v1/notes/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        Toast.show({
          type: "success",
          text1: "Your note have been deleted!",
        });
        getNotes();
        getCategories();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Error in deleting your note",
      });
      console.log(error);
    }
  };

  //edit note
  const editNote = async (id: string, currentNote: CreateNote) => {
    setLoading(true);
    try {
      if (user) {
        const token = user.token;
        const response = await fetch(
          `https://note-app-server-mobile-2.onrender.com/api/v1/notes/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(currentNote),
          }
        );

        const data = await response.json();
        Toast.show({
          type: "success",
          text1: "Note updated successfully",
        });
        getNotes();
        getCategories();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error in updating your note",
      });
    }
  };

  //bookmark on backend

  const bookmarkOnBack = async (id: string) => {
    setLoading(true);
    try {
      if (user) {
        const token = user.token;
        const response = await fetch(
          `https://note-app-server-mobile-2.onrender.com/api/v1/notes/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ bookMark: "Toggle bookmark" }),
          }
        );

        const data = await response.json();
        console.log(data, "bookmarked");
        if (data.item.bookMark === true) {
          Toast.show({
            type: "success",
            text1: "Your note have been added to bookmarks",
          });
          getNotes();
          return;
        }
        Toast.show({
          type: "success",
          text1: "Your note have been moved out from bookmarked!",
        });
        getNotes();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error in bookmarking your note",
      });
    }
  };
  //toggle completed
  const toggleCompleted = async (id: string) => {
    setLoading(true);
    try {
      if (user) {
        const token = user.token;
        const response = await fetch(
          `https://note-app-server-mobile-2.onrender.com/api/v1/notes/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ completed: "Toggle completed" }),
          }
        );

        const data = await response.json();
        // console.log(data, "completed");
        if (data.item.isCompleted === true) {
          Toast.show({
            type: "success",
            text1: "You have completed your note",
          });
          getNotes();
          return;
        }
        Toast.show({
          type: "success",
          text1: "Your note have been moved from completed!",
        });
        getNotes();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error in completing your note ",
      });
    }
  };

  //update user

  const updateUser = async (currentUser: SetUpUser) => {
    setLoading(true);
    try {
      let token;
      if (user) {
        token = user.token;
      }
      const response = await fetch(
        "https://note-app-server-mobile-2.onrender.com/api/v1/auth/update",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(currentUser),
        }
      );
      const data = await response.json();
      console.log(data, "data");
      Toast.show({
        type: "success",
        text1: "User updated",
      });

      setUser(data.user);
      saveUserToLocalStorage(data.user);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Error in updating user",
      });
    }
  };

  console.log(loading, "loading from state");

  return (
    <AppContext.Provider
      value={{
        notes,
        editNote,
        toggleCompleted,
        updateUser,
        modal,

        category,
        handleSearch,
        searchQuery,
        user,
        registerUser,
        loginUser,
        loading,
        createNote,
        completed,
        logOutUser,
        setLoading,

        bookMarks,
        getNotes,
        categories,
        deleteNote,
        bookmarkOnBack,

        setCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useData = () => useContext(AppContext);

export default AppProvider;
