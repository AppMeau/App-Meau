import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import Header from '../../components/header';
import Colors from '../../util/Colors';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';


export default function Layout() {
  const persistor = persistStore(store);
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Inicio",
          title: "Inicio",
          unmountOnBlur: true,
          header: ({ navigation, options }) => (
            <Header
              color={Colors.blueSecundary}
              title={options.title}
              onDrawerClick={navigation.toggleDrawer}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="login"
        options={{
          drawerLabel: "Login",
          title: "Login",
          unmountOnBlur: true,
          header: ({ navigation, options }) => (
            <Header
              color={Colors.blueSecundary}
              title={options.title}
              onDrawerClick={navigation.toggleDrawer}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="register"
        options={{
          drawerLabel: "Cadastro Pessoal",
          title: "Cadastro Pessoal",
          unmountOnBlur: true,
          header: ({ navigation, options }) => (
            <Header
              color={Colors.blueSecundary}
              title={options.title}
              search
              onDrawerClick={navigation.toggleDrawer}
            />
          ),
        }}
      />
    </Drawer>
  );
}
