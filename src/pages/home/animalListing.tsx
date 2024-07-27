import { FlatList, View } from "react-native";
import CardComponent from "../../components/card";
import { getAllpets, getAvailablePets, getUserPets } from "../../redux/pets";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { Text } from "react-native-paper";
import Header from "../../components/header";
import Colors from "../../util/Colors";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth";

export default function AnimalListing({ navigation, route }: any) {
  const dispatch = useAppDispatch();
  const { pets, status, error } = useAppSelector((state) => state.pets);
  const { uid } = useSelector(selectUser);

  let content = <View></View>;

  const isToAdopt = route.params.isToAdopt;

  useEffect(() => {
    navigation.setOptions({
      header: ({ navigation, options }: any) => (
        <Header
          color={isToAdopt ? Colors.yellowPrimary : Colors.bluePrimary}
          title={options.title}
          search
          onDrawerClick={navigation.toggleDrawer}
        />
      ),
      title: isToAdopt ? "Adotar" : "Meus Pets",
    });

    if (isToAdopt) {
      dispatch(getAvailablePets());
    } else {
      dispatch(getUserPets(uid));
    }
  }, [dispatch]);

  if (status === "loading") {
    content = <Text>Loading...</Text>;
  } else if (status === "succeeded") {
    content = (
      <FlatList
        data={pets}
        keyExtractor={(animal) => animal.id!.toString()}
        renderItem={(itemData) => {
          return (
            <CardComponent
              icon="heart"
              isToAdopt={isToAdopt}
              animal={itemData.item}
            />
          );
        }}
      />
    );
  } else {
    content = <Text>Error: {error?.toString()}</Text>;
  }

  return <View>{content}</View>;
}
