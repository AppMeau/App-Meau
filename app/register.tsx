import { MaterialIcons } from "@expo/vector-icons";
import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import { useFonts } from "expo-font";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
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
import { Button, Dialog, Portal, Provider } from "react-native-paper";

import CustomButton from "../components/customButton";
import InputComponent from "../components/input";
import type { User } from "../schemas/UserRegister/userRegister";
import { userSchema } from "../schemas/UserRegister/userRegister";
import Colors from "../util/Colors";
import { db, firebase } from "../util/firebase";
import imageHandler from "../util/functions/ImageHandler";

export default function Register() {
  const [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
  });
  const [inputs, setInputs] = useState({
    name: "",
    age: "",
    email: "",
    state: "",
    city: "",
    adress: "",
    phone: "",
    user: "",
    password: "",
    passwordConfirmation: "",
    photoUrl: null,
  });

  function inputChangedHandler(inputIdentifier: string, enteredValue: any) {
    setInputs((currentInput) => {
      return {
        ...currentInput,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  const [showPhotoDialog, setShowPhotoDialog] = useState(false);
  const [isFromGallery, setIsFromGallery] = useState<boolean | null>(null);

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

  const handleSubmit = async () => {
    const url = await imageHandler(
      "images/users/",
      inputs.photoUrl,
      inputs.name,
    );

    const docData: User = {
      name: inputs.name,
      age: inputs.age,
      email: inputs.email,
      state: inputs.state,
      city: inputs.city,
      address: inputs.adress,
      phone: inputs.phone,
      user: inputs.user,
      password: inputs.password,
      photo: url ? url : "",
    };
    try {
      const auth = getAuth(firebase);
      const newUser = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password,
      );
      if (newUser) {
        userSchema.parse(docData);
        await addDoc(collection(db, "users"), {
          ...docData,
          uid: newUser.user.uid,
        });
      }
      router.navigate("login");
    } catch (e) {
      console.log(e);
    }
  };
  const hideDialog = () => setShowPhotoDialog(false);

  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={[styles.container]}>
            <View style={styles.notice}>
              <Text style={styles.textNotice}>
                As informações preenchidas serão divulgadas apenas para a pessoa
                com a qual você realizar o processo de adoção e/ou
                apadrinhamento, após a formalização do processo.
              </Text>
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.subtitle}>INFORMAÇÕES PESSOAIS</Text>
              <InputComponent
                lazy
                rule={(val) => {
                  return (
                    userSchema
                      .pick({ name: true })
                      .safeParse({ name: val })
                      .success.toString() !== "false"
                  );
                }}
                placeholder="Nome Completo"
                value={inputs.name}
                onChangeText={(enteredValue) =>
                  inputChangedHandler("name", enteredValue)
                }
              />
              <InputComponent
                lazy
                rule={(val) => {
                  return (
                    userSchema
                      .pick({ age: true })
                      .safeParse({ age: val })
                      .success.toString() !== "false"
                  );
                }}
                placeholder="Idade"
                keyboardType="decimal-pad"
                value={inputs.age}
                onChangeText={(enteredValue) =>
                  inputChangedHandler("age", enteredValue)
                }
              />
              <InputComponent
                lazy
                rule={(val) => {
                  return (
                    userSchema
                      .pick({ email: true })
                      .safeParse({ email: val })
                      .success.toString() !== "false"
                  );
                }}
                placeholder="Email"
                value={inputs.email}
                onChangeText={(enteredValue) =>
                  inputChangedHandler("email", enteredValue)
                }
              />
              <InputComponent
                lazy
                rule={(val) => {
                  return (
                    userSchema
                      .pick({ state: true })
                      .safeParse({ state: val })
                      .success.toString() !== "false"
                  );
                }}
                placeholder="Estado"
                value={inputs.state}
                onChangeText={(enteredValue) =>
                  inputChangedHandler("state", enteredValue)
                }
              />
              <InputComponent
                lazy
                rule={(val) => {
                  return (
                    userSchema
                      .pick({ city: true })
                      .safeParse({ city: val })
                      .success.toString() !== "false"
                  );
                }}
                placeholder="Cidade"
                value={inputs.city}
                onChangeText={(enteredValue) =>
                  inputChangedHandler("city", enteredValue)
                }
              />
              <InputComponent
                lazy
                rule={(val) => {
                  return (
                    userSchema
                      .pick({ address: true })
                      .safeParse({ address: val })
                      .success.toString() !== "false"
                  );
                }}
                placeholder="Endereço"
                value={inputs.adress}
                onChangeText={(enteredValue) =>
                  inputChangedHandler("adress", enteredValue)
                }
              />
              <InputComponent
                lazy
                rule={(val) => {
                  return (
                    userSchema
                      .pick({ phone: true })
                      .safeParse({ phone: val })
                      .success.toString() !== "false"
                  );
                }}
                placeholder="Telefone"
                value={inputs.phone}
                onChangeText={(enteredValue) =>
                  inputChangedHandler("phone", enteredValue)
                }
              />
              <Text style={styles.subtitle}>INFORMAÇÕES DE PERFIL</Text>
              <InputComponent
                lazy
                rule={(val) => {
                  return (
                    userSchema
                      .pick({ user: true })
                      .safeParse({ user: val })
                      .success.toString() !== "false"
                  );
                }}
                placeholder="Nome de Usuário"
                value={inputs.user}
                onChangeText={(enteredValue) =>
                  inputChangedHandler("user", enteredValue)
                }
              />
              <InputComponent
                lazy
                type="password"
                rule={(val) => {
                  return (
                    userSchema
                      .pick({ password: true })
                      .safeParse({ password: val })
                      .success.toString() !== "false"
                  );
                }}
                placeholder="Senha"
                value={inputs.password}
                onChangeText={(enteredValue) =>
                  inputChangedHandler("password", enteredValue)
                }
              />
              <InputComponent
                lazy
                type="password"
                rule={(val) => val === inputs.password}
                placeholder="Confirmação de Senha"
                value={inputs.passwordConfirmation}
                onChangeText={(enteredValue) =>
                  inputChangedHandler("passwordConfirmation", enteredValue)
                }
              />

              <Text style={styles.subtitle}>FOTO DE PERFIL</Text>

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

                <CustomButton
                  backgroundColor={Colors.bluePrimary}
                  onPress={handleSubmit}
                >
                  FAZER CADASTRO
                </CustomButton>
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
    color: Colors.blueHighlight,
    paddingHorizontal: 8,
  },
  formContainer: {
    width: "100%",
    textAlign: "left",
    gap: 20,
  },
  containerPhoto: {
    width: 128,
    height: 128,
    backgroundColor: Colors.grey2,
    borderWidth: 2,
    borderColor: Colors.grey2,
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
    width: 128,
    height: 128,
  },
  dialog: {
    borderRadius: 8,
    backgroundColor: "white",
    alignItems: "center",
  },
});
