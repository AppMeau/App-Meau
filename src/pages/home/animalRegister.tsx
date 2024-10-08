import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as ImagePicker from "expo-image-picker";
import { collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Dialog, Portal, Provider } from "react-native-paper";

import CheckboxContainer from "../../components/checkboxContainer";
import CustomButton from "../../components/customButton";
import InputComponent from "../../components/input";
import RadioContainer from "../../components/radioContainer";
import {
  PetSchema,
  basePetSchema,
} from "../../schemas/PetRegister/petRegisterTypes";
import Colors from "../../util/Colors";
import { db } from "../../util/firebase";
import imageHandler from "../../util/functions/ImageHandler";
import { NavigationProp } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth";
import Interesteds from "./interesteds";

export default function AnimalRegister({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const defaultInputs = {
    name: "",
    photoUrl: null,
    photoDownloadUrl: "",

    species: "Cachorro",
    gender: "Macho",
    size: "Pequeno",
    age: "Filhote",

    // TEMPERAMENTO
    playfull: false,
    shy: false,
    calm: false,
    guard: false,
    lovely: false,
    lazy: false,

    // SAÚDE
    vaccinated: false,
    dewormed: false,
    castrated: false,
    sick: false,
    sickness: "",

    // EXIGÊNCIAS PARA ADOÇÃO
    adoptionTerm: false,
    homePhotos: false,
    previousVisit: false,
    acompanyBeforeAdoption: false,
    periodToAcompany: "",

    about: "",
    disable: false,
  }
  const [inputs, setInputs] = useState({...defaultInputs});

  const [loading, setLoading] = useState(false);
  const [showPhotoDialog, setShowPhotoDialog] = useState(false);
  const [isFromGallery, setIsFromGallery] = useState<boolean | null>(null);
  const [disableSickness, setDisableSickness] = useState(false);
  const [isValidAbout, setIsValidAbout] = useState(true);

  const { uid, city, state } = useSelector(selectUser);

  useEffect(() => {
    if (inputs.acompanyBeforeAdoption === true) {
      inputChangedHandler("disable", false);
    } else {
      inputChangedHandler("acompanyBeforeAdoption", false);
      inputChangedHandler("periodToAcompany", "");
      inputChangedHandler("disable", true);
    }
  }, [inputs.acompanyBeforeAdoption]);

  useEffect(() => {
    if (inputs.sick === false) {
      inputChangedHandler("sickness", "");
      setDisableSickness(true);
    } else {
      setDisableSickness(false);
    }

    if (inputs.about === "") {
      setIsValidAbout(false);
    } else {
      setIsValidAbout(true);
    }
  }, [inputs.sick, inputs.about]);

  function inputChangedHandler(inputIdentifier: string, enteredValue: any) {
    setInputs((currentInput) => {
      return {
        ...currentInput,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  useEffect(() => {
    const pickImageAsync = async () => {
      let result;
      if (isFromGallery) {
        result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });
      } else {
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 1,
        });
      }

      if (!result.canceled) {
        inputChangedHandler("photoUrl", result.assets[0].uri);
      } else {
        alert("You did not select any image.");
      }
    };

    if (isFromGallery !== null) {
      pickImageAsync();
      setIsFromGallery(null);
    }
  }, [showPhotoDialog, isFromGallery]);

  const hideDialog = () => setShowPhotoDialog(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const url = await imageHandler(
        "images/pets/",
        inputs.photoUrl,
        inputs.name
      );
      const docData = {
        name: inputs.name,
        photo: url,
        species: inputs.species,
        gender: inputs.gender,
        size: inputs.size,
        age: inputs.age,
        playfull: inputs.playfull,
        shy: inputs.shy,
        calm: inputs.calm,
        guard: inputs.guard,
        lovely: inputs.lovely,
        lazy: inputs.lazy,
        vaccinated: inputs.vaccinated,
        dewormed: inputs.dewormed,
        castrated: inputs.castrated,
        sick: inputs.sick,
        sickness: inputs.sickness,
        adoptionTerm: inputs.adoptionTerm,
        homePhotos: inputs.homePhotos,
        previousVisit: inputs.previousVisit,
        acompanyBeforeAdoption: inputs.acompanyBeforeAdoption,
        periodToAcompany: inputs.periodToAcompany,
        about: inputs.about,
        disable: inputs.disable,
        availableToAdoption: true,
        ownerId: uid,
        ownerCityState: `${city.toUpperCase()} - ${state.toUpperCase()}`,
        interesteds: [],
      };
      PetSchema.parse(docData);
      await addDoc(collection(db, "pets"), docData);
      setInputs({...defaultInputs});
      navigation.navigate("animalListingMyPets");
    } catch (e: any) {
      console.log(e)
      switch(e.message){
        case "Missing file url.":
          Alert.alert("Selecione uma foto para o animal.");
          break;
        case "Missing file name.":
          Alert.alert("Adicione um nome para o animal.");
          break;
      }
    }
    setLoading(false);
  };

  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={[styles.container]}>
            <View style={styles.formContainer}>
              <Text style={styles.subtitle}>NOME DO ANIMAL</Text>
              <InputComponent
                lazy
                rule={(val) => {
                  return (
                    basePetSchema
                      .pick({ name: true })
                      .safeParse({ name: val })
                      .success.toString() !== "false"
                  );
                }}
                placeholder="Nome do animal"
                value={inputs.name}
                onChangeText={(newName) => inputChangedHandler("name", newName)}
              />

              <Text style={styles.subtitle}>FOTOS DO ANIMAL</Text>

              <View style={styles.container}>
                <Pressable onPress={() => setShowPhotoDialog(true)}>
                  <View style={styles.containerPhoto}>
                    {inputs.photoUrl !== null ? (
                      <Image
                        source={{ uri: inputs.photoUrl }}
                        style={styles.img}
                      />
                    ) : (
                      <>
                        <MaterialIcons
                          name="control-point"
                          size={24}
                          color={Colors.textAuxSecondary}
                        />
                        <Text style={styles.textContainerPhoto}>
                          Adicionar foto
                        </Text>
                      </>
                    )}
                  </View>
                </Pressable>
              </View>

              <Text style={styles.subtitle}>ESPÉCIE</Text>
              <RadioContainer
                state={inputs.species}
                onPress={(enteredValue: any) =>
                  inputChangedHandler("species", enteredValue)
                }
                labels={["Cachorro", "Gato"]}
              />

              <Text style={styles.subtitle}>SEXO</Text>
              <RadioContainer
                state={inputs.gender}
                onPress={(enteredValue: any) =>
                  inputChangedHandler("gender", enteredValue)
                }
                labels={["Macho", "Fêmea"]}
              />

              <Text style={styles.subtitle}>PORTE</Text>
              <RadioContainer
                state={inputs.size}
                onPress={(enteredValue: any) =>
                  inputChangedHandler("size", enteredValue)
                }
                labels={["Pequeno", "Médio", "Grande"]}
              />

              <Text style={styles.subtitle}>IDADE</Text>
              <RadioContainer
                state={inputs.age}
                onPress={(enteredValue: any) =>
                  inputChangedHandler("age", enteredValue)
                }
                labels={["Filhote", "Adulto", "Idoso"]}
              />

              <Text style={styles.subtitle}>TEMPERAMENTO</Text>
              <CheckboxContainer
                states={[
                  inputs.playfull,
                  inputs.shy,
                  inputs.calm,
                  inputs.guard,
                  inputs.lovely,
                  inputs.lazy,
                ]}
                onPress={inputChangedHandler}
                keys={["playfull", "shy", "calm", "guard", "lovely", "lazy"]}
                labels={[
                  "Brincalhão",
                  "Tímido",
                  "Calmo",
                  "Guarda",
                  "Amoroso",
                  "Preguiçoso",
                ]}
              />

              <Text style={styles.subtitle}>SAÚDE</Text>
              <CheckboxContainer
                states={[
                  inputs.vaccinated,
                  inputs.dewormed,
                  inputs.castrated,
                  inputs.sick,
                ]}
                onPress={inputChangedHandler}
                keys={["vaccinated", "dewormed", "castrated", "sick"]}
                labels={["Vacinado", "Vermifugado", "Castrado", "Doente"]}
              />
              <InputComponent
                lazy
                rule={(val) =>
                  (!inputs.sick && val === "") || (inputs.sick && val !== "")
                }
                placeholder="Doenças do animal"
                value={inputs.sickness}
                onChangeText={(enteredValue) =>
                  inputChangedHandler("sickness", enteredValue)
                }
                disabled={disableSickness}
              />

              <Text style={styles.subtitle}>EXIGÊNCIAS PARA ADOÇÃO</Text>
              <CheckboxContainer
                states={[
                  inputs.adoptionTerm,
                  inputs.homePhotos,
                  inputs.previousVisit,
                  inputs.acompanyBeforeAdoption,
                ]}
                onPress={inputChangedHandler}
                keys={[
                  "adoptionTerm",
                  "homePhotos",
                  "previousVisit",
                  "acompanyBeforeAdoption",
                ]}
                labels={[
                  "Termo de adoção",
                  "Fotos da casa",
                  "Visita prévia ao animal",
                  "Acompanhamento pós adoção",
                ]}
              />

              <RadioContainer
                state={inputs.periodToAcompany}
                onPress={(enteredValue: any) =>
                  inputChangedHandler("periodToAcompany", enteredValue)
                }
                labels={["1 Mês", "3 Meses", "6 Meses"]}
                disable={inputs.disable}
              />

              <Text style={styles.subtitle}>SOBRE O ANIMAL</Text>
              <InputComponent
                lazy
                rule={(val) => {
                  return (
                    basePetSchema
                      .pick({ about: true })
                      .safeParse({ about: val })
                      .success.toString() !== "false"
                  );
                }}
                placeholder="Compartilhe a história do animal"
                value={inputs.about}
                onChangeText={(enteredValue) =>
                  inputChangedHandler("about", enteredValue)
                }
                valid={isValidAbout}
              />

              <View style={styles.container}>
              <Button
                  mode="contained" 
                  style={{backgroundColor: Colors.yellowPrimary, width: 200, borderRadius: 8}}
                  labelStyle={{color: Colors.textAuxPrimary, fontFamily: "Roboto_400Regular"}}
                  onPress={handleSubmit}
                  loading={loading}
                >
                  Colocar para adoção
                </Button>
              </View>
            </View>
          </View>

          <Portal>
            <Dialog
              visible={showPhotoDialog}
              onDismiss={hideDialog}
              style={styles.dialog}
            >
              <Dialog.Title>Escolha uma opção:</Dialog.Title>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    setIsFromGallery(false);
                    hideDialog();
                  }}
                  textColor={Colors.bluePrimary}
                >
                  Câmera
                </Button>
                <Button
                  onPress={() => {
                    setIsFromGallery(true);
                    hideDialog();
                  }}
                  textColor={Colors.bluePrimary}
                >
                  Galeria
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </ScrollView>
      </View>
    </Provider>
  );
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
    color: Colors.yellowSecondary,
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
  dialog: {
    borderRadius: 8,
    backgroundColor: "white",
    alignItems: "center",
  },
});
