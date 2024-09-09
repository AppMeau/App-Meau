import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Colors from "../../util/Colors";
import Button from "../../components/customButton";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectUser } from "../../redux/auth";
import { useState } from "react";
import { addInterested, findPet } from "../../redux/pets";
import { useEffect } from "react";
import Header from "../../components/header";

export default function AnimalDetails({route, navigation}: any) {
  const dispatch = useAppDispatch();
  const isToAdopt = route.params.isToAdopt;
  const {uid} = useAppSelector(selectUser)

  const petId: string = route.params.petId;
  const currentPet = useAppSelector((state) => state.pets.currentPet);
  const [isAlreadyInterested, setIsAlreadyInterested] = useState<boolean>(currentPet?.interesteds?.find((interested: {userId: string, isAlreadyInChat: boolean}) => interested.userId === uid) ? true : false);
  useEffect(() => {
    if(petId) {
      dispatch(findPet(petId))
    }
    navigation.setOptions({
      header: ({ navigation, options }: any) => (
        <Header
          color={isToAdopt ? Colors.yellowPrimary : Colors.bluePrimary}
          title={currentPet.name}
          search
          icon="arrow-back"
          onDrawerClick={navigation.goBack}
        />
      ),
    });
  }, [currentPet]);

  function displayObject(pet: any){
    const removeProps = ["id", "name", "photo", "disable", "availableToAdoption", "interesteds", "ownerId"]
    const translateObject = {
      species: "espécie",
      gender: "gênero",
      size: "porte",
      age: "idade",
      vaccinated: "vacinado",
      dewormed: "vermifugado",
      castrated: "castrado",
      sick: "doente",
      periodToAcompany: "período de acompanhamento",
      acompanyBeforeAdoption: "acompanhamento",
      about: "sobre",
      sickness: "doença",
    }
    return Object.entries(pet).map(([key, value], index) => {
      if(!removeProps.includes(key)){
        const mappedKey = translateObject[key as keyof typeof translateObject] ?? key;
  
        return (
          <View key={index} style={styles.infosContainer}>
            <Text style={isToAdopt ? styles.subtitleYellow : styles.subtitleBlue}>{mappedKey.toUpperCase()}</Text>
            <View style={styles.textContainer}>
              <Text style={styles.infos}>{`${value}`}</Text>
            </View>
          </View>
        )
      }
    });
   
  }

  const navigateToInteresteds = () => {
    navigation.navigate('interesteds', {
      petId
    })
  }

  const wantToAdoptHandler = async () => {
    if(!isAlreadyInterested && currentPet.interesteds){
      await dispatch(addInterested({pet:currentPet, userId: uid}))
      setIsAlreadyInterested(true);
    }
  }

  return (
    <>
      {currentPet && (
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={styles.container}>
            <View style={styles.pictureContainer}>
                <Image style={styles.picture} source={{ uri: currentPet.photo}} />
            </View>
            <View style={styles.infosTitleContainer}>
                <Text style={[{fontWeight: "bold"}]}>{currentPet.name}</Text>
            </View>
            <View style={styles.infosTitleContainer}>
              {displayObject(currentPet)}
            </View>
            {isToAdopt ? <View style={styles.containerButton}>
              {!isAlreadyInterested && currentPet.ownerId !== uid && (
              <Button
                backgroundColor={Colors.yellowPrimary}
                onPress={wantToAdoptHandler}
                width={175}
              >
                PRETENDO ADOTAR
              </Button>
            )}
            </View> : <View style={styles.containerButton}>
              <Button
                backgroundColor={Colors.bluePrimary}
                width={180}
                onPress={navigateToInteresteds}
              >
                VER INTERESSADOS
              </Button>
              <Button
                backgroundColor={Colors.bluePrimary}
                onPress={()=>{}}
                width={175}
              >
                REMOVER PET
              </Button>
            </View>}
            
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height:"100%",
    alignItems: "flex-start",
    gap: 28,
    paddingBottom: 50,
  },
  pictureContainer:{
    width: "100%",
    height: 250
  },
  picture:{
    width: "100%",
    height: "100%"
  },
  infosTitleContainer:{
    paddingLeft: 16,
    display: "flex",
    paddingHorizontal: 8,
    flexWrap: "wrap",
    flexDirection: "row",
    gap:70,
  },
  infosContainer:{
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    gap:20,
  },
  subtitleBlue: {
    color: Colors.bluePrimary,
    flex: 1,
  },
  subtitleYellow: {
    color: Colors.yellowSecondary,
    flex: 1,
  },
  textContainer: {
    flexDirection: "row"
  },
  infos:{
    flexWrap: "wrap"
  },
  containerButton:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  }
});