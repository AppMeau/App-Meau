import { StyleSheet, Text, View } from "react-native";
import Colors from "../util/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type IconType = "menu" | "arrow-back";

export default function Header({
  color,
  title,
  search = false,
  icon = "menu",
  dotsMenu = false,
  iconColor = Colors.textAuxPrimary,
  onDrawerClick,
}: {
  color: string;
  title?: string;
  search?: Boolean;
  dotsMenu?: Boolean;
  iconColor?: string;
  icon?: IconType;
  onDrawerClick: () => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        style={[
          styles.container,
          styles.flex,
          { backgroundColor: color, paddingTop: insets.top },
        ]}
      >
        <View style={[styles.flex, styles.headerContainer]}>
          <TouchableOpacity onPress={onDrawerClick}>
            <Ionicons name={icon} size={24} color={iconColor} />
          </TouchableOpacity>

          <Text style={styles.title}>{title}</Text>
        </View>

        {search && <Ionicons name="search-sharp" size={24} color={iconColor} />}
        {dotsMenu && <MaterialCommunityIcons name="dots-vertical" size={24} color={iconColor} />}
      </View>
    </>
  );
}
export const headerSize = 90;
const styles = StyleSheet.create({
  flex: {
    alignContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: headerSize,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: "Roboto_400Regular",
    color: Colors.textAuxPrimary,
  },
  headerContainer: {
    gap: 16,
  },
});
