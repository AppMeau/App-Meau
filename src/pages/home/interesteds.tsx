import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import InterestedsCard from "../../components/interestedCard";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { findPet, getInterestedUsers } from "../../redux/pets";
import { useEffect } from "react";
import { User } from "../../schemas/UserRegister/userRegister";
import { PetRegisterType } from "../../schemas/PetRegister/petRegisterTypes";
import { Button, Dialog, Portal, Provider } from "react-native-paper";
import Colors from "../../util/Colors";
import { clearCurrentUser } from "../../redux/users";
import { useNavigation } from "@react-navigation/native";

export default function Interesteds({route}: any) {
  const dispatch = useAppDispatch()

  const petId: string = route.params.petId
  const {currentUser} = useAppSelector(state=>state.users)
  const {status} = useAppSelector(state=>state.users)
  const clearUser = ()=>dispatch(clearCurrentUser())
  useEffect(() => {
    clearUser()
    if(petId) {
      dispatch(getInterestedUsers(petId))
      dispatch(findPet(petId))
    }
  }, [])
  const {currentPetInteresteds} = useAppSelector((state) => state.pets)
  const {currentPet} = useAppSelector((state) => state.pets)
  const navigation: any = useNavigation();

  return (
    <Provider>
      <View style={styles.outerContainer}>
        <FlatList
          style={{flex:1}}
          data={currentPetInteresteds}
          refreshControl={<RefreshControl onRefresh={()=>{dispatch(getInterestedUsers(petId))}} refreshing={status=="loading"}/>}
          keyExtractor={(user) => user?.uid}
          renderItem={({ item }) => <InterestedsCard user={item} pet={currentPet} />}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
        />
        <Button labelStyle={styles.btnLabel} style={styles.btn}>TODAS AS CONVERSAS</Button>
        <Portal>
              <Dialog
                visible={!!currentUser}
                onDismiss={clearUser}
                style={styles.dialog}
              >
                <Dialog.Title>Escolha uma opção:</Dialog.Title>
                <Dialog.Actions>
                  <Button
                    onPress={() => {
                      navigation.navigate('userProfile', {
                        user: currentUser,
                        pet: currentPet,
                      })
                      clearUser()
                    }}
                    textColor={Colors.bluePrimary}
                  >
                    Perfil
                  </Button>
                  <Button
                    onPress={() => {
                      clearUser()
                    }}
                    textColor={Colors.bluePrimary}
                  >
                    Adoção
                  </Button>
                  <Button
                    onPress={() => {
                      clearUser()
                    }}
                    textColor={Colors.bluePrimary}
                  >
                    Chat
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
      </View>
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
})