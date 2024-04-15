import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../util/Colors";

export default function Header({
  color,
  title,
  search = false,
}: {
  color: string;
  title: string;
  search?: boolean;
}) {
  return (
    <View style={[styles.container, styles.flex, { backgroundColor: color }]}>
      <View style={[styles.flex, styles.headerContainer]}>
        <Ionicons name="menu" size={24} color={Colors.textAuxPrimary} />
        <Text style={styles.title}>{title}</Text>
      </View>

      {search && (
        <Ionicons name="search-sharp" size={24} color={Colors.textAuxPrimary} />
      )}
    </View>
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
