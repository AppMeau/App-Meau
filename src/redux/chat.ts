import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Room, roomSchema, messageSchema } from "../schemas/Chat/chatSchema";
import { IMessage } from "react-native-gifted-chat";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../util/firebase";

type initialStateType = {
  status: boolean | null;
  isLoading?: boolean;
  chats: Array<Room>;
};
const initialState: initialStateType = { status: null, chats: [] };

// createAsyncThunk(()=>)
export const findRoom = (id: number | string) => (state: any) => {
  const room = state.chat.chats.find((room: Room) => room.id == id);
  console.log("STATE", state.chat);
  console.log("STATE", state.chat.chats.length);
  console.log("ROOM", room);
  return room;
};

export const sendMessage = createAsyncThunk(
  "messages/send",
  (messagePayload: { message: IMessage; roomId: number }, thunkAPI) => {
    try {
      return messagePayload;
    } catch (e) {
      return messagePayload;
    }
  }
);

export const getRoomById = createAsyncThunk(
  "rooms/getById",
  async (roomId: string, thunkAPI): Promise<Room[]> => {
    try {
      const room = await getDocs(
        query(collection(db, "rooms"), where("id", "==", roomId))
      );
      const rooms = room.docs.map((el) => {
        const room = el.data();
        room.createdAt = new Date(room.createdAt.seconds * 1000);
        room.updatedAt = new Date(room.updatedAt.seconds * 1000);
        // console.log("debug", room);
        return roomSchema.parse(room);
      });
      console.log("rooms", rooms);
      return rooms;
    } catch (e) {
      console.error(e);
      return [];
    }
    // console.log("Query executando", roomId);
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
      state.chats[payload.roomId]?.messages.push(
        messageSchema.parse(payload.message)
      );
      console.log(payload);
    });
    builder.addCase(getRoomById.fulfilled, (state, { payload }) => {
      console.log("ROOMS", payload);
      state.chats = payload;
      console.log(payload);
    });
  },
});

const chatReducer = chatSlice.reducer;

export const { instantiateRoom, clearRooms } = chatSlice.actions;

export default chatReducer;
