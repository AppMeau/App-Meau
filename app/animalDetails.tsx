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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Image } from 'expo-image';
import { db, storage } from '../util/firebase';
import { QuerySnapshot, collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import CustomButton from "../components/customButton";



export default function AnimalDetails() {
  const insets = useSafeAreaInsets();
  const colRef = collection(db, "pets")

  const [pet, setPet] = useState<any>();
  
  useEffect(() => {
    async function fetchPets(){
        const colSnap = await getDocs(query (colRef, where("__name__",  "==", "LtQfVoA5m3jDsYgGVzo0")))
        const petinfo = colSnap.docs.map((doc) => doc.data());
        console.log(petinfo)
        setPet(petinfo[0]);
    }
    fetchPets().catch(e => console.error(e))
  }, [setPet])

  function displayinfosBehavior(){
    const behaviors = []
    if(pet.playfull){
        behaviors.push("Brincalhão")
    }
    if(pet.shy){
        behaviors.push("Tímido")
    }
    if(pet.calm){
        behaviors.push("Calmo")
    }
    if(pet.guard){
        behaviors.push("Guarda")
    }
    if(pet.lovely){
        behaviors.push("Amoroso")
    }
    if(pet.lazy){
        behaviors.push("Preguiçoso")
    }

    return behaviors.join(", ")

  }

  function displayinfosAdoptionRequirements(){
    const requirements = []
    if(pet.adoptionTerm){
        requirements.push("Termo de adoção")
    }
    if(pet.homePhotos){
        requirements.push("Fotos da casa")
    }
    if(pet.previousVisit){
        requirements.push("Visita prévia ao animal")
    }
    if(pet.acompanyBeforeAdoption){
        requirements.push("Acompanhamento pós adoção")
    }

    return requirements.join(", ")
    
  }

  function render() {
    if(!pet) {
        return <></>;
    }

     return (
        <View style={{ flex: 1 }}>
        <ScrollView>
            <View style={[styles.container]}>
            <View style={styles.pictureContainer}>
                <Image style={styles.picture} source={{ uri: pet.photo}} />
            </View>
            <View style={styles.infosContainer}>
                <Text style={[{fontWeight: "bold"}]}>{pet.name}</Text>
            </View>
            <View style={styles.infosContainer}>
                <Text style={styles.subtitle}>SEXO</Text>
                <Text style={styles.subtitle}>PORTE</Text>
                <Text style={styles.subtitle}>IDADE</Text>
            </View>
            <View style={styles.infosContainer}>
                <Text style={styles.infos}>{pet.gender}</Text>
                <Text style={styles.infos}>{pet.size}</Text>
                <Text style={styles.infos}>{pet.age}</Text>
            </View>
            <View style={styles.infosContainer}>
                <Text style={styles.subtitle}>LOCALIZAÇÃO</Text>
            </View>
            <View style={styles.infosContainer}>
                <Text style={styles.infos}></Text>
            </View>
            <View style={styles.infosContainer}>
                <Text style={styles.subtitle}>CASTRADO</Text>
                <Text style={styles.subtitle}>VERMIFUGADO</Text>
            </View>
            <View style={styles.infosContainer}>
                <Text style={styles.infos}>{pet.castrated ? "Sim" : "Não"}</Text>
                <Text style={styles.infos}>{pet.dewormed ? "Sim" : "Não"}</Text>
            </View>
            <View style={styles.infosContainer}>
                <Text style={styles.subtitle}>VACINADO</Text>
                <Text style={styles.subtitle}>DOENÇAS</Text>
            </View>
            <View style={styles.infosContainer}>
                <Text style={styles.infos}>{pet.vaccinated ? "Sim" : "Não"}</Text>
                <Text style={styles.infos}>{pet.sick ? pet.sickness : "Não"}</Text>
            </View>
             <View style={styles.infosContainer}>
                <Text style={styles.subtitle}>TEMPERAMENTO</Text>
            </View>
            <View style={styles.infosContainer}>
                <Text style={styles.infos}>{displayinfosBehavior()}</Text>                
            </View>
            <View style={styles.infosContainer}>
                <Text style={styles.subtitle}>O {pet.name.toUpperCase()} PRECISA DE</Text>
            </View>
            <View style={styles.infosContainer}>
                <Text style={styles.infos}></Text>                
            </View>
            <View style={styles.infosContainer}>
                <Text style={styles.subtitle}>EXIGÊNCIAS DO DOADOR</Text>
            </View>
            <View style={styles.infosContainer}>
                <Text style={styles.infos}>{displayinfosAdoptionRequirements()}</Text>                
            </View>
            <View style={styles.infosContainer}>
                <Text style={styles.subtitle}>MAIS SOBRE</Text>
            </View>
            <View style={styles.infosContainer}>
                <Text style={styles.infos}>{pet.about}</Text>                
            </View>
            <View style={styles.containerButton}>
              <CustomButton
                backgroundColor={Colors.yellowPrimary}
                onPress={null}
                width={150}
              >
                VER INTERESSADOS
              </CustomButton>
              <CustomButton
                backgroundColor={Colors.yellowPrimary}
                onPress={null}
                width={150}
              >
                REMOVER PET
              </CustomButton>
            </View>
            </View>
        </ScrollView>
        </View>
    );
  }
  
  return render();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    gap: 28,
  },
  pictureContainer:{
    width: "100%",
    height: "30%"
  },
  picture:{
    width: "100%",
    height: "100%"
  },
  infosContainer:{
    paddingLeft: 16,
    display: "flex",
    width: "100%",
    paddingHorizontal: 8,
    flexWrap: "wrap",
    flexDirection: "row",
    gap:80,
  },
  subtitle: {
    color: Colors.bluePrimary,
    flex: 1,
  },
  infos:{
    flex: 1,
  },
  containerButton:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    
  }
});