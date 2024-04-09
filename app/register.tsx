import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/header';
import Colors from '../util/Colors';
import InputComponent from '../components/input';
import { useState } from 'react';
import CustomButton from '../components/customButton';

export default function RegisterComponent() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [adress, setAdress] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState('');

  const registrationHandler = () => {
    console.log('REGISTRADO!');
  }
  
  return (
    <>
        <Header color={Colors.blueSecundary} title='Cadastro Pessoal' search />
        
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.notice}>
                <Text style={styles.textNotice}>As informações preenchidas serão divulgadas 
        apenas para a pessoa com a qual você realizar 
        o processo de adoção e/ou apadrinhamento, 
        após a formalização do processo.</Text>
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.subtitle}>INFORMAÇÕES PESSOAIS</Text>
                <InputComponent lazy rule={(val)=>val!==''} placeholder='Nome Completo' value={name} onChangeText={setName}/>
                <InputComponent lazy rule={(val)=>val!==''} placeholder='Idade' value={age} onChangeText={setAge}/>
                <InputComponent lazy rule={(val)=>val!==''} placeholder='Email' value={email} onChangeText={setEmail}/>
                <InputComponent lazy rule={(val)=>val!==''} placeholder='Estado' value={state} onChangeText={setState}/>
                <InputComponent lazy rule={(val)=>val!==''} placeholder='Cidade' value={city} onChangeText={setCity}/>
                <InputComponent lazy rule={(val)=>val!==''} placeholder='Endereço' value={adress} onChangeText={setAdress}/>
                <InputComponent lazy rule={(val)=>val!==''} placeholder='Telefone' value={phone} onChangeText={setPhone}/>
              <Text style={styles.subtitle}>INFORMAÇÕES DE PERFIL</Text>
                <InputComponent lazy rule={(val)=>val!==''} placeholder='Nome de Usuário' value={user} onChangeText={setUser}/>
                <InputComponent lazy rule={(val)=>val!==''} placeholder='Senha' value={password} onChangeText={setPassword}/>
                <InputComponent lazy rule={(val)=>val!==''} placeholder='Confirmação de Senha' value={password} onChangeText={setPassword}/>
              
              <Text style={styles.subtitle}>FOTO DE PERFIL</Text>

                {/* FOTO !! */}

              <View style={styles.container}>
                <CustomButton backgroundColor={Colors.bluePrimary} onPress={registrationHandler}>FAZER CADASTRO</CustomButton>
              </View>
              
            </View>
          </View>
          
        </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    padding: 16,
    gap: 28
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
  },
  subtitle: {
    color: Colors.blueHighlight,
    paddingHorizontal: 8
  },
  formContainer: {
    width: '100%',
    textAlign: 'left',
    gap: 20,
   
  }
});