import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Room, roomSchema, messageSchema } from "../schemas/Chat/chatSchema";
import type { Message } from "../schemas/Chat/chatSchema";
import { auth, db } from "../util/firebase";
import { get, getDatabase, ref, child, set, update, push } from "firebase/database";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { User, userSchema } from "../schemas/UserRegister/userRegister";

type initialStateType = {
  status: boolean | null;
  isLoading?: boolean;
  chats: Array<Room>;
  lastCreatedRoom: Room | null;
};
const initialState: initialStateType = {
  status: null, 
  isLoading: false, 
  chats: [], 
  lastCreatedRoom: null,
};

// createAsyncThunk(()=>)
export const findRoom = (id: number | string) => (state: any) => {
  const room = state.chat.chats.find((room: Room) => room.id == id);
  return room;
};

const sortByDate = (messages: Array<Message>) => messages.sort((a,b)=>{
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
});

export const getMyRooms = createAsyncThunk(
  'rooms/getMyRooms',
  async () => {
  const roomsRef = collection(db, "rooms");
  const user = auth.currentUser?.uid;
  const roomSnapshot = await getDocs( query(roomsRef, where("members", "array-contains", user)))
  const rooms = roomSnapshot.docs.map(room => {
    const parsedRoom = roomSchema.parse(room.data());
    console.log(parsedRoom)
    return parsedRoom
  })
  return rooms;
})

export const markAsReceived = async (messages: Message[], roomId: string|number) => {
  for(const message of messages){
    if(auth.currentUser){
      if(message.readers?.indexOf(auth.currentUser.uid) == -1){
        // const dispatch = useAppDispatch()
        // dispatch(readMessages({roomId: roomId, messageId: message._id}))
        const dbRef = ref(getDatabase())
        const updates = {} as Record<string, string>;
        updates[`${roomId}/messages/${message._id}/readers/${message.readers.length}`] = auth.currentUser.uid;
        await update(dbRef, updates);
      }
    }
  }
}
export const processMessages = async (messages: Message[], room: Room): Promise<Message[]> => {
  const newMessages = []
  for(const message of messages){
    try{
      // const users = await getDocs(
        // query(collection(db, "users"), where("uid", "==", message.user._id))
      // );
      // const usersData: User[] = users.docs.map((doc) => doc.data()).map(el=>userSchema.parse(el));
      // if(usersData[0].photo) message.user.avatar = usersData[0].photo;

      //checa se todas as pessoas receberam a mensagem
      const received = room.members.reduce((acc: boolean,el:string|number)=>{
        if(message.readers && message.readers.indexOf(el) !== -1 && acc) return true;
        return false;
      }, true)
      message.received = received
      message.sent = true
      newMessages.push(message);
    } catch (e){
      console.error(e);
    }
  }
  return newMessages
}

export const sendMessage = createAsyncThunk(
  "messages/send",
  async (messagePayload: { message: Message; roomId: number|string }, thunkAPI) => {
    const database = getDatabase();
    if (database) {
      if (auth.currentUser){
        const message = messagePayload.message;
        message.createdAt = new Date(message.createdAt).toJSON();
        message.readers = [auth.currentUser.uid];
        try {
          // const newMessageKey = push(child(ref(database), `${messagePayload.roomId}/messages/${message._id}`));
          const updates = {} as Record<string, Message>;
          updates[`${messagePayload.roomId}/messages/${message._id}`] = message
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

export const createRoom = createAsyncThunk("rooms/createRoom", 
  async (roomData: {members: string[], pet: string}, thunkAPI) => {
    try {
      const database = ref(getDatabase());
      const newRoomId = await push(database).key;
      const updates: any = {};
      const room = {
        id: newRoomId,
        active: true,
        members: roomData.members,
        pet: roomData.pet,
      };
      await addDoc(collection(db, "rooms"), room);
      updates[`${newRoomId}`] = room;
      await update(database, updates)
      return thunkAPI.fulfillWithValue(room);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
});


export const getRoomById = createAsyncThunk(
  "rooms/getById",
  async (roomId: string, thunkAPI) => {
    try {
      const database = ref(getDatabase());
      const res = await get(child(database, `${roomId}`));
      if(res.exists()){
        const room = res.val();
        if(room.messages){
          room.messages = Object.keys(room.messages).map((key) => {
            return {...room.messages[key], dbId: key}
          });
          await markAsReceived(room.messages, roomId);
          room.messages = await processMessages(room.messages, room);
          room.messages = sortByDate(room.messages);
        }
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
    updateMessages: (state, action: {payload: {roomId: string, messages: Message[]}}) => {
      const { roomId, messages } = action.payload;
      const room = state.chats.find((room) => room.id === roomId);
      if (room) {
        messages.forEach((message) => {
          let messageInRoom = room.messages.find((el)=>el._id == message._id)
          if(!messageInRoom){
            room.messages.unshift(message);
          } else {
            room.messages = room.messages.map(el => {
              if(el._id === message._id){
                return message;
              }
              return el
            })
          }
        })
        room.messages = sortByDate(room.messages)
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
    builder.addCase(getRoomById.pending, (state) => {state.isLoading=true})
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
      state.isLoading = false;
    });
    builder.addCase(createRoom.fulfilled, (state, { payload }) => {
      if(payload){
        state.chats.push(roomSchema.parse(payload));
        state.lastCreatedRoom = roomSchema.parse(payload);
        state.isLoading = false;
      }
    });
    builder.addCase(createRoom.pending, (state) => {state.isLoading=true})

    builder.addCase(getMyRooms.fulfilled, (state, { payload }) => {
      if(payload){
        state.chats = payload;
      }
      state.isLoading = false;
    });
    builder.addCase(getMyRooms.pending, (state) => {state.isLoading=true})
  },
});

const chatReducer = chatSlice.reducer;

export const { instantiateRoom, clearRooms, updateMessages } = chatSlice.actions;

export default chatReducer;
