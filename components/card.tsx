import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { animalRegisterType } from '../schemas/AnimalRegister/animalRegisterTypes';

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />

export default function CardComponent({
  icon,
  isToAdopt,
  animal,
}:{
  icon: string;
  isToAdopt: boolean;
  animal: animalRegisterType;
}) {

  const cardContent = isToAdopt ? (
    <View>
      <View>
        <Text>{animal.gender}</Text>
        <Text>{animal.age}</Text>
        <Text>{animal.size}</Text>
      </View>
      <Text>ENDEREÇO</Text>
    </View>
  ):(
    <View>
      <Text>__ NOVOS INTERESSADOS</Text>
    </View>
  )

  return (
    <Pressable>
      <Card>
        <Card.Title title={animal.name} />
        <Card.Content>
          {/* {cardContent} */}
          <Text>TESTES</Text>
        </Card.Content>
        <Card.Cover source={{ uri: animal.photo }} />
      </Card>
    </Pressable>
  )
}
