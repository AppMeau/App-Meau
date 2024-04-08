import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/header';
import Colors from '../util/Colors';

export default function RegisterComponent() {
  return (
    <>
        <Header color={Colors.blueSecundary} title='Cadastro Pessoal' />
        <View style={styles.container}>

        <View style={styles.notice}>
            <Text style={styles.textNotice}>As informações preenchidas serão divulgadas 
    apenas para a pessoa com a qual você realizar 
    o processo de adoção e/ou apadrinhamento, 
    após a formalização do processo.</Text>
        </View>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    padding: 16
  },
  notice: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.blueSecundary,
    borderWidth: 4,
    borderColor: Colors.blueSecundary,
    padding: 8
  },
  textNotice: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.textAuxPrimary,
    fontFamily: 'roboto-regular'
  }
});