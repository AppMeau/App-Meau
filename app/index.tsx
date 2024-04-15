import { useFonts } from "expo-font";
import { Link, Stack, router } from "expo-router";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";

import Header from "../components/header";
import Colors from "../util/Colors";
import { redirect } from "../util/functions";

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
      <Stack.Screen options={{ header: () => <Header /> }} />
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
            <Button
              mode="contained-tonal"
              onPress={() => {
                redirect("login");
              }}
            >
              ADOTAR
            </Button>
            <Button
              mode="contained-tonal"
              onPress={() => {
                redirect("login");
              }}
            >
              AJUDAR
            </Button>
            <Button
              mode="contained-tonal"
              onPress={() => {
                redirect("login");
              }}
            >
              CADASTRAR ANIMAL
            </Button>
          </View>
        </View>
        <View style={{ alignItems: "center", paddingBottom: 68 }}>
          <Button onPress={() => redirect("login")}>login</Button>
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
    flex: 1,
    padding: 12,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
