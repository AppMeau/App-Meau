import { StyleSheet, Text, View } from "react-native";
import Colors from "../util/Colors";
import { RadioButton } from 'react-native-paper';
import { useState } from "react";


function RadioContainer({ labels }:{labels: Array<string>}){
  const [checked, setChecked] = useState('1');

  return (
    <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
      <View style={styles.radioButtonContainer}> 
        {labels.map((label, index) => {
          return (
            <>
              <RadioButton 
                key={index}
                value={`${index+1}`}
                color={Colors.textAuxSecondary}
                uncheckedColor={Colors.textAuxSecondary}
              />
              <Text style={styles.textContainerPhoto}>{label}</Text>
            </>
          )
        })}
      </View>
    </RadioButton.Group>
  )
}

export default RadioContainer;

const styles = StyleSheet.create({
  radioButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textContainerPhoto: {
    color: Colors.textAuxSecondary,
    fontFamily: 'roboto-regular',
    fontSize: 14
  },
});