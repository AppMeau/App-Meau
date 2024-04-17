import { StyleSheet, Text, View } from 'react-native';
import Colors from '../util/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function Header({color, title, search=false, iconColor=Colors.textAuxPrimary, onDrawerClick}:{color: string, title?: string, search?: Boolean, iconColor?: string, onDrawerClick: () => void}) {
    
    return (
      <View style={[styles.container, styles.flex, {backgroundColor: color}]}>
        <View style={[styles.flex,  styles.headerContainer]}>
          <TouchableOpacity onPress={onDrawerClick}>
            <Ionicons name='menu' size={24} color={iconColor} />
          </TouchableOpacity>
          
          <Text style={styles.title}>{title}</Text>
        </View>
        
        {search && 
          <Ionicons name="search-sharp" size={24} color={iconColor} />
        }
      </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    width: '100%',
    height: 56,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'roboto-medium',
    color: Colors.textAuxPrimary
  },
  headerContainer: {
    gap: 16
  },
});