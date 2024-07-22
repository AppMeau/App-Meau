import Button from "../../components/button";
import { router } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import Colors from "../../util/Colors";


export default function notAuthorized() {
    return (
        <>
            <View style={{...styles.container, height: '100%'}}>
                <View style={styles.container}>
                    <Text style={styles.h1}>Ops!</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.paragraph}>Você não pode realizar esta ação sem possuir um cadastro</Text>
                    <Button type="positive" mode="contained" onPress={()=>router.navigate('/register')}>FAZER CADASTRO</Button>
                </View>
                <View style={styles.container}>
                    <Text style={styles.paragraph}>Já possui um cadastro?</Text>
                    <Button type="positive" mode="contained" onPress={()=>router.navigate('/login')}>FAZER LOGIN</Button>
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