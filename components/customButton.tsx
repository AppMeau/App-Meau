import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../util/Colors";

function CustomButton({ children, backgroundColor, onPress }:{children: string, backgroundColor: string, onPress: any}){

    return (
        <View style={[styles.outerContainer,  {backgroundColor: backgroundColor}]}>
            <Pressable 
                style={({pressed}) => pressed ? [styles.innerContainer, styles.pressed] : styles.innerContainer} 
                onPress={onPress} 
            >
                <Text style={styles.text}>{ children }</Text>
            </Pressable>
        </View>
    )
}

export default CustomButton;

const styles = StyleSheet.create({
    outerContainer: {
        borderRadius: 3,
        overflow: 'hidden',
        width: 232,
        height: 40,
        elevation: 3,
    },
    innerContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    text: {
        color: Colors.textAuxPrimary,
        textAlign: 'center',
        fontFamily: 'roboto-regular'
    },
    pressed: {
        opacity: 0.50
    }
});