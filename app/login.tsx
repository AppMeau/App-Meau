import { StyleSheet, Text, View } from 'react-native';
import ButtonComponent from '../components/button';
import InputComponent from '../components/input';
import React from 'react';

export default function Page() {
  const [user, setUser] = React.useState('')
  const [password, setPassword] = React.useState('')

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'column', gap: 20, marginBottom: 52}}>
        <InputComponent lazy rule={(val)=>val!==''} placeholder='Usuário' value={user} onChangeText={setUser}/>
        <InputComponent placeholder='Senha' type='password' value={password} onChangeText={setPassword}/>
      </View>
      
      <View style={{marginBottom:72}}>
        <ButtonComponent link='/login' type='positive'>ENTRAR</ButtonComponent>
      </View>
      <View style={{flexDirection: 'column', gap: 8}}>
        <ButtonComponent link='/login' type='google' icon='googleplus'>ENTRAR COM GOOGLE</ButtonComponent>
        <ButtonComponent link='/login' type='facebook' icon='facebook'>ENTRAR COM FACEBOOK</ButtonComponent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',

    alignItems: 'center',
    justifyContent: 'center',
  },
});