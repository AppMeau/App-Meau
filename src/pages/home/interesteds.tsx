import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import InterestedsCard from "../../components/interestedCard";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { findPet, getInterestedUsers } from "../../redux/pets";
import { useEffect } from "react";
import { User } from "../../schemas/UserRegister/userRegister";
import { PetRegisterType } from "../../schemas/PetRegister/petRegisterTypes";
import { Button } from "react-native-paper";
import Colors from "../../util/Colors";

export default function Interesteds({route}: any) {
  const dispatch = useAppDispatch()

  const petId: string = route.params.petId
  
  useEffect(() => {
    if(petId) {
      dispatch(getInterestedUsers(petId))
      dispatch(findPet(petId))
    }
  }, [])
  const {currentPetInteresteds} = useAppSelector((state) => state.pets)
  const {currentPet} = useAppSelector((state) => state.pets)

  return (
    <View style={styles.outerContainer}>
      {currentPetInteresteds.length === 0 ? (
        <Text>Nenhum usuário interessado neste animal</Text>
      ):(
        <FlatList
          data={currentPetInteresteds}
          keyExtractor={(user) => user.uid}
          renderItem={({ item }) => <InterestedsCard user={item} pet={currentPet} />}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
        />
      )} 
      <Button labelStyle={styles.btnLabel} style={styles.btn}>TODAS AS CONVERSAS</Button>
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
  btn: {
    width: '80%',
    borderRadius: 3,
    backgroundColor: Colors.bluePrimary,
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  btnLabel: {
    color: Colors.textAuxPrimary,
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
  }
})