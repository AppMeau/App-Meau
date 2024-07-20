import { FlatList } from "react-native";
import CardComponent from "../components/card";
import { useSelector } from "react-redux";
import { StateType } from "../redux/Slice";
import { Text } from "react-native-paper";

export default function AnimalListing() {

  const animals = useSelector((state: StateType) => state.animals);
  console.log(animals)

  return (
    <FlatList data={animals} keyExtractor={(animal) => animal.id!.toString()} renderItem={(itemData) => {
      // return <CardComponent icon="heart" isToAdopt={true} animal={itemData.item} />
      return <Text>TESTES</Text>
    }}/>
  )
}