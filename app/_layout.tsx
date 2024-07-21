import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import Header from '../components/header';
import Colors from '../util/Colors';
import { Provider } from 'react-redux';
import store from '../redux/store';

export default function Layout() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer>
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Inicio",
              title: "",
              header: ({ navigation, options }) => (
                <Header
                  color="#fff"
                  title={options.title}
                  onDrawerClick={navigation.toggleDrawer}
                  iconColor={Colors.bluePrimary}
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
          <Drawer.Screen
            name="userDetails"
            options={{
              drawerLabel: "Meus Dados",
              title: "Meus Dados",
            }}
          />
          <Drawer.Screen
            name="animalRegister"
            options={{
              drawerLabel: "Cadastro Animal",
              title: "Cadastro Animal",
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
          <Drawer.Screen
            name="animalListing"
            options={{
              drawerLabel: "Adotar",
              unmountOnBlur: true,
            }}
            initialParams={{ isToAdopt: true }}
          />
        </Drawer>
      </GestureHandlerRootView>  
    </Provider>  
  );
}
