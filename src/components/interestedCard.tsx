import { Pressable, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { User } from "../schemas/UserRegister/userRegister";
import { useNavigation } from "@react-navigation/native";

export default function InterestedsCard({user}: {user: User}) {
  const navigation = useNavigation();

  const navigateToNewChat = () => {
    // navigation.navigate('chat')
  }

  return (
    <Pressable style={styles.container} onPress={navigateToNewChat} >
      <Card style={styles.cardContainer}>
        <Card.Cover source={{ uri: user.photo }} style={styles.cover}/>
        <Card.Title 
          title={user.name} 
          titleStyle={styles.title} 
        />
        <Card.Content style={styles.contentCard}>
          <Text>{user.age}</Text>
        </Card.Content>
      </Card>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {},
  cardContainer: {},
  cover: {},
  title: {},
  contentCard: {},
})