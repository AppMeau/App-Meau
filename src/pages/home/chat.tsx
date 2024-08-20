import { useEffect, useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  findRoom,
  markAsReceived,
  sendMessage,
  updateMessages,
} from "../../redux/chat";
import { Message, messageSchema, Room } from "../../schemas/Chat/chatSchema";
import { Text } from "react-native";
import { selectUser } from "../../redux/auth";
import { processMessages } from "../../redux/chat";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../util/firebase";
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
    const roomDoc = query(collection(db, "rooms", roomId, "messages"));
    const unsub = onSnapshot(roomDoc, { includeMetadataChanges: true },async (snapshot: any) => {
      try{
        const messages: Message[] = []

        snapshot.forEach((doc: any) => messages.push(doc.data()));

        const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
        if (messages.length && room && source === "Server") {
          try{
            await markAsReceived(messages, roomId);
            const newMessages = await processMessages(messages, room);
            if(newMessages.length) dispatch(updateMessages({ messages: newMessages, roomId }));
          } catch (e) {
            console.error(e);
          } 
        }
      } catch (e) {
        console.error(e);
      }
    });
    return ()=>{
      unsub()
    }
  }, []);

  const onSend = (messages: IMessage[] = []) => {
    const targetUser = room?.members.find((member: any) => member.id !== user?.uid);
    try {
      dispatch(sendMessage({ message: messageSchema.parse(messages[0]), roomId: roomId, token: targetUser?.token }));
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
        <>
          <Text>Não tem sala</Text>
        </>
      )}
    </>
  );
}
