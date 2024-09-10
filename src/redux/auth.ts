import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, firebase, storage } from "../util/firebase";
import {
  Credential,
  User,
  userSchema,
} from "../schemas/UserRegister/userRegister";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useAppDispatch } from "./store";
import { registerForPushNotifications } from "./notification";
import { getUserById } from "./users";

type initialStateType = {
  status: boolean | null;
  isLoading?: boolean;
  user: User | null;
};
const initialState: initialStateType = { status: null, user: null };

export const login = createAsyncThunk(
  "users/login",
  async (credentials: Credential, thunkAPI) => {
    try {
      const res = await signInWithEmailAndPassword(
        getAuth(firebase),
        credentials.email,
        credentials.password
      );
      const users = await getDocs(
        query(collection(db, "users"), where("uid", "==", res.user.uid))
      );
      const usersData = users.docs.map((doc) => doc.data());
      if (usersData.length) {
        const token = await registerForPushNotifications()
        users.docs.map(async doc => await updateDoc(doc.ref, { notification_token: token }))
        const user = usersData[0];
        user.notification_token = token;
        return thunkAPI.fulfillWithValue(userSchema.parse(user));
      }
      return thunkAPI.rejectWithValue("User not found");
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk("users/logout", async () => {
  const user = auth.currentUser;
  if(user) {
    try {
      const snapshot = await getDocs(
        query(collection(db, "users"), where("uid", "==", user.uid))
      );
      const id = snapshot.docs.map(el => el.id)[0];
      await updateDoc(doc(db, "users", id), { notification_token: null });
      
    } catch (error) {
      console.error(error)
      
    }
  }
  const res = await auth.signOut();
  return true;
});

export const checkAuthStatus = createAsyncThunk(
  "users/checkAuthStatus",
  async (_, { dispatch }) => {
    const auth = getAuth(firebase);
    const user = auth.currentUser;
    if (user) {
      dispatch(setLoginState(true));
    } else {
      dispatch(setUser(null));
      dispatch(setLoginState(false));
    }
  }
);

export const selectUser = (state: any) => state.auth.user;

export const Slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginState: (state, action) => {
      state.status = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = true;
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = false;
      state.isLoading = false;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.status = false;
      state.user = null;
      state.isLoading = false;
    });
    builder.addCase(logout.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

const authReducer = Slice.reducer;

export const { setLoginState, setUser } = Slice.actions;

export default authReducer;
