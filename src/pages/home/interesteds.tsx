import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import InterestedsCard from "../../components/interestedCard";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAllInteresteds } from "../../redux/users";
import { useEffect } from "react";
import { User } from "../../schemas/UserRegister/userRegister";
import { PetRegisterType } from "../../schemas/PetRegister/petRegisterTypes";
import { Button } from "react-native-paper";
import Colors from "../../util/Colors";

export default function Interesteds({route}: any) {
  const dispatch = useAppDispatch()

  const animal: PetRegisterType = route.params.animal
  
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
          renderItem={({ item }) => <InterestedsCard user={item} pet={animal} />}
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