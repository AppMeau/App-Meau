import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View, Image } from "react-native";

import ButtonComponent from "../components/button";
import Colors from "../util/Colors";
import { Button } from "react-native-paper";
import Header from "../components/header";

export default function App() {
  const [fontsLoaded] = useFonts({
    "roboto-regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "roboto-medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "courgette-regular": require("../assets/fonts/Courgette-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => <Header bgColor="red" />,
        }}
      />
      {/* <Link href="/login">Login</Link>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" /> */}
      {/* <RegisterComponent /> */}
      {/* <View style={{ width: "100%", alignItems: "flex-start" }}>
        <Ionicons name="menu" size={24} color={Colors.bluePrimary} />
      </View> */}
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
        <View style={{ alignItems: "center", paddingBottom: 44 }}>
          <View style={{ gap: 12, width: 232 }}>
            <Button mode="contained-tonal">ADOTAR</Button>
            <Button mode="contained-tonal">AJUDAR</Button>
            <Button mode="contained-tonal">CADASTRAR ANIMAL</Button>
          </View>
        </View>
        <View style={{ alignItems: "center", paddingBottom: 68 }}>
          <Link
            style={{ color: Colors.bluePrimary, fontSize: 16 }}
            href="/login"
          >
            login
          </Link>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/logo.png")}
            style={{ width: 122, height: 44 }}
          />
        </View>
      </View>
    </View>
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
