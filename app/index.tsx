import { Courgette_400Regular } from "@expo-google-fonts/courgette";
import { useFonts } from "expo-font";
import { Link, router } from "expo-router";
import { getAuth } from "firebase/auth";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ButtonComponent from "../components/button";
import Colors from "../util/Colors";
import { db, firebase } from "../util/firebase";
import { useEffect } from "react";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";

export default function App() {
  const auth = getAuth(firebase);
  const [fontsLoaded] = useFonts({
    Courgette_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View style={[styles.container, {height: "100%"}]}>
        <View style={{ 
          justifyContent: "space-between", 
          flexDirection: 'column', 
          display: 'flex', 
          height: '100%', 
          paddingBottom: 48
        }}>
          <View style={{gap: 48}}>
            <View
              style={[
                styles.container,
                {
                  paddingHorizontal: 36,
                  paddingTop: 20,
                  // paddingBottom: 48,
                  gap: 52,
                },
              ]}
            >
              <Text style={styles.h1}>Olá!</Text>
              <Text style={styles.paragraph}>
                Bem vindo ao Meau! {"\n"}
                Aqui você pode adotar, doar e ajudar cães e gatos com facilidade.
                {"\n"}
                {"\n"}
                Qual o seu interesse?
              </Text>
            </View>
            <View style={{gap: 48}}>
              <View style={{ gap: 12, alignItems: "center" }}>
                <ButtonComponent type="warn" link="/register">
                  ADOTAR
                </ButtonComponent>
                <ButtonComponent type="warn" link="/register">
                  AJUDAR
                </ButtonComponent>
                <ButtonComponent type="warn" link="/animalRegister">
                  CADASTRAR ANIMAL
                </ButtonComponent>
              </View>
              <View style={{ alignItems: "center" }}>
                {auth.currentUser ? (
                  <Button
                    onPress={async () => {
                      await auth.signOut();
                      router.navigate("/login");
                    }}
                  >
                    logout
                  </Button>
                ) : (
                  <Link
                    style={{ color: Colors.bluePrimary, fontSize: 16 }}
                    href="/login"
                  >
                    login
                  </Link>
                )}
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/logo.png")}
              style={{ width: 122, height: 44 }}
            />
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 72,
    color: Colors.yellowPrimary,
    fontFamily: "Courgette_400Regular",
  },
  paragraph: {
    color: Colors.textAuxSecondary,
    textAlign: "center",
    fontSize: 16,
  },
  container: {
    padding: 12,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
