import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header, { headerSize } from "../components/header";
import Colors from "../util/Colors";
import InputComponent from "../components/input";
import { lazy, useEffect, useState } from "react";
import CustomButton from "../components/customButton";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";
import RadioContainer from "../components/radioContainer";
import CheckboxContainer from "../components/checkboxContainer";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { db, storage } from '../util/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import imageHandler from "../util/functions/ImageHandler";

export default function AnimalRegister() {
  const insets = useSafeAreaInsets();

  // const [goal, setGoal] = useState("Adoção");
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoDownloadUrl, setPhotoDowloadUrl] = useState("");

  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [age, setAge] = useState("");

  // TEMPERAMENTO
  const [playfull, setPlayfull] = useState(false);
  const [shy, setShy] = useState(false);
  const [calm, setCalm] = useState(false);
  const [guard, setGuard] = useState(false);
  const [lovely, setLovely] = useState(false);
  const [lazy, setLazy] = useState(false);

  // SAÚDE
  const [vaccinated, setVaccinated] = useState(false);
  const [dewormed, setDewormed] = useState(false);
  const [castrated, setCastrated] = useState(false);
  const [sick, setSick] = useState(false);
  const [sickness, setSickness] = useState("");

  // EXIGÊNCIAS PARA ADOÇÃO
  const [adoptionTerm, setAdoptionTerm] = useState(false);
  const [homePhotos, setHomePhotos] = useState(false);
  const [previousVisit, setPreviousVisit] = useState(false);
  const [acompanyBeforeAdoption, setAcompanyBeforeAdoption] = useState(false);
  const [oneMonth, setOneMonth] = useState(false);
  const [threeMonths, setThreeMonths] = useState(false);
  const [sixMonths, setSixMonths] = useState(false);

  const [about, setAbout] = useState("");
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (acompanyBeforeAdoption === true) {
      setDisable(false);
    } else {
      setAcompanyBeforeAdoption(false);
      setDisable(true);
    }
  }, [acompanyBeforeAdoption]);

  const handleSubmit = async () => {
    
    const url = await imageHandler('images/pets/', photoUrl, name);

    const docData = {
      name: name,
      photo: url,
      species: species,
      gender: gender,
      size: size,
      age: age,
      playfull: playfull,
      shy: shy,
      calm: calm,
      guard: guard,
      lovely: lovely,
      lazy: lazy,
      vaccinated: vaccinated,
      dewormed: dewormed,
      castrated: castrated,
      sick: sick,
      sickness: sickness,
      adoptionTerm: adoptionTerm,
      homePhotos: homePhotos,
      previousVisit: previousVisit,
      acompanyBeforeAdoption: acompanyBeforeAdoption,
      oneMonth: oneMonth,
      threeMonths: threeMonths,
      sixMonths: sixMonths,
      about: about,
      disable: disable,
    }
    try {
      const newDoc = await addDoc(collection(db, "pets"), docData);
    }catch(e){
      console.log(e)
    }
    router.navigate("/login");
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUrl(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };
  
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={[styles.container, {paddingTop: insets.top+headerSize}]}>
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
              rule={(val) => val !== ""}
              placeholder="Nome do animal"
              value={name}
              onChangeText={(newName) => setName(newName)}
            />

            <Text style={styles.subtitle}>FOTOS DO ANIMAL</Text>

            <View style={styles.container}>
              <Pressable onPress={pickImageAsync}>
                <View style={styles.containerPhoto}>
                  {photoUrl !== null ? (
                    <Image source={{ uri: photoUrl }} style={styles.img} />
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
            <RadioContainer state={species} onPress={setSpecies} labels={["Cachorro", "Gato"]} />

            <Text style={styles.subtitle}>SEXO</Text>
            <RadioContainer state={gender} onPress={setGender} labels={["Macho", "Fêmea"]} />

            <Text style={styles.subtitle}>PORTE</Text>
            <RadioContainer state={size} onPress={setSize} labels={["Pequeno", "Médio", "Grande"]} />

            <Text style={styles.subtitle}>IDADE</Text>
            <RadioContainer state={age} onPress={setAge} labels={["Filhote", "Adulto", "Idoso"]} />

            <Text style={styles.subtitle}>TEMPERAMENTO</Text>
            <CheckboxContainer
              states={[playfull, shy, calm, guard, lovely, lazy]}
              onPress={[
                setPlayfull,
                setShy,
                setCalm,
                setGuard,
                setLovely,
                setLazy,
              ]}
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
              states={[vaccinated, dewormed, castrated, sick]}
              onPress={[setVaccinated, setDewormed, setCastrated, setSick]}
              labels={["Vacinado", "Vermifugado", "Castrado", "Doente"]}
            />
            <InputComponent
              lazy
              rule={(val) => val !== ""}
              placeholder="Doenças do animal"
              value={sickness}
              onChangeText={setSickness}
            />

            <Text style={styles.subtitle}>EXIGÊNCIAS PARA ADOÇÃO</Text>
            <CheckboxContainer
              states={[
                adoptionTerm,
                homePhotos,
                previousVisit,
                acompanyBeforeAdoption,
              ]}
              onPress={[
                setAdoptionTerm,
                setHomePhotos,
                setPreviousVisit,
                setAcompanyBeforeAdoption,
              ]}
              labels={[
                "Termo de adoção",
                "Fotos da casa",
                "Visita prévia ao animal",
                "Acompanhamento pós adoção",
              ]}
            />
            <CheckboxContainer
              states={[oneMonth, threeMonths, sixMonths]}
              onPress={[setOneMonth, setThreeMonths, setSixMonths]}
              disable={disable}
              labels={["1 mês", "3 meses", "6 meses"]}
            />

            <Text style={styles.subtitle}>SOBRE O ANIMAL</Text>
            <InputComponent
              lazy
              rule={(val) => val !== ""}
              placeholder="Compartilhe a história do animal"
              value={about}
              onChangeText={setAbout}
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
