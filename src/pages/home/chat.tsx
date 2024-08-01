import { useEffect } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  findRoom,
  getRoomById,
  markAsReceived,
  sendMessage,
  updateMessages,
} from "../../redux/chat";
import { messageSchema } from "../../schemas/Chat/chatSchema";
import { Text } from "react-native";
import { getDatabase, onValue, ref } from "firebase/database";
import { selectUser } from "../../redux/auth";
import { processMessages } from "../../redux/chat";

export default function ChatComponent() {
  const dispatch = useAppDispatch();
  const roomId = "qXdpCfmOpdudHb2RzbDY";
  const room = useAppSelector(findRoom(roomId));
  const user = useAppSelector(selectUser)
  const isLoading = useAppSelector((state) => state.chat.isLoading);
  useEffect(() => {
    dispatch(getRoomById(roomId));
    const rtdb = getDatabase()
    const chatRef = ref(rtdb,roomId+'/messages');
    onValue(chatRef, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        try{
          const messages = Object.keys(data).map((key) => data[key]);
          await markAsReceived(messages, roomId);
          const newMessages = await processMessages(messages, room);
          if(newMessages.length) dispatch(updateMessages({ messages: newMessages, roomId }));
          console.log(room.messages)
        } catch (e) {
          console.error(e);
        } 
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
      {room && user && !isLoading? (
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
