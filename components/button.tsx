import Zocial from "@expo/vector-icons/Zocial";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
// import { Link } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { Button } from 'react-native-paper';


import Colors from "../util/Colors";
import { transparent } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

type componentProps = {
  type: "warn" | "positive" | "google" | "facebook" | "transparent";
  icon?: string;
  onPress: () => void;
  mode: "text" | "outlined" | "contained" | "elevated" | "contained-tonal" | undefined;
  loading?: boolean;
  children: string | JSX.Element | JSX.Element[];
};
export default function ButtonComponent(props: componentProps) {
  const [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <Button style={{ ...styles[props.type], ...styles.button }} onPress={props.onPress} mode={props.mode} loading={props.loading}>
        <Text style={styles[props.type]}>{props.children}</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 232,
    display: "flex",
    height: 40,
    borderRadius: 2,
    fontSize: 12,
    textAlign: "center",
    textAlignVertical: "center",
    alignContent: "center",
    justifyContent: "center",
    fontFamily: "Roboto_400Regular",
  },
  warn: {
    backgroundColor: Colors.yellowPrimary,
    color: Colors.textAuxPrimary,
  },
  positive: {
    backgroundColor: Colors.bluePrimary,
    color: Colors.textAuxPrimary,
  },
  google: {
    backgroundColor: Colors.google,
    color: Colors.grey1,
  },
  facebook: {
    backgroundColor: Colors.facebook,
    color: Colors.grey1,
  },
  transparent: {}
});
