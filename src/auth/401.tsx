import Button from "../../components/button";
import { StyleSheet, View, Text } from "react-native";
import Colors from "../../util/Colors";
import { NavigationProp } from "@react-navigation/native";


export default function notAuthorized({navigation}: {navigation: NavigationProp<any>}) {
    return (
        <>
            <View style={{...styles.container, height: '100%'}}>
                <View style={styles.container}>
                    <Text style={styles.h1}>Ops!</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.paragraph}>Você não pode realizar esta ação sem possuir um cadastro</Text>
                    <Button type="positive" mode="contained" onPress={()=>navigation.navigate('/register')}>FAZER CADASTRO</Button>
                </View>
                <View style={styles.container}>
                    <Text style={styles.paragraph}>Já possui um cadastro?</Text>
                    <Button type="positive" mode="contained" onPress={()=>navigation.navigate('/login')}>FAZER LOGIN</Button>
                </View>

            </View>
        </>
    )
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
        gap:12,
        padding: 24,
        backgroundColor: "#fff",
        alignItems: "center",
    },
  });