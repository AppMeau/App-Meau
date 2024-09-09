import { Pressable, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { User } from "../schemas/UserRegister/userRegister";
import { useNavigation } from "@react-navigation/native";
import Colors from "../util/Colors";
import { PetRegisterType } from "../schemas/PetRegister/petRegisterTypes";

export default function InterestedsCard({user, pet}: {user: User, pet: PetRegisterType}) {
  const navigation: any = useNavigation();

  const navigateToUserProfile = () => {
    navigation.navigate('userProfile', {
      user: user,
      pet: pet,
    })
  }

  return (
    <Pressable style={styles.container} onPress={navigateToUserProfile} >
      <Card mode="contained" style={styles.cardContainer}>
        <Card.Cover source={{ uri: user.photo }} style={styles.cover}/>
        <Card.Title 
          title={user.name} 
          titleStyle={styles.title} 
        />
        <Card.Content style={styles.contentCard}>
          <Text>{user.age} anos</Text>
        </Card.Content>
      </Card>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    width: 140,
    padding: 10,
    backgroundColor: Colors.grey5
  },
  cover: {
    height: 84,
    width: 84,
    borderRadius: 50,
    alignSelf: 'center',
  },
  title: {
    // width: '100%',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
    color: Colors.textAuxPrimary,
  },
  contentCard: {
    // width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: Colors.textAuxPrimary,
    flexWrap: 'wrap',
  },
})