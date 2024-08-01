import { useCallback, useEffect, useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  findRoom,
  getRoomById,
  instantiateRoom,
  sendMessage,
  updateMessages,
} from "../../redux/chat";
import { Message, messageSchema } from "../../schemas/Chat/chatSchema";
import { View, Text } from "react-native";
import { getDatabase, onValue, ref } from "firebase/database";
import { selectUser } from "../../redux/auth";

export default function ChatComponent() {
  const dispatch = useAppDispatch();
  const roomId = "qXdpCfmOpdudHb2RzbDY";
  const room = useAppSelector(findRoom(roomId));
  const user = useAppSelector(selectUser)

  useEffect(() => {
    dispatch(getRoomById(roomId));
    const db = getDatabase()
    const chatRef = ref(db,roomId+'/messages');
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messages = Object.keys(data).map((key) => data[key]);
        dispatch(updateMessages({ messages, roomId }));
      }   
    })
  }, []);
  const onSend = (messages: IMessage[] = []) => {
    try {
      dispatch(sendMessage({ message: messageSchema.parse(messages[0]), roomId }));
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      {room && user ? (
        <GiftedChat
          messages={room.messages}
          onSend={(messages: IMessage[]) => onSend(messages)}
          user={{
            _id: user?.uid,
            name: user?.name,
            avatar: user?.photo,
          }}
        />
      ) : (
        <Text>Não tem sala</Text>
      )}
    </>
  );
}
