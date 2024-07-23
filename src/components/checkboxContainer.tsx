import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";

import Colors from "../util/Colors";

function CheckboxContainer({
  labels,
  disable = false,
  onPress,
  keys,
  states,
}: {
  labels: string[];
  disable?: boolean;
  onPress: any;
  keys: string[];
  states: boolean[];
}) {
  useFonts({
    Roboto_400Regular,
  });
  return (
    <View style={styles.container}>
      {states.map((state, index) => {
        return (
          <View key={index} style={styles.checkboxContainer}>
            <Checkbox
              status={state === true ? "checked" : "unchecked"}
              disabled={disable}
              color={Colors.textAuxSecondary}
              uncheckedColor={Colors.textAuxSecondary}
              onPress={() => onPress(keys[index], !state)}
            />
            <Text style={styles.textContainerPhoto}>{labels[index]}</Text>
          </View>
        );
      })}
    </View>
  );
}

export default CheckboxContainer;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  textContainerPhoto: {
    color: Colors.textAuxSecondary,
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
  },
});
