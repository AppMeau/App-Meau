import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Room, roomSchema, messageSchema } from "../schemas/Chat/chatSchema";
import type { Message } from "../schemas/Chat/chatSchema";
import { GiftedChat } from "react-native-gifted-chat";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../util/firebase";
import { get, getDatabase, ref, child } from "firebase/database";

type initialStateType = {
  status: boolean | null;
  isLoading?: boolean;
  chats: Array<Room>;
};
const initialState: initialStateType = { status: null, chats: [] };

// createAsyncThunk(()=>)
export const findRoom = (id: number | string) => (state: any) => {
  const room = state.chat.chats.find((room: Room) => room.id == id);
  return room;
};

export const sendMessage = createAsyncThunk(
  "messages/send",
  async (messagePayload: { message: Message; roomId: number|string }, thunkAPI) => {
    const database = ref(getDatabase());
    // const chatRef = ref(database, `${messagePayload.roomId}`);
    const res = await get(child(database, `${messagePayload.roomId}`));
    if (res.exists()) {
      if (auth.currentUser)
        messagePayload.message.user._id = auth.currentUser.uid;
      const message = messagePayload.message;
      messagePayload.message.createdAt = new Date(message.createdAt).toJSON();
      try {
        return messagePayload;
      } catch (e) {
        return messagePayload;
      }
    }
  }
);

export const getRoomById = createAsyncThunk(
  "rooms/getById",
  async (roomId: string, thunkAPI): Promise<Room | null> => {
    try {
      const room = await getDocs(
        query(collection(db, "rooms"), where("id", "==", roomId))
      );
      const rooms = room.docs.map((el) => {
        const room = el.data();
        room.createdAt = new Date(room.createdAt.seconds * 1000).toJSON();
        room.updatedAt = new Date(room.updatedAt.seconds * 1000).toJSON();

        return roomSchema.parse(room);
      });
      return rooms[0];
    } catch (e) {
      console.error(e);
      return null;
    }
  }
);

//TODO: simplificar schema e fazer parser das messages para IMessage
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // recebe id e inicia uma nova sala
    clearRooms: (state) => {
      state.chats = [];
    },
    instantiateRoom: (state, action) => {
      state.chats = [
        ...state.chats,
        roomSchema.parse({
          id: action.payload,
          active: true,
          members: [],
          messages: [
            messageSchema.parse({
              _id: 1,
              text: "Hello developer",
              createdAt: new Date(),
              user: {
                _id: 2,
                name: "React Native",
                avatar: "https://placeimg.com/140/140/any",
              },
            }),
          ],
          pet: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessage.fulfilled, (state, { payload }) => {
      const room = state.chats.find(el=>el.id == payload.roomId) 
      if(room){
        room.messages = GiftedChat.append(room.messages, [messageSchema.parse(payload.message)]);
      }
    });
    // Se encontrar a sala, atualiza, se não, adiciona
    builder.addCase(getRoomById.fulfilled, (state, { payload }) => {
      if(payload){
        if(state.chats.find((room) => room.id === payload.id)){
          state.chats = state.chats.map((room) => {
            if(room.id === payload.id){
              return payload;
            }
            return room;
          });
        }else{
          state.chats.push(payload);
        }
      }
    });
  },
});

const chatReducer = chatSlice.reducer;

export const { instantiateRoom, clearRooms } = chatSlice.actions;

export default chatReducer;
