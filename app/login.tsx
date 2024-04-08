import { StyleSheet, Text, View } from 'react-native';
import ButtonComponent from '../components/button';
import InputComponent from '../components/input';
import React from 'react';

export default function Page() {
  const [text, onChangeText] = React.useState('')

  return (
    <View style={styles.container}>
      <InputComponent placeholder='Usuario' value='text' onChangeText={onChangeText}/>
      <Text>Open up App.tsx to start working on your app!</Text>
      <View style={{flexDirection: 'column', gap: 8}}>
        <ButtonComponent link='/login' type='positive'>ENTRAR</ButtonComponent>
        <ButtonComponent link='/login' type='google'>ENTRAR COM GOOGLE</ButtonComponent>
        <ButtonComponent link='/login' type='facebook'>ENTRAR COM FACEBOOK</ButtonComponent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    alignItems: 'center',
    justifyContent: 'center',
  },
});