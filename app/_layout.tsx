import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

import { theme } from "../util/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

export default function Layout() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack />
      </SafeAreaView>
    </PaperProvider>
  );
}
