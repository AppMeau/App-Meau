import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import Header from '../../../components/header';
import Colors from '../../../util/Colors';

export default function Layout({segment}:{segment:any}) {
  let drawer = (
    <Drawer.Screen
        name="animalListing"
        options={{
          drawerLabel: "Adotar",
          title: "Adotar",
          unmountOnBlur: true,
          header: ({ navigation, options }) => (
            <Header
              color={Colors.yellowPrimary}
              title={options.title}
              search
              onDrawerClick={navigation.toggleDrawer}
            />
          ),
        }}
        initialParams={{isToAdopt: true}}
      />
  )
  if(segment === '(profile)') {
    drawer = (
      <Drawer.Screen
        name="animalListing"
        options={{
          drawerLabel: "Meus Pets",
          title: "Meus Pets",
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
        initialParams={{isToAdopt: false}}
      />
    )
  }

  return (
    <Drawer>
      {drawer}

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
    </Drawer>
  );
}
