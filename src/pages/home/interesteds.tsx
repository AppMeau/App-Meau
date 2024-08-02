import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { animalRegisterType } from "../../schemas/AnimalRegister/animalRegisterTypes";
import InterestedsCard from "../../components/interestedCard";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAllInteresteds } from "../../redux/users";
import { useEffect } from "react";
import { User } from "../../schemas/UserRegister/userRegister";

export default function Interesteds({route}: any) {
  const dispatch = useAppDispatch()

  const animal: animalRegisterType = route.params.animal
  
  useEffect(() => {
    if(animal.interesteds) {
      dispatch(getAllInteresteds(animal.interesteds))
    }
  }, [])
  const {users} = useAppSelector((state) => state.users)

  return (
    <View style={styles.outerContainer}>
      {users.length === 0 ? (
        <Text>Nenhum usuário interessado neste animal</Text>
      ):(
        <FlatList
          data={users}
          keyExtractor={(user) => user.uid}
          renderItem={({ item }) => <InterestedsCard user={item} />}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
        />
      )} 
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  rowContainer: {
    gap: 72,
    flexDirection: 'row',
    padding: 12,
    alignContent: 'center',
    justifyContent: 'center',
  },
  flatListContainer: {
    justifyContent: 'space-between',
  },
})