import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import Colors from "../../util/Colors";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { createRoom } from "../../redux/chat";
import { selectUser } from "../../redux/auth";
import { unwrapResult } from "@reduxjs/toolkit";

export default function UserProfile({navigation, route}: any) {
  const dispatch = useAppDispatch();
  let {lastCreatedRoom} = useAppSelector((state) => state.chat);

  const {uid} = useAppSelector(selectUser)

  const user = route.params.user 
  const petId = route.params.petId
  const createChat = async () => {
    try{
      const result = await dispatch(createRoom({members: [user.uid, uid], pet: petId}))
      setOriginalResult(unwrapResult(result))
      // console.log('ORIGINAL', originalResult)
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

  const navigateToNewChat = async () => {
    try{
      await createChat()
      navigation.navigate('chat', {
        roomId: originalResult.id,
      })
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