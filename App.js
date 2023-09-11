import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";

import Home from "./src/screens/Home";
import ChosenTask from "./src/screens/ChosenTask";
import LoginPage from "./src/screens/LoginPage";
import { FIREBASE_AUTH } from "./Firebase";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";

const Stack = createNativeStackNavigator();

export default function App() {
  // globalstate menagment
  const [toDoList, setToDoList] = useState([
    { id: 0, task: "task1", isDone: false },
    {
      id: 1,
      task: "task1232323 12312 314 12 41 24 d fsadf jhnfd snjajkndf jnfs dj",
      isDone: true,
    },
  ]);
  const [task, setTask] = useState("");
  const [chosenTask, setChosenTask] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "817066145188-qtsvl8hrtf5fts24r5inpcnpgjaqr3hl.apps.googleusercontent.com",
    iosClientId:
      "817066145188-i17e5rc6k5eigianhnluti15tgdllvov.apps.googleusercontent.com",
    androidClientId:
      "817066145188-p4304pracke9a2c3k2a7ck4ihgkutqig.apps.googleusercontent.com",
    redirectUri: makeRedirectUri({
      scheme: "todo-umpa",
    }),
  });

  const GlobalState = {
    toDoList,
    setToDoList,
    task,
    setTask,
    chosenTask,
    setChosenTask,
    isSelected,
    setSelection,
  };

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(FIREBASE_AUTH, credential);
    }
  }, [response]);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  });

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
