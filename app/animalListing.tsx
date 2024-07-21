import { FlatList } from "react-native";
import CardComponent from "../components/card";
import { useSelector } from "react-redux";
import { getAllAnimals, StateType } from "../redux/Slice";
import { Text } from "react-native-paper";
import { useAppDispatch } from "../redux/store";
import { useEffect } from "react";

export default function AnimalListing() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAllAnimals())
  }, [])
  const animals = useSelector((state: StateType) => state.animals);

  return (
    <FlatList data={animals} keyExtractor={(animal) => animal.id!.toString()} renderItem={(itemData) => {
      // return <CardComponent icon="heart" isToAdopt={true} animal={itemData.item} />
      return <Text>TESTES</Text>
    }}/>
  )
}