import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { getMyRooms } from "../../redux/chat"
import { FlatList, Text, View, RefreshControl } from "react-native"
import { unwrapResult } from "@reduxjs/toolkit"
import { Room } from "../../schemas/Chat/chatSchema"
import { selectUser } from "../../redux/auth"
import ChatCard from "../../components/chatCard"

export default function MyChatRooms({navigation, route}: any) {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const uid = user.uid
  // const [chats, setChats] = useState<Room[]>([])
  const {chats} = useAppSelector(state => state.chat)
  const isLoading = useAppSelector(state => !!state.chat.isLoading)

  const getAllMyRooms = async () => {
    dispatch(getMyRooms(user));
    // setChats(unwrapResult(result))
  }
  
  useEffect(() => {
    getAllMyRooms();
  }, [])
  return (
    <View>
      <FlatList refreshControl={<RefreshControl onRefresh={getAllMyRooms} refreshing={isLoading}/>} data={chats} keyExtractor={room => room.id.toString()} renderItem={({item}) => {
        return (
          <View>
            <ChatCard pet={item.pet} user={item.members.find(el => el.id !== uid)!} lastMessage={item.messages[0]} roomId={item.id}/>
          </View>
        )
      }}/>
    </View>
  )
}