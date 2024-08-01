import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Room, roomSchema, messageSchema } from "../schemas/Chat/chatSchema";
import type { Message } from "../schemas/Chat/chatSchema";
import { auth, db } from "../util/firebase";
import { get, getDatabase, ref, child, set, update, push } from "firebase/database";
import { collection, getDocs, query, where } from "firebase/firestore";
import { User, userSchema } from "../schemas/UserRegister/userRegister";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "./store";

type initialStateType = {
  status: boolean | null;
  isLoading?: boolean;
  chats: Array<Room>
  pendingMessages: Array<{_id:String | number, roomId: String | number}>;
};
const initialState: initialStateType = { status: null, chats: []};

// createAsyncThunk(()=>)
export const findRoom = (id: number | string) => (state: any) => {
  const room = state.chat.chats.find((room: Room) => room.id == id);
  return room;
};

export const sendMessage = createAsyncThunk(
  "messages/send",
  async (messagePayload: { message: Message; roomId: number|string }, thunkAPI) => {
    const database = getDatabase();
    // const chatRef = ref(database, `${messagePayload.roomId}`);
    if (database) {
      // if (auth.currentUser){
      if (true){
          // messagePayload.message.user._id = auth.currentUser.uid;
        const message = messagePayload.message;
        message.createdAt = new Date(message.createdAt).toJSON();
        try {
          const newMessageKey = push(child(ref(database), `${messagePayload.roomId}/messages`)).key;
          const updates = {} as Record<string, Message>;
          updates[`${messagePayload.roomId}/messages/${newMessageKey}`] = message
          await update(ref(database), updates);
          return thunkAPI.fulfillWithValue({ message, roomId: messagePayload.roomId });
        } catch (e) {
          return thunkAPI.rejectWithValue({ error: e });
        }

      }else{
        return thunkAPI.rejectWithValue({ error: "User not authenticated" });
      }
    }
  }
);

export const getRoomById = createAsyncThunk(
  "rooms/getById",
  async (roomId: string, thunkAPI) => {
    try {
      const database = ref(getDatabase());
      const res = await get(child(database, `${roomId}`));
      if(res.exists()){
        const room = res.val();
        if(room.messages) room.messages = Object.keys(room.messages).map((key) => room.messages[key]);

        return thunkAPI.fulfillWithValue(roomSchema.parse(room));
      } else {
        return thunkAPI.rejectWithValue("Room not found");
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

//TODO: simplificar schema e fazer parser das messages para IMessage
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessageAsSent: (state, action: {payload: {roomId: string, messageId: string}}) => {

    },
    updateMessages: (state, action: {payload: {roomId: string, messages: Message[]}}) => {
      const { roomId, messages } = action.payload;
      const room = state.chats.find((room) => room.id === roomId);
      if (room) {
        room.messages = messages.sort((a,b)=>{
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        });
      }
    },
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
      if(payload){
        const { roomId } = payload;
        const room = state.chats.find((room) => room.id === roomId);
        if (room) {
          const message = room.messages.find((message) => message._id === payload.message._id);
          if (message) {
            message.pending = false;
            message.sent = true
          }
        }
      }
    });
    builder.addCase(sendMessage.pending,  (state, {meta}) => {
      if(meta.arg){
        const room: Room | undefined = state.chats.find(el=>el.id == meta.arg.roomId) 
        const message = {...meta.arg.message}
        message.pending = true
        if(room){
          // state.pendingMessages.push({_id: message._id, roomId: room.id});
          room.messages.unshift(message);
        }
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

export const { instantiateRoom, clearRooms, updateMessages } = chatSlice.actions;

export default chatReducer;
