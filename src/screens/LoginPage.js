import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

import Header from "../Components/Header";
import { FIREBASE_AUTH } from "../../Firebase";

export default function LoginPage({ navigation, GlobalState }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      //navigation.navigate("Home");
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  const handleSingUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      //navigation.navigate("Home");
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='E-mail'
            autoCapitalize='none'
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <Pressable style={styles.button} onPress={handleSignIn}>
            <Text style={{ fontWeight: 600, fontSize: 20 }}>Login</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleSingUp}>
            <Text style={{ fontWeight: 600, fontSize: 20 }}>
              Create account
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
    backgroundColor: "#ededed",
  },
  body: {
    flex: 3,
    width: "100%",
  },
  inputContainer: {
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    width: "50%",
  },
  button: {
    backgroundColor: "#4f87e8",
    color: "white",
    padding: 12,
    marginTop: 15,
    borderRadius: 10,
    shadowColor: "#000",
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
});
