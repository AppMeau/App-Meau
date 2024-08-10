import React, { useEffect } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";

import Buttom from "../../components/button";
import InputComponent from "../../components/input";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { login } from "../../redux/auth";
import { credentialSchema } from "../../schemas/UserRegister/userRegister";
import { NavigationProp } from "@react-navigation/native";
import Button from "../../components/button";

export default function Login({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const dispatch = useAppDispatch();
  const auth = async () => {
    try {
      dispatch(login(credentialSchema.parse({ email: user, password }))).then(
        (res) => {
          if (res.payload) {
            navigation.navigate("inicio");
          } else {
            Alert.alert("Erro", "Usuário ou senha inválidos");
          }
        }
      );
    } catch (e) {
      Alert.alert("Erro", "Usuário ou senha inválidos");
    }
  };
  // useEffect(() => {
  //   dispatch(registerForPushNotificationsThunk());
  // }, []);

  return (
    <>
      {/* <Header
        color={Colors.blueSecundary}
        title="Login"
        onDrawerClick={() => {}}
      /> */}
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "column",
            gap: 20,
            marginBottom: 52,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
          <Button
            type="transparent"
            mode="text"
            onPress={() => navigation.navigate("register")}
          >
            Cadastre-se aqui
          </Button>
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
