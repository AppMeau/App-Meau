import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import { useFonts } from "expo-font";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Colors from "../util/Colors";
import { ActivityIndicator, Button } from "react-native-paper";

function CustomButton({
  children,
  backgroundColor,
  onPress,
  loading,
}: {
  children: string;
  backgroundColor: string;
  onPress: any;
  loading?: boolean;
}) {
  useFonts({
    Roboto_400Regular,
  });
  return (
    <View style={[styles.outerContainer, { backgroundColor }]}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.innerContainer, styles.pressed]
            : styles.innerContainer
        }
        onPress={onPress}
      >
      {loading ? <ActivityIndicator color= {Colors.textAuxPrimary}/> : <Text style={styles.text}>{children}</Text>} 
      </Pressable>
    </View>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 3,
    overflow: "hidden",
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
    textAlign: "center",
    fontFamily: "Roboto_400Regular",
  },
  pressed: {
    opacity: 0.5,
  },
});
