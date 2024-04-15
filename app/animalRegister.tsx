import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/header';
import Colors from '../util/Colors';
import InputComponent from '../components/input';
import { useState } from 'react';
import CustomButton from '../components/customButton';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { RadioButton } from 'react-native-paper';
import { RadioButtonContext } from 'react-native-paper/lib/typescript/components/RadioButton/RadioButtonGroup';
import RadioContainer from '../components/radioContainer';

export default function AnimalRegister() {

  const [goal, setGoal] = useState('Adoção');
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');
  const [age, setAge] = useState('');
  const [personality, setPersonality] = useState('');
  const [health, setHealth] = useState('');
  const [requirement, setRequirement] = useState('');
  const [about, setAbout] = useState('');
  const [photo, setPhoto] = useState<null | string>(null);
  const [checked, setChecked] = useState('first');
  const handleSubmit = async () => {
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    
    // formData.append('photo', {uri: photo, name: 'image.jpg', type: 'image/jpeg'})
    router.replace('/login')
    
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };
  
  return (
    <View style={{flex:1}}>
        <Header color={Colors.yellowPrimary} title='Cadastro Pessoal' />
        <ScrollView>
          <View style={styles.container}>            
            <View style={styles.formContainer}>

              <Text>Tenho interesse em cadastrar o animal para:</Text>
              <View style={styles.buttonsContainer}>
                <CustomButton backgroundColor={Colors.yellowPrimary} onPress={setGoal}>ADOÇÃO</CustomButton>
                <CustomButton backgroundColor='white' onPress={setGoal}>APADRINHAR</CustomButton>
                <CustomButton backgroundColor='white' onPress={setGoal}>AJUDA</CustomButton>
              </View>

              <Text>Adoção</Text>

              <Text style={styles.subtitle}>NOME DO ANIMAL</Text>
              <InputComponent lazy rule={(val)=>val!==''} placeholder='Nome do animal' value={name} onChangeText={setName}/>
                
              <Text style={styles.subtitle}>FOTOS DO ANIMAL</Text>

              <View style={styles.container}>
                <Pressable onPress={pickImageAsync}>
                  <View style={styles.containerPhoto}>
                    {photo !== null ? (
                      <Image source={{uri: photo}} style={styles.img}/>
                    ):(
                      <>
                        <MaterialIcons name='control-point' size={24} color={Colors.textAuxSecondary} />
                        <Text style={styles.textContainerPhoto} >Adicionar foto</Text>
                      </>
                    )}
                  </View>
                </Pressable>
                
              </View>
              
              <Text style={styles.subtitle}>ESPÉCIE</Text>
              <RadioContainer labels={['Cachorro', 'Gato']} />
              
              <Text style={styles.subtitle}>SEXO</Text>
              <RadioContainer labels={['Macho', 'Fêmea']} />
              
              <Text style={styles.subtitle}>PORTE</Text>
              <RadioContainer labels={['Pequeno', 'Médio', 'Grande']} />

              <Text style={styles.subtitle}>IDADE</Text>
              <RadioContainer labels={['Filhote', 'Adulto', 'Idoso']} />
 
              <Text style={styles.subtitle}>TEMPERAMENTO</Text>
              <Text style={styles.subtitle}>SAÚDE</Text>
              <Text style={styles.subtitle}>EXIGÊNCIAS PARA ADOÇÃO</Text>
              <Text style={styles.subtitle}>SOBRE O ANIMAL</Text>
              
              <CustomButton backgroundColor={Colors.yellowPrimary} onPress={handleSubmit}>COLOCAR PARA ADOÇÃO</CustomButton>
            </View>
          </View>
          
        </ScrollView>
    </View>
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
  buttonsContainer: {
    flexDirection: 'row',
    flex: 1
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
    color: Colors.yellowSecondary,
    paddingHorizontal: 8
  },
  formContainer: {
    width: '100%',
    textAlign: 'left',
    gap: 20,
   
  },
  containerPhoto: {
    width: 312,
    height: 128,
    backgroundColor: Colors.grey5,
    borderWidth: 2,
    borderColor: Colors.grey5,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  textContainerPhoto: {
    color: Colors.textAuxSecondary,
    fontFamily: 'roboto-regular',
    fontSize: 14
  },
  img: {
    width: 312,
    height: 128,
  },
  radioButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
});