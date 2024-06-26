import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { Link, router } from "expo-router";
import Colors from "../util/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import ButtonComponent from "../components/button";
import {
  useSafeAreaInsets,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { headerSize } from "../components/header";
import { getAuth } from "firebase/auth";
import { firebase } from "../util/firebase";
import { Button } from "react-native-paper";

export default function App() {
  const insets = useSafeAreaInsets();
  const auth = getAuth(firebase);
  let [fontsLoaded] = useFonts({
    "roboto-regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "roboto-medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "courgette-regular": require("../assets/fonts/Courgette-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View style={[styles.container, { paddingTop: insets.top + headerSize }]}>
        {/* <Link href="/login">Login</Link>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" /> */}
        {/* <RegisterComponent /> */}
        <View style={{ justifyContent: "center" }}>
          <View
            style={[
              styles.container,
              {
                paddingHorizontal: 36,
                paddingTop: 20,
                paddingBottom: 48,
                gap: 52,
              },
            ]}
          >
            <Text style={styles.h1}>Olá!</Text>
            <Text style={styles.paragraph}>
              Bem vindo ao Meau! {"\n"}
              Aqui você pode adotar, doar e ajudar cães e gatos com facilidade.
              {"\n"}
              Qual o seu interesse?
            </Text>
          </View>
          <View style={{ gap: 12, alignItems: "center", paddingBottom: 44 }}>
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
          <View style={{ alignItems: "center", paddingBottom: 68 }}>
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
    fontFamily: "courgette-regular",
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
