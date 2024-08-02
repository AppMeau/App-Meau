import { FlatList, Text, View } from "react-native";
import { animalRegisterType } from "../../schemas/AnimalRegister/animalRegisterTypes";
import InterestedsCard from "../../components/interestedCard";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAllInteresteds } from "../../redux/users";

export default function Interesteds({route}: any) {
  const dispatch = useAppDispatch()

  const animal: animalRegisterType = route.params.animal
  console.log(animal)
  if(animal.interesteds) {
    dispatch(getAllInteresteds(animal.interesteds))
  }
  const {users} = useAppSelector((state) => state.users)

  return (
    <View>
      {users.length === 0 ? (
        <Text>Nenhum usuário interessado neste animal</Text>
      ):(
        <>
          <FlatList 
            data={users} 
            keyExtractor={(user) => user.uid} 
            renderItem={(itemData) => {
              return <InterestedsCard user={itemData.item} />
            }}
          />
        </>
      )} 
    </View>
  )
}