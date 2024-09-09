import { FlatList, RefreshControl, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { Button, IconButton, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth";
import { getUserPendingAdoptions, respondAdoption } from "../../redux/adoption";
import Colors from "../../util/Colors";

export default function PendingAdoptions() {
  const dispatch = useAppDispatch();
  const { adoptions, isLoading } = useAppSelector((state) => state.adoptions);
  const { uid } = useSelector(selectUser);

  let content = <View></View>;


  useEffect(() => {
    dispatch(getUserPendingAdoptions(uid));
  }, []);

    return <FlatList
      refreshControl={<RefreshControl onRefresh={()=>{dispatch(getUserPendingAdoptions(uid))}} refreshing={isLoading!}/>}
      style={{height: "100%"}}
      data={adoptions}
      keyExtractor={(adoption) => adoption.id!.toString()}
      renderItem={(itemData) => {
        return (
          <View style={{flexDirection: 'row'}}>
              <Text>{itemData.item.pet.name}</Text>
              <IconButton mode="contained" icon="check" iconColor={Colors.bluePrimary} onPress={()=>{
                  dispatch(respondAdoption({adoption: itemData.item, status: "accepted"}));
                }
              }/>
              <IconButton mode="contained" icon="close" iconColor="red" onPress={()=>{
                  dispatch(respondAdoption({adoption: itemData.item, status: "rejected"}));
                }
              }/>
          </View>
        );
      }}
    />
}
