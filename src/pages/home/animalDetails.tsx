import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Colors from "../../util/Colors";
import Button from "../../components/customButton";

export default function AnimalDetails({route}: any) {
  const pet = route.params.animal;

  function displayObject(pet: any){
    const removeProps = ["id", "name", "photo", "disable", "availableToAdoption"]
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
    return Object.entries(pet).map(([key, value]) => {
      if(removeProps.includes(key) || value === ""){
        return <></>
      }

      const mappedKey = translateObject[key as keyof typeof translateObject] ?? key;

      return (
        <View style={styles.infosContainer}>
          <Text style={styles.subtitle}>{mappedKey.toUpperCase()}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.infos}>{`${value}`}</Text>
          </View>
        </View>
      )
    });
   
  }

  function render() {
    if(!pet) {
        return <></>;
    }

     return (
        <View style={{ flex: 1 }}>
        <ScrollView>
            <View style={styles.container}>
            <View style={styles.pictureContainer}>
                <Image style={styles.picture} source={{ uri: pet.photo}} />
            </View>
            <View style={styles.infosTitleContainer}>
                <Text style={[{fontWeight: "bold"}]}>{pet.name}</Text>
            </View>
            <View style={styles.infosTitleContainer}>
              {displayObject(pet)}
            </View>
            <View style={styles.containerButton}>
              <Button
                backgroundColor={Colors.yellowPrimary}
                onPress={null}
                width={175}
              >
                VER INTERESSADOS
              </Button>
              <Button
                backgroundColor={Colors.yellowPrimary}
                onPress={null}
                width={175}
              >
                REMOVER PET
              </Button>
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
  subtitle: {
    color: Colors.bluePrimary,
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