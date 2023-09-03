import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import Home from "./src/screens/Home";
import ChosenTask from "./src/screens/ChosenTask";

const Stack = createNativeStackNavigator();

export default function App() {
  // globalstate menagment
  const [toDoList, setToDoList] = useState([
    { id: 0, task: "task1", isDone: false },
    { id: 1, task: "task1232323", isDone: true },
  ]);
  const [task, setTask] = useState("");
  const [chosenTask, setChosenTask] = useState("");
  const [isSelected, setSelection] = useState(false);

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

  // navigation
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' options={{ headerShown: false }}>
          {(props) => <Home {...props} GlobalState={GlobalState} />}
        </Stack.Screen>
        <Stack.Screen name='ChosenTask' options={{ headerShown: false }}>
          {(props) => <ChosenTask {...props} GlobalState={GlobalState} />}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}
