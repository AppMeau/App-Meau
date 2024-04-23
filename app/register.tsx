import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header, { headerSize } from '../components/header';
import Colors from '../util/Colors';
import InputComponent from '../components/input';
import { useState } from 'react';
import CustomButton from '../components/customButton';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc } from "firebase/firestore";
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import { db, firebase } from '../util/firebase';
import imageHandler from '../util/functions/ImageHandler';

export default function Register() {
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [adress, setAdress] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const handleSubmit = async () => {

    const url = await imageHandler('images/users/', photoUrl, name);

    const docData = {
      name: name,
      age: age,
      email: email,
      state: state,
      city: city,
      adress: adress,
      phone: phone,
      user: user,
      password: password,
      photo: url,
    }
    try {
      const auth = getAuth(firebase);
      const newUser = await createUserWithEmailAndPassword(auth, email, password)
      if(newUser){
        await addDoc(collection(db, "users"), {...docData, uid: newUser.user.uid});
      }
      console.log("antes")
      router.navigate('/login');
      console.log("depois")
    
    }catch(e){
      console.log(e)
    }

    router.navigate('/login');
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUrl(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };
  
  return (
    <View style={{flex:1}}>
        
        <ScrollView>
          <View style={[styles.container, {paddingTop: insets.top+headerSize}]}>
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
                <InputComponent lazy type='password' rule={(val)=>val!==''} placeholder='Senha' value={password} onChangeText={setPassword}/>
                <InputComponent lazy type='password' rule={(val)=>val===password} placeholder='Confirmação de Senha' value={passwordConfirmation} onChangeText={setPasswordConfirmation}/>
              
              <Text style={styles.subtitle}>FOTO DE PERFIL</Text>

              <View style={styles.container}>
                <Pressable onPress={pickImageAsync}>
                  <View style={styles.containerPhoto}>
                    {photoUrl !== null ? (
                      <Image source={{uri: photoUrl}} style={styles.img}/>
                    ):(
                      <>
                        <MaterialIcons name='control-point' size={24} color={Colors.textAuxSecondary} />
                        <Text style={styles.textContainerPhoto} >Adicionar foto</Text>
                      </>
                    )}
                  </View>
                </Pressable>
                
                <CustomButton backgroundColor={Colors.bluePrimary} onPress={handleSubmit}>FAZER CADASTRO</CustomButton>
              </View>
              
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
   
  },
  containerPhoto: {
    width: 128,
    height: 128,
    backgroundColor: Colors.grey2,
    borderWidth: 2,
    borderColor: Colors.grey2,
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
    width: 128,
    height: 128,
  }
});