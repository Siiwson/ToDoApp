import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  useColorScheme,
  FlatList,
  Alert,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Constants from "expo-constants";
import { Keyboard } from "react-native";
import { COLORS } from "@/Colors";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/Firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

import Header from "@/Components/Header";

export default function ListOfTodos({ navigation, GlobalState }) {
  //Color theme
  const colorScheme = useColorScheme();
  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeInputStyle =
    colorScheme === "light" ? styles.lightInput : styles.darkInput;
  const themeButtonStyle =
    colorScheme === "light" ? styles.lightButton : styles.darkButton;

  //Global State
  const {
    uid,
    listOfTodos,
    color,
    listName,
    setListName,
    setColor,
    setChosenTodos,
  } = GlobalState;

  //Save list to firebase, and close keyboard
  const handleSaveList = (e) => {
    e.preventDefault();
    addDoc(collection(FIREBASE_DB, "users/", uid, "/listOfTodos"), {
      color: color,
      name: listName,
      timestamp: serverTimestamp(),
    });
    setListName("");
    Keyboard.dismiss();
  };

  //Set chosen list and navigate to home
  const handleChosenTodos = (item) => {
    setChosenTodos(item);
    navigation.navigate("Home");
  };

  //Delete list from firebase
  const handleDeleteList = (item) => {
    Alert.alert("Delete list", "Are you sure you want to delete this list?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () =>
          deleteDoc(doc(FIREBASE_DB, "users/", uid, "/listOfTodos/", item.id)),
      },
    ]);
  };

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Header />
      <Pressable onPress={() => FIREBASE_AUTH.signOut()} style={styles.signout}>
        <AntDesign
          name='close'
          size={40}
          color={colorScheme === "light" ? COLORS.LightText : COLORS.DarkText}
        />
      </Pressable>
      <View style={styles.body}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, themeInputStyle]}
            onChangeText={setListName}
            value={listName}
            placeholder='Add new List!'
          />
          <View style={[{ flexDirection: "row" }]}>
            <Pressable
              style={[styles.colorPick, { backgroundColor: "#e6d055" }]}
              onPress={() => setColor("#e6d055")}
            />
            <Pressable
              style={[styles.colorPick, { backgroundColor: "#6de655" }]}
              onPress={() => setColor("#6de655")}
            />
            <Pressable
              style={[styles.colorPick, { backgroundColor: "#55e6e1" }]}
              onPress={() => setColor("#55e6e1")}
            />
            <Pressable
              style={[styles.colorPick, { backgroundColor: "#6155e6" }]}
              onPress={() => setColor("#6155e6")}
            />
            <Pressable
              style={[styles.colorPick, { backgroundColor: "#e155e6" }]}
              onPress={() => setColor("#e155e6")}
            />
            <Pressable
              style={[styles.colorPick, { backgroundColor: "#e65574" }]}
              onPress={() => setColor("#e65574")}
            />
          </View>
          <Pressable
            style={[styles.button, themeButtonStyle]}
            onPress={handleSaveList}
          >
            <Text style={[{ fontWeight: 600, fontSize: 20 }, themeTextStyle]}>
              Save List
            </Text>
          </Pressable>
        </View>
        <FlatList
          data={listOfTodos}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.listContainer,
                themeButtonStyle,
                { backgroundColor: item.item.color },
              ]}
              onPress={() => handleChosenTodos(item)}
              onLongPress={() => handleDeleteList(item)}
            >
              <View
                style={{
                  justifyContent: "space-around",
                  flexDirection: "column",
                }}
              >
                <Text>{item.item.name}</Text>
                <Text>
                  {item.item.timestamp
                    ? item.item.timestamp.toDate().toDateString()
                    : null}
                </Text>
              </View>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 9,
    width: "100%",
  },
  input: {
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
    width: "90%",
    borderWidth: 1,
    fontSize: 18,
  },
  button: {
    padding: 12,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 120,
    borderWidth: 1,
  },
  inputContainer: {
    alignItems: "center",
  },
  signout: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingTop: Constants.statusBarHeight,
  },
  lightInput: {
    backgroundColor: COLORS.white,
    color: COLORS.black,
    borderColor: COLORS.LightText,
  },
  darkInput: {
    backgroundColor: COLORS.LightText,
    color: COLORS.white,
    borderColor: COLORS.DarkText,
  },
  lightThemeText: {
    color: COLORS.LightText,
  },
  darkThemeText: {
    color: COLORS.DarkText,
  },
  lightButton: {
    backgroundColor: COLORS.lightButton,
    borderColor: COLORS.LightText,
  },
  darkButton: {
    backgroundColor: COLORS.darkButton,
    borderColor: COLORS.DarkText,
  },
  lightContainer: {
    backgroundColor: COLORS.LightBackground,
  },
  darkContainer: {
    backgroundColor: COLORS.DarkBackground,
  },
  colorPick: {
    padding: 12,
    marginVertical: 10,
    marginHorizontal: 7,
    borderRadius: 20,
    alignItems: "center",
    width: 40,
    height: 40,
    borderWidth: 1,
  },
  listContainer: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
  },
});
