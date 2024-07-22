import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Index from "./src/index";
import { useAppSelector } from "./redux/store";
import Login from "./src/auth/login";
import Register from "./src/auth/register";
import AnimalRegister from "./src/home/animalRegister";

export default function Routes() {
    const Drawer = createDrawerNavigator();
    const status = useAppSelector((state) => state.auth.status);
    return (
        <NavigationContainer>
          <Drawer.Navigator>
            {status ? (
                <>
                    <Drawer.Screen name="inicio" component={Index} options={{ title: 'Início' }}/>
                    <Drawer.Screen name="animalRegister" component={AnimalRegister} options={{ title: 'Cadastrar um Pet' }}/>
                </>
            ):(
                <>
                    <Drawer.Screen name="inicio" component={Index} options={{ title: 'Início' }}/>
                    <Drawer.Screen name="login" component={Login} options={{ title: 'Login' }}/>
                    <Drawer.Screen name="register" component={Register} options={{ title: 'Cadastrar' }}/>
                </>
            )}
          </Drawer.Navigator>
        </NavigationContainer>
      );
}