import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

import Colors from "../util/Colors";

function RadioContainer({
  labels,
  state,
  onPress,
  disable,
}: {
  labels: string[];
  state: string;
  onPress: any;
  disable?: boolean;
}) {
  useFonts({
    Roboto_400Regular,
  });
  return (
    <RadioButton.Group
      onValueChange={(newValue) => onPress(newValue)}
      value={state}
    >
      <View style={styles.container}>
        {labels.map((label, index) => {
          return (
            <View key={index} style={styles.radioButtonContainer}>
              <RadioButton
                value={label}
                color={Colors.textAuxSecondary}
                uncheckedColor={Colors.textAuxSecondary}
                disabled={disable}
              />
              <Text style={styles.textContainerPhoto}>{label}</Text>
            </View>
          );
        })}
      </View>
    </RadioButton.Group>
  );
}

export default RadioContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainerPhoto: {
    color: Colors.textAuxSecondary,
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
  },
});
