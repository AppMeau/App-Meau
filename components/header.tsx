import { StyleSheet, Text, View } from 'react-native';
import Colors from '../util/Colors';
import { Ionicons } from '@expo/vector-icons';



export default function Header({color, title, search=false}:{color: string, title: string, search?: Boolean}) {
    
  
    return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <Ionicons name='menu' size={24} color={Colors.textAuxPrimary} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      {search && 
        <Ionicons name="search-sharp" size={24} color={Colors.textAuxPrimary} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'red',
    width: '100%',
    height: 56,
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: 20,
    fontFamily: 'roboto-medium',
    color: Colors.textAuxPrimary
  },
  icon: {
    margin: 16
  }
});