import { StyleSheet, Text, View } from "react-native";
import Colors from "../util/Colors";
import { Checkbox } from 'react-native-paper';
import { useState } from "react";


function CheckboxContainer({ labels, disable=false, onPress, states }:{labels: Array<string>, disable?: boolean, onPress: Array<any>, states: Array<boolean>}){

  console.log(states)
  return (
      <View style={styles.checkboxContainer}> 
        {labels.map((label, index) => {
          return (
            <>
              <Checkbox
                key={index}
                status={states[index] === true ? 'checked' : 'unchecked'}
                disabled={disable}
                onPress={onPress[index]}
              />
              <Text style={styles.textContainerPhoto}>{label}</Text>
            </>
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
    flexWrap: 'wrap'
  },
  textContainerPhoto: {
    color: Colors.textAuxSecondary,
    fontFamily: 'roboto-regular',
    fontSize: 14
  },
});