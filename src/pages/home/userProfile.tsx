import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { useEffect } from "react";
import Header from "../../components/header";
import Colors from "../../util/Colors";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { createRoom } from "../../redux/chat";
import { selectUser } from "../../redux/auth";

export default function UserProfile({navigation, route}: any) {
  const dispatch = useAppDispatch();
  let {lastCreatedRoomId} = useAppSelector((state) => state.chat);

  const {uid} = useAppSelector(selectUser)

  const user = route.params.user 
  const petId = route.params.petId

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

  useEffect(() => {
    console.log(lastCreatedRoomId)

    dispatch(createRoom({members: [user.uid, uid], pet: petId}))

  }, [])
  
  const navigateToNewChat = () => {
    navigation.navigate('chat', {
      roomId: lastCreatedRoomId,
    })
  }

  return (
    <View>
      <Button onPress={navigateToNewChat}>CHAT</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  
})