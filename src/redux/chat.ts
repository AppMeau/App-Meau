import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Room, roomSchema, messageSchema } from "../schemas/Chat/chatSchema";
import type { Message } from "../schemas/Chat/chatSchema";
import { auth, db } from "../util/firebase";
import { get, getDatabase, ref, child, set, update, push } from "firebase/database";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
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
  async (user: User) => {
  const roomsRef = collection(db, "rooms");
  const roomSnapshot = await getDocs( query(roomsRef, where("membersId", "array-contains", user.uid)));
  const rooms = await Promise.all(roomSnapshot.docs.map(async room => {
    const messagesCollection = collection(db, room.ref.path, "messages");
    let messages: any = await (getDocs(messagesCollection));
    messages = messages.docs.map((doc: any) => messageSchema.parse(doc.data()));
    const parsedRoom = roomSchema.parse({...room.data(), id: room.id, messages});
    parsedRoom.messages = sortByDate(processMessages(parsedRoom.messages, parsedRoom));
    
    return parsedRoom
  }))
  return rooms;
})

export const markAsReceived = async (messages: Message[], roomId: string|number) => {
  for(const message of messages){
    if(auth.currentUser){
      if(message.readers?.indexOf(auth.currentUser.uid) == -1 || message.readers == undefined){
        // const dispatch = useAppDispatch()
        // dispatch(readMessages({roomId: roomId, messageId: message._id}))
        const messageDoc = doc(db, "rooms", roomId as string, "messages", message._id as string);
        await updateDoc(messageDoc, {readers: arrayUnion(auth.currentUser.uid)});
      }
    }
  }
}
export const processMessages = (messages: Message[], room: Room): Message[] => {
  const newMessages = []
  for(const message of messages){
    try{
      // const users = await getDocs(
        // query(collection(db, "users"), where("uid", "==", message.user._id))
      // );
      // const usersData: User[] = users.docs.map((doc) => doc.data()).map(el=>userSchema.parse(el));
      // if(usersData[0].photo) message.user.avatar = usersData[0].photo;

      //checa se todas as pessoas receberam a mensagem
      const received = room.members.reduce((acc: boolean,el: {id: string, avatar: string, name: string})=>{
        if(message.readers && message.readers.indexOf(el.id) !== -1 && acc) return true;
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
  async (messagePayload: { message: Message; roomId: number|string, token: string }, thunkAPI) => {
    try{
      const messagesCollection = collection(db, "rooms", messagePayload.roomId as string, "messages");
      const messageDoc = doc(messagesCollection)
      const oldId = messagePayload.message._id;
      messagePayload.message._id = messageDoc.id;
      return thunkAPI.fulfillWithValue({ message: messagePayload.message, roomId: messagePayload.roomId, oldId });
    } catch (e) {
      return thunkAPI.rejectWithValue({ error: e });
    }
  }
);

export const createRoom = createAsyncThunk("rooms/createRoom", 
  async (roomData: {members: Array<{id: string, name: string, avatar: string}>, pet: {id: string, name: string}}, thunkAPI) => {
    try {
      // const database = ref(getDatabase());
      // const newRoomId = await push(database).key;
      // const updates: any = {};
      const room = {
        active: true,
        members: roomData.members,
        membersId: roomData.members.map(el=>el.id),
        pet: roomData.pet,
      };
      const res = await addDoc(collection(db, "rooms"), room);
      // const membersCollection = collection(db, "rooms", res.id as string, "members");
      // await Promise.all(roomData.members.map(async (member) => {
      //   await addDoc(membersCollection, member);
      // }))
      
      // updates[`${newRoomId}`] = room;
      // await update(database, updates)
      return thunkAPI.fulfillWithValue({...room, id: res.id});
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
});

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
        const { roomId, oldId } = payload;
        const room = state.chats.find((room) => room.id === roomId);
        if (room) {
          const message = room.messages.find((message) => message._id === payload.oldId);
          if (message) {
            message._id = payload.message._id;
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
