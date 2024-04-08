import { TextInput, StyleSheet } from 'react-native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import React from 'react';


type props = {placeholder: string, value: string, onChangeText: React.Dispatch<React.SetStateAction<string>>}


export default function InputComponent(props: props) {
    let [fontsLoaded, fontError] = useFonts({
        Roboto_400Regular,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }
  return (
    <TextInput
        style={styles.input}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
    />
  );
}


const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: '100%'
    },
  });