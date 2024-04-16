import { StyleSheet, Text, View } from "react-native";
import Colors from "../util/Colors";
import { Checkbox } from 'react-native-paper';
import { useEffect } from "react";

function CheckboxContainer({ labels, disable=false, onPress, states }:{labels: Array<string>, disable?: boolean, onPress: Array<any>, states: Array<boolean>}){

  return (
      <View style={styles.container}> 
        {states.map((state, index) => {
          console.log(state)
          return (
            <View style={styles.checkboxContainer}>
              <Checkbox
                key={index}
                status={state === true ? 'checked' : 'unchecked'}
                disabled={disable}
                color={Colors.textAuxSecondary}
                uncheckedColor={Colors.textAuxSecondary}
                onPress={() => onPress[index](!state)}
              />
              <Text style={styles.textContainerPhoto}>{labels[index]}</Text>
            </View>
          )
        })}
      </View>
  )
}

export default CheckboxContainer;

const styles = StyleSheet.create({
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // flexWrap: 'wrap',
  },
  container: {
    flex: 1,
  },
  textContainerPhoto: {
    color: Colors.textAuxSecondary,
    fontFamily: 'roboto-regular',
    fontSize: 14
  },
});