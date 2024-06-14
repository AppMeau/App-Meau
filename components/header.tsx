<<<<<<< HEAD
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
=======
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../util/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header({color, title, search=false, iconColor=Colors.textAuxPrimary, onDrawerClick}:{color: string, title?: string, search?: Boolean, iconColor?: string, onDrawerClick: () => void}) {
    const insets = useSafeAreaInsets();
    return (
      <SafeAreaProvider>
        <View style={[styles.container, styles.flex, {backgroundColor: color, paddingTop: insets.top}]}>
        <View style={[styles.flex,  styles.headerContainer]}>
          <TouchableOpacity onPress={onDrawerClick}>
            <Ionicons name='menu' size={24} color={iconColor} />
          </TouchableOpacity>
          
          <Text style={styles.title}>{title}</Text>
        </View>
        
        {search && 
          <Ionicons name="search-sharp" size={24} color={iconColor} />
        }
        </View>
      </SafeAreaProvider>
>>>>>>> d04d4a2ab296c1fab7cc71958a63947c123cec09
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
<<<<<<< HEAD
    width: "100%",
    height: 56,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-between",
=======
    width: '100%',
    height: headerSize,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
>>>>>>> d04d4a2ab296c1fab7cc71958a63947c123cec09
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
