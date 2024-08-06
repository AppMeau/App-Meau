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
import { getDatabase, off, onValue, ref } from "firebase/database";
import { selectUser } from "../../redux/auth";
import { processMessages } from "../../redux/chat";

export default function ChatComponent({route}: any) {
  const dispatch = useAppDispatch();

  const roomId = route.params.roomId;
  
  const room = useAppSelector(findRoom(roomId));
  const user = useAppSelector(selectUser)
  const isLoading = useAppSelector((state) => state.chat.isLoading);

  useEffect(() => {
    const rtdb = getDatabase()
    const chatRef = ref(rtdb,roomId+'/messages');
    dispatch(getRoomById(roomId));
    onValue(chatRef, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        try{
          const messages = Object.keys(data).map((key) => data[key]);
          await markAsReceived(messages, roomId);
          const newMessages = await processMessages(messages, room);
          if(newMessages.length) dispatch(updateMessages({ messages: newMessages, roomId }));
        } catch (e) {
          console.error(e);
        } 
      }
    });
    return ()=>{
      off(chatRef, 'value');
    }
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
            avatar: user?.photo,
          }}
        />
      ) : (
        <Text>Não tem sala</Text>
      )}
    </>
  );
}
