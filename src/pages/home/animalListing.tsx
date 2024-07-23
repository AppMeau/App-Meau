import { FlatList, View } from "react-native";
import CardComponent from "../../components/card";
import { getAllAnimals } from "../../redux/Slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { Text } from "react-native-paper";
import Header from "../../components/header";
import Colors from "../../util/Colors";

export default function AnimalListing({ navigation, route }: any) {
  const dispatch = useAppDispatch()
  const {animals, status, error} = useAppSelector((state) => state.animals);

  let content = <View></View>

  const isToAdopt = route.params.isToAdopt
  console.log('isToAdopt', isToAdopt)

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
      title: isToAdopt ? "Adotar" : 'Meus Pets',
    })

    if(status === 'idle') {
      dispatch(getAllAnimals())
    }

    // let filteredAnimals = animals
    // if(isToAdopt) {
    //   filteredAnimals = animals.filter((animal) => animal.availableToAdoption === true)
    // } else {
    //   filteredAnimals = animals.filter((animal) => animal.user === '')
    // }
  }, [dispatch])

  if(status === 'loading') {
    content =  <Text>Loading...</Text>
  } else if(status === 'succeeded') {
    content = (
      <FlatList data={animals} keyExtractor={(animal) => animal.id!.toString()} renderItem={(itemData) => {
        return <CardComponent icon="heart" isToAdopt={isToAdopt} animal={itemData.item} />
      }}/>
    )
  } else {
    content = <Text>Error: {error?.toString()}</Text>
  }

  return (
    <View>
      {content}
    </View>
  )
}
