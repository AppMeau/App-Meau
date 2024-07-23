import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Index from "./src/pages/index";
import { useAppSelector } from "./src/redux/store";
import Login from "./src/pages/auth/login";
import Register from "./src/pages/auth/register";
import AnimalRegister from "./src/pages/home/animalRegister";
import notAuthorized from "./src/pages/exceptions/notAuthorized";
import AnimalListing from "./src/pages/home/animalListing";

export default function Routes() {
    const Drawer = createDrawerNavigator();
    const status = useAppSelector((state) => state.auth.status);
    return (
        <NavigationContainer>
          <Drawer.Navigator>
            {status ? (
                <>
                    <Drawer.Screen name="inicio" component={Index} options={{ title: '', drawerLabel: 'Início' }}/>
                    <Drawer.Screen name="animalRegister" component={AnimalRegister} options={{ title: 'Cadastrar um Pet' }}/>
                    <Drawer.Screen name="animalListingAdoption" component={AnimalListing} options={{ title: 'Adotar' }} initialParams={{isToAdopt: true}}/>
                    <Drawer.Screen name="animalListingMyPets" component={AnimalListing} options={{ title: 'Meus Pets' }} initialParams={{isToAdopt: false}}/>
                </>
            ):(
                <>
                    <Drawer.Screen name="login" component={Login} options={{ title: 'Login' }}/>
                    {/* <Drawer.Screen name="notAuthorized" component={notAuthorized}/> */}
                    <Drawer.Screen name="register" component={Register} options={{ title: 'Cadastrar' }}/>
                </>
            )}
          </Drawer.Navigator>
        </NavigationContainer>
      );
}