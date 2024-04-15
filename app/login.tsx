import { router } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";

import ButtonComponent from "../components/button";
import CustomButton from "../components/customButton";
import Header from "../components/header";
import InputComponent from "../components/input";
import Colors from "../util/Colors";
import { firebase } from "../util/firebase";

export default function Page() {
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");

  const auth = () => {
    const auth = getAuth(firebase);
    signInWithEmailAndPassword(auth, user, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        Alert.alert("logado com sucesso");
        router.replace("/");
      })
      .catch((error): void => {
        if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/invalid-credential"
        ) {
          Alert.alert("Email ou senha invalidos");
        }
      });
  };

  return (
    <>
      <Header bgColor={Colors.blueSecundary} title="Login" />
      <View style={styles.container}>
        <View style={{ flexDirection: "column", gap: 20, marginBottom: 52 }}>
          <InputComponent
            lazy
            rule={(val) => val !== ""}
            placeholder="Usuário"
            value={user}
            onChangeText={setUser}
          />
          <InputComponent
            placeholder="Senha"
            type="password"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={{ marginBottom: 72 }}>
          <CustomButton
            backgroundColor={Colors.bluePrimary}
            onPress={() => {
              auth();
            }}
          >
            ENTRAR
          </CustomButton>
        </View>
        <View style={{ flexDirection: "column", gap: 8 }}>
          <ButtonComponent link="/login" type="google" icon="googleplus">
            ENTRAR COM GOOGLE
          </ButtonComponent>
          <ButtonComponent link="/login" type="facebook" icon="facebook">
            ENTRAR COM FACEBOOK
          </ButtonComponent>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    paddingTop: 64,
    alignItems: "center",
  },
});
