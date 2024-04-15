import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import CustomButton from "../components/customButton";
import Header from "../components/header";
import InputComponent from "../components/input";
import Colors from "../util/Colors";

export default function Page() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [photo, setPhoto] = useState<null | string>(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("email", email);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("adress", adress);
    formData.append("phone", phone);
    formData.append("user", user);
    formData.append("password", password);
    formData.append("password", password);
    // formData.append('photo', {uri: photo, name: 'image.jpg', type: 'image/jpeg'})
    router.replace("/login");
  };

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header bgColor={Colors.blueSecundary} title="Cadastro Pessoal" search />

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.notice}>
            <Text style={styles.textNotice}>
              As informações preenchidas serão divulgadas apenas para a pessoa
              com a qual você realizar o processo de adoção e/ou apadrinhamento,
              após a formalização do processo.
            </Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.subtitle}>INFORMAÇÕES PESSOAIS</Text>
            <InputComponent
              lazy
              rule={(val) => val !== ""}
              placeholder="Nome Completo"
              value={name}
              onChangeText={setName}
            />
            <InputComponent
              lazy
              rule={(val) => val !== ""}
              placeholder="Idade"
              value={age}
              onChangeText={setAge}
            />
            <InputComponent
              lazy
              rule={(val) => val !== ""}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <InputComponent
              lazy
              rule={(val) => val !== ""}
              placeholder="Estado"
              value={state}
              onChangeText={setState}
            />
            <InputComponent
              lazy
              rule={(val) => val !== ""}
              placeholder="Cidade"
              value={city}
              onChangeText={setCity}
            />
            <InputComponent
              lazy
              rule={(val) => val !== ""}
              placeholder="Endereço"
              value={adress}
              onChangeText={setAdress}
            />
            <InputComponent
              lazy
              rule={(val) => val !== ""}
              placeholder="Telefone"
              value={phone}
              onChangeText={setPhone}
            />
            <Text style={styles.subtitle}>INFORMAÇÕES DE PERFIL</Text>
            <InputComponent
              lazy
              rule={(val) => val !== ""}
              placeholder="Nome de Usuário"
              value={user}
              onChangeText={setUser}
            />
            <InputComponent
              lazy
              type="password"
              rule={(val) => val !== ""}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
            <InputComponent
              lazy
              type="password"
              rule={(val) => val === password}
              placeholder="Confirmação de Senha"
              value={passwordConfirmation}
              onChangeText={setPasswordConfirmation}
            />

            <Text style={styles.subtitle}>FOTO DE PERFIL</Text>

            <View style={styles.container}>
              <Pressable onPress={pickImageAsync}>
                <View style={styles.containerPhoto}>
                  {photo !== null ? (
                    <Image source={{ uri: photo }} style={styles.img} />
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
    fontFamily: "roboto-regular",
    fontSize: 14,
  },
  img: {
    width: 128,
    height: 128,
  },
});
