import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { Message, Room } from "../schemas/Chat/chatSchema";
import { auth } from "../util/firebase";
import { Card } from "react-native-paper";
import Colors from "../util/Colors";
import { useNavigation } from "@react-navigation/native";

export default function ChatCard({ user, lastMessage, roomId, pet, active }: { user: {id: string, name: string, avatar: string}, lastMessage: Message, roomId: string | number, pet: {id: string, name: string}, active: boolean}) {
    const navigation: any = useNavigation();
    const navigateToChat = () => {
        console.log("clickou")
        navigation.navigate('chat', {roomId})
        // navigation.navigate('chatRoute', {
        //     screen: 'chat',
        //     params: { roomId: roomId },
        // });
    }
    const parseDateToTimestamp = (date: string) => `${new Date(lastMessage.createdAt).getHours()}:${new Date(lastMessage.createdAt).getMinutes()}`
    return (
        <>
            <Pressable onPress={navigateToChat}>
                <View style={styles.cardContainer}>
                    <View>
                        <Image source={{ uri: user.avatar }} style={styles.cover}/>
                    </View>
                    <View style={{flex: 1,alignItems: "flex-start"}}>
                        <View style={{justifyContent: "space-between", flexDirection: "row", width: "100%"}}>
                            <Text style={{...styles.title, opacity: active ? 1 : 0.5}}>{user.name + " | " + pet.name}</Text>
                            <Text style={styles.timestamp}>{lastMessage? parseDateToTimestamp(lastMessage.createdAt) : ""}</Text>
                        </View>
                        <Text style={styles.content} numberOfLines={1} >{lastMessage? lastMessage.text : ""}</Text>
                    </View>
                </View>
            </Pressable>
        </>
    )
}
const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        borderColor: Colors.grey3,
        borderBottomWidth: 1,
    //   width: "100%",
      padding: 10,
      backgroundColor: Colors.grey5
    },
    cover: {
      height: 48,
      width: 48,
      borderRadius: 50,
      marginRight: 8,
      alignSelf: 'center',
    },
    timestamp: {
        textAlign: 'right',
        fontSize: 12,
        fontFamily: 'Roboto_400Regular',
        color: Colors.textAuxPrimary,
    },
    title: {
      textAlign: 'center',
      fontSize: 14,
      fontFamily: 'Roboto_400Regular',
      fontWeight: 'bold',
      color: Colors.blueHighlight
    },
    content: {
        // width: "100%",
        flex: 1,
      fontFamily: 'Roboto_400Regular',
      fontSize: 14,
      color: Colors.textAuxPrimary,
    //   overflow: 'hidden',
    //   textOverflow: 'ellipsis',
      flexWrap: 'wrap',
    },
  })