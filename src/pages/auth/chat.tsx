import { useCallback, useEffect, useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  findRoom,
  getRoomById,
  instantiateRoom,
  sendMessage,
} from "../../redux/chat";
import { Message, messageSchema } from "../../schemas/Chat/chatSchema";
import { View, Text } from "react-native";

export default function ChatComponent() {
  const dispatch = useAppDispatch();
  const room = useAppSelector(findRoom("qXdpCfmOpdudHb2RzbDY"));
  useEffect(() => {
    dispatch(getRoomById("qXdpCfmOpdudHb2RzbDY"));
  }, []);
  const onSend = (messages: IMessage[] = []) => {
    try {
      dispatch(sendMessage({ message: messageSchema.parse(messages[0]), roomId: "qXdpCfmOpdudHb2RzbDY" }));
    } catch (e) {
      console.error("aqui", messages[0]);
    }
  };
  return (
    <>
      {room ? (
        <GiftedChat
          messages={room.messages}
          onSend={(messages: IMessage[]) => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      ) : (
        <Text>Não tem sala</Text>
      )}
    </>
  );
}
