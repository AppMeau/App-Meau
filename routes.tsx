import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Index from "./src/pages/index";
import { useAppDispatch, useAppSelector } from "./src/redux/store";
import Login from "./src/pages/auth/login";
import Register from "./src/pages/auth/register";
import AnimalRegister from "./src/pages/home/animalRegister";
import notAuthorized from "./src/pages/exceptions/notAuthorized";
import AnimalListing from "./src/pages/home/animalListing";
import { useEffect } from "react";
import { checkAuthStatus } from "./src/redux/auth";
import AnimalDetails from "./src/pages/home/animalDetails";
import Chat from "./src/pages/auth/chat";

export default function Routes() {
  const Drawer = createDrawerNavigator();
  const status = useAppSelector((state) => state.auth.status);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, []);
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {status ? (
          <>
            <Drawer.Screen
              name="inicio"
              component={Index}
              options={{ title: "", drawerLabel: "Início" }}
            />
            <Drawer.Screen
              name="animalRegister"
              component={AnimalRegister}
              options={{ title: "Cadastrar um Pet" }}
            />
            <Drawer.Screen
              name="animalListingAdoption"
              component={AnimalListing}
              options={{ title: "Adotar", unmountOnBlur: true }}
              initialParams={{ isToAdopt: true }}
            />
            <Drawer.Screen
              name="animalListingMyPets"
              component={AnimalListing}
              options={{ title: "Meus Pets", unmountOnBlur: true }}
              initialParams={{ isToAdopt: false }}
            />
            <Drawer.Screen
              name="animalDetails"
              component={AnimalDetails}
              options={{ title: "Detalhes", unmountOnBlur: true }}
            />
          </>
        ) : (
          <>
            <Drawer.Screen
              name="login"
              component={Login}
              options={{ title: "Login" }}
            />
            {/* <Drawer.Screen name="notAuthorized" component={notAuthorized}/> */}
            <Drawer.Screen
              name="register"
              component={Register}
              options={{ title: "Cadastrar" }}
            />
            <Drawer.Screen
              name="chat"
              component={Chat}
              options={{ title: "Chat" }}
            />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
