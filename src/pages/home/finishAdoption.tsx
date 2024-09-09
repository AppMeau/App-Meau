import { View, Text, StyleSheet } from "react-native";
import Colors from "../../util/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { Portal, Provider, Modal } from "react-native-paper";
import CheckboxContainer from "../../components/checkboxContainer";
import { useEffect, useState } from "react";
import RadioContainer from "../../components/radioContainer";
import Button from "../../components/customButton";
import { getUserPets, getUserPetsWithInteresteds, setUnavailableToAdoption } from "../../redux/pets";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth";
import { getAllInteresteds, getAllInterestedsPetAdoption } from "../../redux/users";
import { closeRoom } from "../../redux/chat";

export default function FinishAdoption({navigation}: any) {
  let content = <View></View>;
  
  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { pets, status, error } = useAppSelector((state) => state.pets);
  const { uid } = useSelector(selectUser);
  const { users } = useAppSelector((state) => state.users)

  useEffect(() => {
    dispatch(getUserPetsWithInteresteds(uid))
  },[dispatch]);

  const [petsInput, setPetsInput] = useState<Array<boolean>>([]);
  const [usersInput, setUsersInput] = useState<string>("");


  function petsInputChangeHandler(petId: string, enteredValue: boolean) {
    const newPetsInputs = pets.map(() => false);
    const index = pets.findIndex(({ id }) => id === petId);
    newPetsInputs[index] = enteredValue;

    dispatch(getAllInterestedsPetAdoption(pets[index].interesteds))
    setPetsInput(newPetsInputs);
  }
  
  function usersInputHandler(user: string){
    setUsersInput(user);
  }

  const navigateToFinalScreenAdoption = () => {
    navigation.navigate('adoptionFinalScreen')
  }
  if (status === "loading") {
    content = <Text>Loading...</Text>;
  }
  else if (status === "succeeded"){
    if (petsInput.length !== pets.length) {
      setPetsInput(pets.map(() => false))
    }
    

    content = (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={[styles.container]}>
            <Portal>
              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ padding: 20, backgroundColor:"white"}}>
                <View>
                  <Text style={{...styles.subtitle, textAlign:"center"}}>LEIA ATENTAMENTE ANTES DE PROSSEGUIR</Text>
                  <Text>
                        Antes de realizar este passo, certifique-se de
                        que o adotante ou padrinho tenha cumprido
                        todos os requisitos prévios à adoção. Além
                        disso, esteja certo de que ele já está em
                        posse do animal em questão.
                        Após finalizar este processo, o seu animal
                        será automaticamente removido da lista de
                        pets para adoção/apadrinhamento.
                        Além disso, é importante ressaltar que as
                        suas informações de cadastro serão
                        disponibilizadas para o usuário que está
                        adotando ou apadrinhando o seu animal,
                        assim como você também terá acesso à
                        todas as informações fornecidas por ele(a).
                        Ao clicar em “li e concorco”, você declara ter
                        lido, compreendido e concordado com os
                        termos acima expostos.
                  </Text>
                <View style={styles.containerButton}>
                  <Button
                    backgroundColor={Colors.bluePrimary}
                    width={180}
                    onPress={async () => {
                      console.log(pets[petsInput.findIndex(pet => pet === true)].id)
                      const petId = pets[petsInput.findIndex(pet => pet === true)].id
                      await dispatch(setUnavailableToAdoption(petId));
                      await dispatch(closeRoom(petId))
                      navigateToFinalScreenAdoption()
                    }}
                  >
                    LI E CONCORDO
                  </Button>
                </View>
                <View style={styles.containerButton}>
                  <Button
                    backgroundColor={Colors.bluePrimary}
                    onPress={hideModal}
                    width={175}
                  >
                    CANCELAR
                  </Button>
                </View>
              </View>
                
              </Modal>
            </Portal>
            <View style={styles.formContainer}>
              <Text style={styles.subtitle}>NOME DO ANIMAL</Text>
              <CheckboxContainer
                states={petsInput}
                onPress={petsInputChangeHandler}
                keys={pets.map((pet) => pet.id)}
                labels={pets.map((pet) => pet.name)}
              />
              {petsInput.some(pet => pet===true) && <View><Text style={styles.subtitle}>SELECIONE O USUÁRIO</Text>
              <RadioContainer
                state={usersInput}
                onPress={usersInputHandler
                }
                labels={users.map((user) => user.name)}
              /></View>}
              

              <View style={styles.containerButton}>
                <Button
                backgroundColor={Colors.bluePrimary}
                onPress={showModal}
                width={210}
                >
                  FINALIZAR PROCESSO
              </Button>
            </View>
            </View>
          </View>
        </ScrollView>
      </View>);
  }
  else{
    content = <Text>Error: {error?.toString()}</Text>;
  }

  return <Provider>{content}</Provider>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    padding: 16,
    gap: 28,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    gap: 8,
  },
  buttons: {
    width: 100,
    height: 40,
    // borderWidth: 2,
    // borderColor: Colors.yellowPrimary,
  },
  buttonsText: {
    fontSize: 12,
  },
  notice: {
    width: "100%",
    height: 100,
    backgroundColor: Colors.blueSecundary,
    borderWidth: 4,
    borderColor: Colors.blueSecundary,
    padding: 8,
  },
  textNotice: {
    textAlign: "center",
    fontSize: 14,
    color: Colors.textAuxPrimary,
    fontFamily: "Roboto_400Regular",
  },
  subtitle: {
    color: Colors.bluePrimary,
    paddingHorizontal: 8,
  },
  sectionText: {
    fontSize: 16,
  },
  formContainer: {
    width: "100%",
    textAlign: "left",
    gap: 20,
  },
  containerPhoto: {
    width: 312,
    height: 128,
    backgroundColor: Colors.grey5,
    borderWidth: 2,
    borderColor: Colors.grey5,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  textContainerPhoto: {
    color: Colors.textAuxSecondary,
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
  },
  img: {
    width: 312,
    height: 128,
  },
  radioButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  containerButton:{
    display: "flex",
    flexDirection: "row",
    paddingTop: "5%",
    justifyContent: "space-around",
    width: "100%",
  }
});



