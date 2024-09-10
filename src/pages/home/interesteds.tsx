import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import InterestedsCard from "../../components/interestedCard";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { findPet, getInterestedUsers } from "../../redux/pets";
import { useEffect } from "react";
import { Button, Dialog, Portal, Provider } from "react-native-paper";
import Colors from "../../util/Colors";
import { clearCurrentInterested } from "../../redux/users";
import { User } from "../../schemas/UserRegister/userRegister";
import { PetRegisterType } from "../../schemas/PetRegister/petRegisterTypes";
import { useNavigation } from "@react-navigation/native";

export default function Interesteds({route}: any) {
  const dispatch = useAppDispatch()
  const navigation: any = useNavigation();

  const petId: string = route.params.petId
  const clear = () => dispatch(clearCurrentInterested())
  const {currentPetInteresteds} = useAppSelector((state) => state.pets)
  const {currentPet} = useAppSelector((state) => state.pets)
  const {currentInterested} = useAppSelector((state) => state.users)
  useEffect(() => {
    clear()
    if(petId) {
      dispatch(getInterestedUsers(petId))
      dispatch(findPet(petId))
    }
  }, [])

  return (
    <Provider>
      <View style={styles.outerContainer}>
        {currentPetInteresteds && currentPetInteresteds.length === 0 ? (
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
      <Portal>
            <Dialog
              visible={currentInterested !== null}
              onDismiss={() => {
                console.log(currentInterested)
                clear()
              }}
              style={styles.dialog}
            >
              <Dialog.Title>Escolha uma opção:</Dialog.Title>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    clear()
                  }}
                  textColor={Colors.bluePrimary}
                >
                  Adoção
                </Button>
                <Button
                  onPress={() => {
                    clear()
                  }}
                  textColor={Colors.bluePrimary}
                >
                  Remover
                </Button>
                <Button
                  onPress={() => {
                    clear()
                  }}
                  textColor={Colors.bluePrimary}
                >
                  Chat
                </Button>
                <Button
                  onPress={() => {
                    navigation.navigate('userProfile', {
                      user: currentInterested,
                      pet: currentPet,
                    })
                  }}
                  textColor={Colors.bluePrimary}
                >
                  Perfil
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
    </Provider>
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
  },
  dialog: {
    borderRadius: 8,
    backgroundColor: "white",
    alignItems: "center",
  },
});
