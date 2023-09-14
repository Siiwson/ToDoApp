import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

import AntDesign from "react-native-vector-icons/AntDesign";

import Header from "../Components/Header";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../Firebase";
import { setDoc, doc } from "firebase/firestore";
import { COLORS } from "../../Colors";

export default function LoginPage({ GlobalState, promptAsync }) {
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = FIREBASE_AUTH;
  const { setLoading, setUID } = GlobalState;

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  const handleSingUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(() => {
        const userUID = auth.currentUser;
        setDoc(doc(FIREBASE_DB, "users", userUID.uid), {
          text: "Welcome",
        });
        setUID(userUID);
      });
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Header />
      <View style={styles.body}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, themeInputStyle]}
            placeholder='E-mail'
            placeholderTextColor={themeTextStyle}
            autoCapitalize='none'
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={[styles.input, themeInputStyle]}
            placeholder='Password'
            placeholderTextColor={themeTextStyle}
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <Pressable
            style={[styles.button, themeButtonStyle]}
            onPress={handleSignIn}
          >
            <Text style={[styles.textButton, themeTextStyle]}>Login</Text>
          </Pressable>
          <Pressable
            style={[styles.button, themeButtonStyle]}
            onPress={handleSingUp}
          >
            <Text style={[styles.textButton, themeTextStyle]}>
              Create account
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonGoogle, themeButtonStyle]}
            onPress={() => promptAsync()}
          >
            <AntDesign
              name='google'
              size={24}
              color={
                colorScheme == "light" ? COLORS.LightText : COLORS.DarkText
              }
            />
            <Text style={[styles.textButton, themeTextStyle]}>
              Sign in with Google!
            </Text>
          </Pressable>
        </View>
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
    flex: 3,
    width: "100%",
  },
  inputContainer: {
    alignItems: "center",
  },
  input: {
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    width: "70%",
  },
  button: {
    padding: 12,
    marginTop: 15,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    alignItems: "center",
    minWidth: 120,
  },
  buttonGoogle: {
    flexDirection: "row",
  },
  textButton: {
    fontWeight: 600,
    fontSize: 18,
    paddingHorizontal: 10,
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
    color: COLORS.LightText,
  },
  darkThemeText: {
    color: COLORS.DarkText,
  },
  lightButton: {
    backgroundColor: COLORS.lightButton,
  },
  darkButton: {
    backgroundColor: COLORS.darkButton,
  },
  lightContainer: {
    backgroundColor: COLORS.LightBackground,
  },
  darkContainer: {
    backgroundColor: COLORS.DarkBackground,
  },
});
