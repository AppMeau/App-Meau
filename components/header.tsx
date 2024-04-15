import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../util/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function Header({
  bgColor,
  title,
  search = false,
}: {
  bgColor?: string;
  title?: string;
  search?: boolean;
}) {
  return (
    <Stack.Screen
      options={{
        header: () => (
          <View
            style={[
              styles.container,
              styles.flex,
              { backgroundColor: bgColor },
            ]}
          >
            <View style={[styles.flex, styles.headerContainer]}>
              <Ionicons name="menu" size={24} color={Colors.textAuxPrimary} />
              <Text style={styles.title}>{title}</Text>
            </View>

            {search && (
              <Ionicons
                name="search-sharp"
                size={24}
                color={Colors.textAuxPrimary}
              />
            )}
          </View>
        ),
      }}
    />
  );
}

const styles = StyleSheet.create({
  flex: {
    alignContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: 56,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: "roboto-medium",
    color: Colors.textAuxPrimary,
  },
  headerContainer: {
    gap: 16,
  },
});
