import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../util/firebase";

type initialStateType = {
  expoPushToken: string | null;
  isLoading?: boolean;
};
const initialState: initialStateType = {
  expoPushToken: null,
  isLoading: false,
};

export async function sendMessageNotification(token:string, msg: string) {
  const message = {
    title: "Você tem uma nova mensagem!",
    body: msg,
    to: token,
    sound: 'default',
  };
  const res = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export async function sendInterestedNotification(token: string, petName: string) {
  const message = {
    title: "Seu pet tem um novo interessado!",
    body: `Um usuário se interessou no seu pet ${petName}!`,
    to: token,
    sound: 'default',
  };
  const res = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export async function registerForPushNotifications() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  // Learn more about projectId:
  // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
  // EAS projectId is used here.
  try {
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      throw new Error("Project ID not found");
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;
  } catch (e) {
    token = `${e}`;
  }

  return token;
}

export const registerForPushNotificationsThunk = createAsyncThunk(
  "notifications/registerForPushNotification",
  async (_, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      const token = await registerForPushNotifications();
      return fulfillWithValue(token);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

export const NotificationsSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      registerForPushNotificationsThunk.fulfilled,
      (state, action) => {
        state.expoPushToken = action.payload || null;
        state.isLoading = false;
      }
    );
    builder.addCase(
      registerForPushNotificationsThunk.pending,
      (state, action) => {
        state.isLoading = true;
      }
    );
  },
});

const notificationsReducer = NotificationsSlice.reducer;

export const {} = NotificationsSlice.actions;

export default notificationsReducer;
