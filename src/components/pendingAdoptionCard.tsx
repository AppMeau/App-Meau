import { Text, View } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { respondAdoption } from "../redux/adoption";
import Colors from "../util/Colors";
import type { adoption } from "../schemas/Adoption/schema";
import { useAppDispatch } from "../redux/store";
import { useState } from "react";

export default function ({adoption}: {adoption: adoption}) {
    const dispatch = useAppDispatch();
    let [rejecting, setRejecting] = useState(false);
    let [accepting, setAccepting] = useState(false);
    return <>
        <View style={{flexDirection: 'row', backgroundColor:"white", padding: 10, borderRadius: 15, justifyContent: "space-between", alignItems: "center"}}>
            <View style={{flexDirection: "row", gap:15, alignItems: "center"}}>
            <Avatar.Image size={60} source={{uri: adoption.pet.image}}/>
            <Text style={{fontSize: 20}}>{adoption.pet.name}</Text>
            </View>
            <View style={{flexDirection: "row"}}>
            <IconButton mode="contained" icon="check" loading={accepting} iconColor={Colors.bluePrimary} onPress={()=>{
                    setAccepting(true);
                    dispatch(respondAdoption({adoption, status: "accepted"})).then(()=>{setAccepting(false)});
                }
            }/>
            <IconButton mode="contained" loading={rejecting} icon="close" iconColor="red" onPress={()=>{
                    setRejecting(true);
                    dispatch(respondAdoption({adoption, status: "rejected"})).then(()=>{setRejecting(false)});
                }
            }/>
            </View>
        </View>
    </>
}