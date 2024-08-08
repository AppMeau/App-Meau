import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { getMyRooms } from "../../redux/chat"
import { FlatList, Text, View } from "react-native"
import { unwrapResult } from "@reduxjs/toolkit"
import { Room } from "../../schemas/Chat/chatSchema"
import { selectUser } from "../../redux/auth"
import ChatCard from "../../components/chatCard"
import { DrawerItemList } from "@react-navigation/drawer"

export default function MyChatRooms({navigation, route}: any) {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const uid = user.uid
  const [chats, setChats] = useState<Room[]>([])

  useEffect(() => {
    const getAllMyRooms = async () => {
      const result = await dispatch(getMyRooms(user));
      setChats(unwrapResult(result))
    }

    getAllMyRooms();
  }, [])
  return (
    <View>
      <FlatList data={chats} keyExtractor={room => room.id.toString()} renderItem={({item}) => {
        return (
          <View>
            <ChatCard pet={item.pet} user={item.members.find(el => el.id !== uid)!} lastMessage={item.messages[0]} roomId={item.id}/>
          </View>
        )
      }}/>
    </View>
  )
}