import { FlatList, RefreshControl, View } from "react-native";
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
  const loadPage = () => {
    if (isToAdopt) {
      dispatch(getAvailablePets());
    } else {
      dispatch(getUserPets(uid));
    }
  }
  useEffect(() => {
    navigation.setOptions({
      header: ({ navigation, options }: any) => (
        <Header
          color={isToAdopt ? Colors.yellowPrimary : Colors.bluePrimary}
          title={options.title}
          // search
          onDrawerClick={navigation.toggleDrawer}
        />
      ),
      title: isToAdopt ? "Adotar" : "Meus Pets",
    });

    loadPage();
  }, [dispatch]);


  function getAllMyRooms(): void {
    throw new Error("Function not implemented.");
  }

    return <>
      <FlatList
        data={pets}
        style={{ height: "100%", padding: 10, flex: 1 }}
        keyExtractor={(animal) => animal.id!.toString()}
        ListEmptyComponent={<Text style={{textAlign: 'center', paddingTop: 30}}>Nenhum pet encontrado</Text>}
        refreshControl={<RefreshControl onRefresh={loadPage} refreshing={status=="loading"}/>}
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
    </>


}
