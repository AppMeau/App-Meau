import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

type initialStateType = {
  expoPushToken: string | null;
  isLoading?: boolean;
};
const initialState: initialStateType = {
  expoPushToken: null,
  isLoading: false,
};

export async function schedulePushNotification() {
  console.log("chamou notify");
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here", test: { test1: "more data" } },
    },
    trigger: null,
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
    console.log(token);
  } catch (e) {
    token = `${e}`;
  }

  return token;
}

export const pushNotifications = createAsyncThunk(
  "notifications/pushNotification",
  async () => {
    try {
      console.log("antes");
      await schedulePushNotification();
      console.log("depois");
    } catch (e) {
      console.error(e);
    }
  }
);

export const registerForPushNotificationsThunk = createAsyncThunk(
  "notifications/registerForPushNotification",
  async (_, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      console.log("register");
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
