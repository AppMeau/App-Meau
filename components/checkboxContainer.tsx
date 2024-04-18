import { StyleSheet, Text, View } from "react-native";
import Colors from "../util/Colors";
import { Checkbox } from "react-native-paper";
import { useEffect } from "react";

function CheckboxContainer({
  labels,
  disable = false,
  onPress,
  states,
}: {
  labels: Array<string>;
  disable?: boolean;
  onPress: Array<any>;
  states: Array<boolean>;
}) {
  return (
    <View style={styles.container}>
      {states.map((state, index) => {
        return (
          <View style={styles.checkboxContainer}>
            <Checkbox
              key={index}
              status={state === true ? "checked" : "unchecked"}
              disabled={disable}
              color={Colors.textAuxSecondary}
              uncheckedColor={Colors.textAuxSecondary}
              onPress={() => onPress[index](!state)}
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
    fontFamily: "roboto-regular",
    fontSize: 14,
  },
});
