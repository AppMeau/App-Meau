import React from "react";
import { StyleSheet, View } from "react-native";

import ButtonComponent from "../components/button";
import CustomButton from "../components/customButton";
import InputComponent from "../components/input";
import Colors from "../util/Colors";
// import { firebase } from "../util/firebase";
import { login } from "../redux/auth";
import { credentialSchema } from "../schemas/UserRegister/userRegister";
import { useAppDispatch } from "../redux/store";

export default function Page() {
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useAppDispatch()

  const auth = () => {
    dispatch(login(credentialSchema.parse({email: user, password})))
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
