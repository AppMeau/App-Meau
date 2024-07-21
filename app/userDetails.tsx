import { router } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function UserDetails({navigation}:{navigation:any}) {

  const navigateToMyPets = () => {
    router.push({pathname: 'animalListing', params: {isToAdopt: 'false'}})
  }

  return (
    <View>
      <Text>User Details</Text>
      <Button onPress={navigateToMyPets}>Meus Pets</Button>
    </View>
  )
}