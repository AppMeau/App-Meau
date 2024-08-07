import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import Colors from "../../util/Colors";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { createRoom } from "../../redux/chat";
import { selectUser } from "../../redux/auth";
import { unwrapResult } from "@reduxjs/toolkit";
import { PetRegisterType } from "../../schemas/PetRegister/petRegisterTypes";
import { removeInterested } from "../../redux/pets";

export default function UserProfile({navigation, route}: any) {
  const dispatch = useAppDispatch();

  const {uid} = useAppSelector(selectUser)

  const user = route.params.user 
  const pet: PetRegisterType = route.params.pet

  const createChat = async () => {
    try{
      const result = await dispatch(createRoom({members: [user.uid, uid], pet: pet.id as string}))
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
          title={user.name}
          search
          onDrawerClick={navigation.toggleDrawer}
        />
      ),
    });
  }, []);
  
  useEffect(()=>{
    const removeInterestedUser = async () => {
      await dispatch(removeInterested({pet, userId: user.uid}))
    }
    
    if(originalResult){
      removeInterestedUser();
      navigation.navigate('chat', {
        roomId: originalResult.id,
      })
    }
  }, [originalResult])

  const navigateToNewChat = async () => {
    try{
      await createChat()
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <View>
      <Button onPress={navigateToNewChat}>CHAT</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  
})