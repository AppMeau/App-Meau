import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import Colors from "../util/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PetRegisterType } from "../schemas/PetRegister/petRegisterTypes";

export default function CardComponent({
  icon,
  isToAdopt,
  animal,
}: {
  icon: string;
  isToAdopt: boolean;
  animal: PetRegisterType;
}) {
  const navigation = useNavigation();
  const interesteds = animal.interesteds?.map((interested: {userId: string, isAlreadyInChat: boolean}) => interested.isAlreadyInChat ? 0 : 1).reduce((acc: number, curr: number) => acc + curr, 0);

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
      <Text style={styles.centerText}>{interesteds} NOVO(S) INTERESSADO(S)</Text>
    </View>
  );

  const navigateToDetails = () => {
    (navigation as any).navigate("animalDetails", {
      petId: animal.id,
      isToAdopt: isToAdopt,
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
