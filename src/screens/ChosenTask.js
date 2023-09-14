import {
  StyleSheet,
  Text,
  View,
  Pressable,
  useColorScheme,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { doc, deleteDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../Firebase";
import { COLORS } from "../../Colors";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function ChosenTask({ navigation, GlobalState }) {
  //Color theme
  const colorScheme = useColorScheme();
  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeInputStyle =
    colorScheme === "light" ? styles.lightInput : styles.darkInput;
  const themeBody =
    colorScheme === "light" ? styles.lightBody : styles.darkBody;

  const { chosenTask, uid } = GlobalState;

  const deleteItemAndReturn = (id) => {
    deleteDoc(doc(FIREBASE_DB, "users/" + uid + "/todos", id));
    navigation.navigate("Home");
  };

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Header />
      <View style={[styles.body, themeBody]}>
        <Text style={chosenTask.item.isDone ? styles.doneTask : themeTextStyle}>
          {chosenTask.item.task}
        </Text>
      </View>
      <Pressable
        onPress={() => deleteItemAndReturn(chosenTask.id)}
        style={[styles.deleteItem, themeInputStyle]}
      >
        <FontAwesome
          name='trash'
          size={50}
          color={colorScheme === "light" ? COLORS.lightTrash : COLORS.darkTrash}
        />
      </Pressable>
      <Footer navigation={navigation} />
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
    flex: 8,
    width: "100%",
    alignItems: "flex-start",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  deleteItem: {
    zIndex: 1,
    position: "absolute",
    bottom: 45,
    right: 20,
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.27,
    elevation: 10,
  },
  doneTask: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: COLORS.lightButton,
    fontSize: 24,
  },
  lightInput: {
    backgroundColor: COLORS.white,
    color: COLORS.black,
  },
  darkInput: {
    backgroundColor: COLORS.LightText,
    color: COLORS.white,
  },
  lightThemeText: {
    fontSize: 24,
    color: COLORS.LightText,
  },
  darkThemeText: {
    fontSize: 24,
    color: COLORS.DarkText,
  },
  lightContainer: {
    backgroundColor: COLORS.LightBackground,
  },
  darkContainer: {
    backgroundColor: COLORS.DarkBackground,
  },
  lightBody: {
    backgroundColor: COLORS.LightBackground5percent,
  },
  darkBody: {
    backgroundColor: COLORS.DarkBackground5percent,
  },
});
