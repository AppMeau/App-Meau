import { FlatList, RefreshControl, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth";
import { getUserPendingAdoptions, respondAdoption } from "../../redux/adoption";
import PendingAdoptionCard from "../../components/pendingAdoptionCard";

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
      style={{height: "100%", padding: 10}}
      data={adoptions}
      keyExtractor={(adoption) => adoption.id!.toString()}
      renderItem={(itemData) => {
        return <PendingAdoptionCard adoption={itemData.item}/>;
      }}
    />
}
