
import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Button from "../../components/customButton";


import Colors from "../../util/Colors";
export default function AdoptionFinalScreen({navigation}: any){

  const navigateToHomePage = () => {
    navigation.navigate('inicio')
  }
  
  return (
    <SafeAreaProvider>
      <View style={[styles.container, { height: "100%" }]}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "column",
            display: "flex",
            height: "100%",
            paddingBottom: 48,
          }}
        >
          <View style={{ gap: 48 }}>
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
            <Text style={styles.h1}>Oba!</Text>
            <Text style={styles.paragraph}>
            Ficamos muito felizes com o sucesso
            do seu processo! Esperamos que o
            bichinho esteja curtindo muito essa
            nova experiência!
            {"\n"}
            </Text>
            <Button
                backgroundColor={Colors.bluePrimary}
                width={180}
                onPress={navigateToHomePage}
            >
                VOLTAR AO MENU
            </Button>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 72,
    color: Colors.bluePrimary,
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
