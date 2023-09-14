import { StyleSheet, Text, View, Pressable } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { doc, deleteDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../Firebase";
import { COLORS } from "../../Colors";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function ChosenTask({ navigation, GlobalState }) {
  const { chosenTask, uid } = GlobalState;

  const deleteItemAndReturn = (id) => {
    deleteDoc(doc(FIREBASE_DB, "users/" + uid + "/todos", id));
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <Text
          style={chosenTask.item.isDone ? styles.doneTask : styles.taskText}
        >
          {chosenTask.item.task}
        </Text>
      </View>
      <Pressable
        onPress={() => deleteItemAndReturn(chosenTask.id)}
        style={styles.deleteItem}
      >
        <FontAwesome name='trash' size={50} color={COLORS.trash} />
      </Pressable>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 8,
    width: "100%",
    alignItems: "flex-start",
    backgroundColor: COLORS.backgroundDarker,
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  taskText: {
    fontSize: 24,
    color: COLORS.text,
  },
  deleteItem: {
    zIndex: 1,
    position: "absolute",
    bottom: 45,
    right: 20,
    backgroundColor: COLORS.background,
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
    color: COLORS.button,
    fontSize: 24,
  },
});
