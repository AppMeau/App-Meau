import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Header from "../components/header";
import Colors from "../util/Colors";

export default function Layout() {
  return (
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
          name="animalRegister"
          options={{
            drawerLabel: "Cadastro Animal",
            title: "Cadastro Animal",
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
    </GestureHandlerRootView>
  );
}
