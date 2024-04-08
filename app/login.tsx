import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ButtonComponent from '../components/button';
import Zocial from '@expo/vector-icons/Zocial'

export default function Page() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <ButtonComponent link='/login' type='positive'>ENTRAR</ButtonComponent>
      <ButtonComponent link='/login' type='google'><View><Zocial name='googleplus' /><Text>ENTRAR COM GOOGLE</Text></View></ButtonComponent>
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