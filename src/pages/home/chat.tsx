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
import { collection, getDocs, query, where } from "firebase/firestore";
import { User, userSchema } from "../../schemas/UserRegister/userRegister";
import { db } from "../../util/firebase";

export default function ChatComponent() {
  const dispatch = useAppDispatch();
  const roomId = "qXdpCfmOpdudHb2RzbDY";
  const room = useAppSelector(findRoom(roomId));
  const user = useAppSelector(selectUser)
  
  useEffect(() => {
    dispatch(getRoomById(roomId));
    const rtdb = getDatabase()
    const chatRef = ref(rtdb,roomId+'/messages');
    onValue(chatRef, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messages = Object.keys(data).map((key) => data[key]);
        const newMessages = []
        for(const message of messages){
          const users = await getDocs(
            query(collection(db, "users"), where("uid", "==", message.user._id))
          );
          const usersData: User[] = users.docs.map((doc) => doc.data()).map(el=>userSchema.parse(el));
          if(usersData[0].photo) message.user.avatar = usersData[0].photo;
          message.sent = true
          newMessages.push(message);
        }
        if(newMessages.length) dispatch(updateMessages({ messages: newMessages, roomId }));
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
            // avatar: user?.photo,
          }}
        />
      ) : (
        <Text>Não tem sala</Text>
      )}
    </>
  );
}
