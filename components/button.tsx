import Zocial from "@expo/vector-icons/Zocial";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import { Link } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

import Colors from "../util/Colors";

type componentProps = {
  type: "warn" | "positive" | "google" | "facebook";
  icon?: "googleplus" | "facebook";
  link: string;
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
    <Link style={{ ...styles[props.type], ...styles.button }} href={props.link}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 6,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.icon ? (
          <Zocial style={styles[props.type]} name={props.icon} />
        ) : (
          ""
        )}
        <Text style={styles[props.type]}>{props.children}</Text>
      </View>
    </Link>
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
});
