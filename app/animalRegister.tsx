import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CheckboxContainer from "../components/checkboxContainer";
import CustomButton from "../components/customButton";
import { headerSize } from "../components/header";
import InputComponent from "../components/input";
import RadioContainer from "../components/radioContainer";
import {
  animalSchema,
  baseAnimalSchema,
} from "../schemas/AnimalRegister/animalRegisterTypes";
import Colors from "../util/Colors";
import { db } from "../util/firebase";
import imageHandler from "../util/functions/ImageHandler";

export default function AnimalRegister() {
  const insets = useSafeAreaInsets();
  const [inputs, setInputs] = useState({
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
  });

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
    }
  }, [inputs.sick]);

  function inputChangedHandler(inputIdentifier: string, enteredValue: any) {
    setInputs((currentInput) => {
      return {
        ...currentInput,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  const handleSubmit = async () => {
    const url = await imageHandler(
      "images/pets/",
      inputs.photoUrl,
      inputs.name,
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
    };
    try {
      animalSchema.parse(docData);
      await addDoc(collection(db, "pets"), docData);
      router.navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      inputChangedHandler("photoUrl", result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={[styles.container, { paddingTop: insets.top + headerSize }]}
        >
          <View style={styles.formContainer}>
            <Text>Tenho interesse em cadastrar o animal para:</Text>
            <View style={styles.buttonsContainer}>
              <Button
                mode="elevated"
                buttonColor={Colors.yellowPrimary}
                textColor={Colors.textAuxPrimary}
                contentStyle={styles.buttons}
                theme={{ roundness: 1 }}
                labelStyle={styles.buttonsText}
              >
                ADOÇÃO
              </Button>
            </View>

            <Text style={styles.sectionText}>Adoção</Text>

            <Text style={styles.subtitle}>NOME DO ANIMAL</Text>
            <InputComponent
              lazy
              rule={(val) => {
                return (
                  baseAnimalSchema
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
              <Pressable onPress={pickImageAsync}>
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
                  baseAnimalSchema
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
            />

            <View style={styles.container}>
              <CustomButton
                backgroundColor={Colors.yellowPrimary}
                onPress={handleSubmit}
              >
                COLOCAR PARA ADOÇÃO
              </CustomButton>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
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
    fontFamily: "roboto-regular",
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
    fontFamily: "roboto-regular",
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
});
