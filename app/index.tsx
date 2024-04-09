import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import RegisterComponent from './register';
import { useFonts } from 'expo-font';

export default function App() {
  let [fontsLoaded] = useFonts({
      'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
      'roboto-medium': require('../assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) {
      return null;
  }
  return (
    <View style={styles.container}>
      {/* <Link href="/login">Login</Link>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" /> */}
      <RegisterComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
