import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { getMyRooms } from "../../redux/chat"
import { FlatList, Text, View, RefreshControl, StyleSheet, } from "react-native"
import { unwrapResult } from "@reduxjs/toolkit"
import { Room } from "../../schemas/Chat/chatSchema"
import { selectUser } from "../../redux/auth"
import ChatCard from "../../components/chatCard"
import Colors from "../../util/Colors"
import Button from "../../components/customButton";

export default function MyChatRooms({navigation, route}: any) {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const uid = user.uid
  // const [chats, setChats] = useState<Room[]>([])
  const {chats} = useAppSelector(state => state.chat)
  const isLoading = useAppSelector(state => !!state.chat.isLoading)

  const navigateToFormsAdoption = () => {
    navigation.navigate('finishAdoption')
  }

  const getAllMyRooms = async () => {
    dispatch(getMyRooms(user));
    // setChats(unwrapResult(result))
  }
  
  useEffect(() => {
    getAllMyRooms();
  }, [])
  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <FlatList 
        refreshControl={<RefreshControl onRefresh={getAllMyRooms} refreshing={isLoading}/>}
        data={chats}
        keyExtractor={room => room.id.toString()}
        ListEmptyComponent={<Text style={{textAlign: 'center', paddingTop: 30}}>Você não possui nenhuma conversa</Text>}
        renderItem={({item}) => {
          return (
            <View>
              <ChatCard active={item.active} pet={item.pet} user={item.members.find(el => el.id !== uid)!} lastMessage={item.messages[0]} roomId={item.id}/>
            </View>
          )
      }}/>
      <View style={styles.containerButton}>
        <Button
          backgroundColor={Colors.bluePrimary}
          onPress={navigateToFormsAdoption}
          width={280}
        >
          FINALIZAR UM PROCESSO
        </Button>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  containerButton:{
    display: "flex",
    flexDirection: "row",
    paddingTop: "5%",
    justifyContent: "space-around",
    width: "100%",
    paddingBottom: 20
  }
});