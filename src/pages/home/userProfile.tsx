import { Image, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import Colors from "../../util/Colors";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { createRoom } from "../../redux/chat";
import { selectUser } from "../../redux/auth";
import { unwrapResult } from "@reduxjs/toolkit";
import { PetRegisterType } from "../../schemas/PetRegister/petRegisterTypes";
import { removeInterested } from "../../redux/pets";
import Button from "../../components/customButton";
import { ScrollView } from "react-native-gesture-handler";

export default function UserProfile({navigation, route}: any) {
  const dispatch = useAppDispatch();

  const {uid, photo, name, notification_token} = useAppSelector(selectUser)

  const targetUser = route.params.user 
  const pet: PetRegisterType = route.params.pet

  const createChat = async () => {
    try{
      const result = await dispatch(createRoom({members: [{id: targetUser.uid, name: targetUser.name, avatar: targetUser.photo, token: targetUser.notification_token}, {id: uid, avatar: photo, name, token: notification_token}], pet: {id:pet.id, name: pet.name} as {id: string, name: string}}))
      setOriginalResult(unwrapResult(result))
    } catch(e) {
      console.error(e)
    }
  }
  const [originalResult, setOriginalResult] = useState<any>()

  useEffect(() => {
    navigation.setOptions({
      header: ({ navigation, options }: any) => (
        <Header
          color={Colors.bluePrimary}
          title={targetUser.name}
          search
          onDrawerClick={navigation.toggleDrawer}
        />
      ),
    });
  }, []);
  
  useEffect(()=>{
    const removeInterestedUser = async () => {
      await dispatch(removeInterested({pet, userId: targetUser.id}))
    }
    
    if(originalResult){
      removeInterestedUser();
      navigation.navigate('chatRoute', {
        screen: 'chat',
        initial: false, 
        params: { roomId: originalResult.id },
      }
    );
    }
  }, [originalResult])

  const navigateToNewChat = async () => {
    try{
      await createChat()
    } catch(e) {
      console.error(e)
    }
  }

  const NavigateToNewDetail = async () => {
    navigation.navigate('animalDetails', {
      petId: pet.id,
      isToAdopt: false,
    });
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{uri: targetUser.photo}} style={styles.photo} />
        <View style={styles.listContainer}>
          <View style={styles.listComponent}>
            <Text style={styles.title}>NOME COMPLETO</Text>
            <Text style={styles.text}>{targetUser.name}</Text>
          </View>

          <View style={styles.listComponent}>
            <Text style={styles.title}>IDADE</Text>
            <Text style={styles.text}>{targetUser.age} anos</Text>
          </View>

          <View style={styles.listComponent}>
            <Text style={styles.title}>EMAIL</Text>
            <Text style={styles.text}>{targetUser.email}</Text>
          </View>

          <View style={styles.listComponent}>
            <Text style={styles.title}>LOCALIZAÇÃO</Text>
            <Text style={styles.text}>{targetUser.city} - {targetUser.state}</Text>
          </View>

          <View style={styles.listComponent}>
            <Text style={styles.title}>ENDEREÇO</Text>
            <Text style={styles.text}>{targetUser.address}</Text>
          </View>

          <View style={styles.listComponent}>
            <Text style={styles.title}>TELEFONE</Text>
            <Text style={styles.text}>({targetUser.phone.slice(0, 2)}) {targetUser.phone.slice(2)}</Text>
          </View>

          <View style={styles.listComponent}>
            <Text style={styles.title}>NOME DE USUÁRIO</Text>
            <Text style={styles.text}>{targetUser.user}</Text>
          </View>

          <View style={styles.listComponent}>
            <Text style={styles.title}>HISTÓRICO</Text>
            <Text style={styles.text}>Adotou {targetUser.adoptedPets.length} pet</Text>
          </View>

        </View>
        
        <View style={styles.btnContainer}>
          <Button width={200} backgroundColor={Colors.bluePrimary} onPress={navigateToNewChat}>CHAT</Button>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 32,
    padding: 16,
  },
  photo: {
    height: 112,
    width: 112,
    borderRadius: 50,
    alignSelf: 'center',
  },
  listContainer: {
    gap: 30,
    alignItems: 'center',
  },
  listComponent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: Colors.blueHighlight,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
    color: Colors.textAuxPrimary,
  },
  btnContainer: {
    gap: 16,
    alignItems: 'center',
  }
})