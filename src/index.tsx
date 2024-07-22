import { Courgette_400Regular } from "@expo-google-fonts/courgette";
import { useFonts } from "expo-font";
import { StyleSheet, Text, View, Image } from "react-native";
import Button from "../components/button";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Colors from "../util/Colors";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { logout } from "../redux/auth";
// import redirect from "../util/functions/redirect";

import { NavigationProp } from "@react-navigation/native";

export default function App({navigation}: {navigation: NavigationProp<any>}) {
  const dispatch = useAppDispatch()
  const isLogged = useAppSelector((state) => state.auth.status);
  const [fontsLoaded] = useFonts({
    Courgette_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const signout = async () => {
    dispatch(logout()).then(()=>{
      navigation.navigate("inicio")
    })
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
                <Button type="warn" mode="contained" onPress={()=>navigation.navigate("register")} loading={false}>
                  ADOTAR
                </Button>
                <Button type="warn" mode="contained" onPress={()=>navigation.navigate("animalRegister")}  loading={false}>
                  CADASTRAR ANIMAL
                </Button>
              </View>
              <View style={{ alignItems: "center" }}>
                {isLogged ? (
                  <Button
                    type="transparent"
                    mode="text"
                    onPress={async () => {
                      signout()
                    }}
                  >
                    logout
                  </Button>
                ) : (
                  <Button
                    type="transparent"
                    mode="text"
                    onPress={() => navigation.navigate("login")}
                  >
                    login
                  </Button>
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
