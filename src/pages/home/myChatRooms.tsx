import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { getMyRooms } from "../../redux/chat"
import { FlatList, Text, View } from "react-native"
import { unwrapResult } from "@reduxjs/toolkit"
import { Room } from "../../schemas/Chat/chatSchema"
import { selectUser } from "../../redux/auth"

export default function MyChatRooms({navigation, route}: any) {
  const dispatch = useAppDispatch()
  const {uid} = useAppSelector(selectUser)

  const [chats, setChats] = useState<Room[]>([])

  useEffect(() => {
    const getAllMyRooms = async () => {
      const result = await dispatch(getMyRooms());
      setChats(unwrapResult(result))
    }

    getAllMyRooms();
  }, [])

  return (
    <View>
      <FlatList data={chats} keyExtractor={room => room.id.toString()} renderItem={(itemData) => {
        return (
          <View>
            <Text>{itemData.item.members[0] === uid ? itemData.item.members[1] : itemData.item.members[0]}</Text>
          </View>
        )
      }}/>
    </View>
  )
}