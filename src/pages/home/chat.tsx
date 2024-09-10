import { useEffect, useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  findRoom,
  markAsReceived,
  sendMessage,
  updateMessages,
} from "../../redux/chat";
import { messageSchema, Room } from "../../schemas/Chat/chatSchema";
import { Text } from "react-native";
import { getDatabase, off, onValue, ref } from "firebase/database";
import { selectUser } from "../../redux/auth";
import { processMessages } from "../../redux/chat";
import Header from "../../components/header";
import Colors from "../../util/Colors";

export default function ChatComponent({route, navigation}: any) {
  const dispatch = useAppDispatch();

  const roomId = route.params.roomId;
  const room = useAppSelector(findRoom(roomId));

  const user = useAppSelector(selectUser)
  const isLoading = useAppSelector((state) => state.chat.isLoading);

  useEffect(() => {
    navigation.setOptions({
      header: ({ navigation, options }: any) => (
        <Header
          color={Colors.bluePrimary}
          title={room.members.find((el: any) => el.id !== user.uid).name}
          dotsMenu
          icon="arrow-back"
          onDrawerClick={navigation.goBack}
        />
      ),
    });

  }, []);

  useEffect(() => {
    const rtdb = getDatabase()
    const chatRef = ref(rtdb,roomId+'/messages');
    onValue(chatRef, async (snapshot) => {
      const data = snapshot.val();
      if (data && room) {
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
      dispatch(sendMessage({ message: messageSchema.parse(messages[0]), roomId: roomId, token: user.notification_token }));
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
          renderInputToolbar={room.active ? undefined : () => null}
          user={{
            _id: user?.uid,
            name: user?.name,
            avatar: user?.photo,
          }}
        />
      ) : (
        <>
          <Text>Não tem sala</Text>
        </>
      )}
    </>
  );
}
