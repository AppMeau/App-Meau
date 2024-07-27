import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { animalRegisterType } from "../schemas/PetRegister/petRegisterTypes";
import Colors from "../util/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CardComponent({
  icon,
  isToAdopt,
  animal,
}: {
  icon: string;
  isToAdopt: boolean;
  animal: animalRegisterType;
}) {
  const navigation = useNavigation();

  const cardContent = isToAdopt ? (
    <View>
      <View style={styles.characteristcsView}>
        <Text style={styles.text}>{animal.gender}</Text>
        <Text style={styles.text}>{animal.age}</Text>
        <Text style={styles.text}>{animal.size}</Text>
      </View>
      <Text style={styles.centerText}>ENDEREÇO</Text>
    </View>
  ) : (
    <View style={styles.interestedView}>
      <Text style={styles.centerText}>__ NOVOS INTERESSADOS</Text>
    </View>
  );

  const navigateToDetails = () => {
    (navigation as any).navigate("animalDetails", {
      animal: animal,
    });
  };

  return (
    <Pressable style={styles.container} onPress={navigateToDetails}>
      <Card
        style={[
          styles.cardContainer,
          {
            backgroundColor: isToAdopt
              ? Colors.yellowTerceary
              : Colors.blueSecundary,
          },
        ]}
      >
        <Card.Title
          title={animal.name}
          titleStyle={styles.title}
          right={({ size }) => (
            <MaterialIcons
              name={isToAdopt ? "favorite-border" : undefined}
              size={size}
              color={Colors.textAuxPrimary}
              style={{ marginRight: 10 }}
            />
          )}
        />
        <Card.Cover source={{ uri: animal.photo }} style={styles.cover} />
        <Card.Content style={styles.contentCard}>{cardContent}</Card.Content>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginVertical: 8,
  },
  cardContainer: {
    width: "95%",
  },
  title: {
    color: Colors.textAuxPrimary,
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
  cover: {
    borderRadius: 0,
  },
  characteristcsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    color: "white",
  },
  text: {
    fontFamily: "Roboto_400Regular",
    color: Colors.textAuxPrimary,
  },
  centerText: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Roboto_400Regular",
    color: Colors.textAuxPrimary,
  },
  contentCard: {
    backgroundColor: "white",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  interestedView: {
    marginVertical: 8,
    textAlign: "center",
  },
});
