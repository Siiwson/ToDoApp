import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import Home from "./src/screens/Home";
import ChosenTask from "./src/screens/ChosenTask";
import LoginPage from "./src/screens/LoginPage";
import { FIREBASE_AUTH, FIREBASE_DB } from "./Firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const Stack = createNativeStackNavigator();

export default function App() {
  //Globalstate menagment
  const [toDoList, setToDoList] = useState([]);
  const [task, setTask] = useState("");
  const [chosenTask, setChosenTask] = useState("");
  const [user, setUser] = useState(null);
  const [uid, setUID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [accesToken, setAccesToken] = useState(null);

  //Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "817066145188-qtsvl8hrtf5fts24r5inpcnpgjaqr3hl.apps.googleusercontent.com",
    iosClientId:
      "817066145188-i17e5rc6k5eigianhnluti15tgdllvov.apps.googleusercontent.com",
    androidClientId:
      "817066145188-p4304pracke9a2c3k2a7ck4ihgkutqig.apps.googleusercontent.com",
    redirectUri: makeRedirectUri({
      native: "com.siiwson.todoumpa",
    }),
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      setAccesToken(response.authentication.accessToken);
      signInWithCredential(FIREBASE_AUTH, credential);
    }
  }, [response]);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      if (user) {
        setUID(user.uid);
      }
    });
  });

  const q = query(
    collection(FIREBASE_DB, "users/" + uid + "/todos"),
    orderBy("timestamp", "asc")
  );

  //Read task from firebase
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setToDoList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          item: doc.data(),
        }))
      );
    });
    console.log(uid); //display actual user id
  }, [task, loading]);

  //Global state
  const GlobalState = {
    toDoList,
    setToDoList,
    task,
    setTask,
    chosenTask,
    setChosenTask,
    user,
    setUser,
    uid,
    setUID,
    loading,
    setLoading,
  };

  // navigation
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name='Home' options={{ headerShown: false }}>
            {(props) => <Home {...props} GlobalState={GlobalState} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name='LoginPage' options={{ headerShown: false }}>
            {(props) => (
              <LoginPage
                {...props}
                GlobalState={GlobalState}
                promptAsync={promptAsync}
              />
            )}
          </Stack.Screen>
        )}
        <Stack.Screen name='ChosenTask' options={{ headerShown: false }}>
          {(props) => <ChosenTask {...props} GlobalState={GlobalState} />}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}
