import { Redirect, router } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";

import Buttom from "../../components/button";
import InputComponent from "../../components/input";
import Colors from "../../util/Colors";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { login } from "../../redux/auth";
import { credentialSchema } from "../../schemas/UserRegister/userRegister";

export default function Page() {
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const dispatch = useAppDispatch()
  const auth = async () => {
    try{
      dispatch(login(credentialSchema.parse({ email: user, password }))).then((res) => {
        if (res.payload) {
          router.navigate("/");
        } else {
          Alert.alert("Erro", "Usuário ou senha inválidos");
        }
      });
    } catch (e) {
      Alert.alert("Erro", "Usuário ou senha inválidos");
    }
  };

  return (
    <>
      {/* <Header
        color={Colors.blueSecundary}
        title="Login"
        onDrawerClick={() => {}}
      /> */}
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
          <Buttom
            mode="contained"
            type="positive"
            loading={isLoading}
            onPress={() => {
              auth();
            }}
          >
            ENTRAR
          </Buttom>
        </View>
        <View style={{ flexDirection: "column", gap: 8 }}>
          <Buttom mode="contained" type="google" icon="googleplus">
            ENTRAR COM GOOGLE
          </Buttom>
          <Buttom mode="contained" type="facebook" icon="facebook">
            ENTRAR COM FACEBOOK
          </Buttom>
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
