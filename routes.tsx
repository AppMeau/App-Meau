import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Index from "./src/pages/index";
import { useAppDispatch, useAppSelector } from "./src/redux/store";
import Login from "./src/pages/auth/login";
import Register from "./src/pages/auth/register";
import AnimalRegister from "./src/pages/home/animalRegister";
import AnimalListing from "./src/pages/home/animalListing";
import { useEffect } from "react";
import { checkAuthStatus } from "./src/redux/auth";
import AnimalDetails from "./src/pages/home/animalDetails";
import Chat from "./src/pages/home/chat";
import Interesteds from "./src/pages/home/interesteds";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./src/components/header";
import Colors from "./src/util/Colors";
import UserProfile from "./src/pages/home/userProfile";
import MyChatRooms from "./src/pages/home/myChatRooms";
import { Linking } from "react-native";
import * as Notifications from 'expo-notifications';
import pendingAdoptions from "./src/pages/home/pendingAdoptions";
import FinishAdoption from "./src/pages/home/finishAdoption";
import AdoptionFinalScreen from "./src/pages/home/adoptionFinalScreen";

const Drawer = createDrawerNavigator();
const DetailStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();

function ChatRoute({route, navigation}: any) {
  // useEffect(() => {
  //   console.log(route.params)
  //   const routes: any = [{ name: 'myChatRooms' }]
  //   if(route.params?.roomId) routes.push({ name: 'chat', params: { roomId: route.params.roomId }})
  //   navigation.reset({
  //     index: 0,
  //     routes,
  //   });
  // }, [navigation]);
  return (
    <ChatStack.Navigator initialRouteName="myChatRooms">
      <ChatStack.Screen
        name="myChatRooms"
        component={MyChatRooms}
        options={{ title: "Minhas Conversas",
          header: ({ navigation, options }: any) => (
            <Header
              color={Colors.bluePrimary}
              title={"Minhas Conversas"}
              search
              onDrawerClick={navigation.toggleDrawer}
            />
        ), }}
      />
      <ChatStack.Screen 
        name="chat" 
        component={Chat} 
      />
      <ChatStack.Screen 
        name="finishAdoption" 
        component={FinishAdoption} 
        options={{ title: 'Finalizar Adoção'}} 
      />
      <ChatStack.Screen 
        name="adoptionFinalScreen" 
        component={AdoptionFinalScreen} 
        options={{ title: 'Finalizar Adoção'}} 
      />
    </ChatStack.Navigator>
  )
}

function DetailsRoute({isToAdopt}:{isToAdopt: boolean}) {
  return (
    <DetailStack.Navigator>
      <DetailStack.Screen 
        name="animalListingAdoptionStack" 
        component={AnimalListing} 
        options={{ title: 'Adotar' }} 
        initialParams={{isToAdopt: isToAdopt}}
      />
      <DetailStack.Screen 
        name="animalListingMyPetsStack" 
        component={AnimalListing} 
        options={{ title: 'Meus Pets' }} 
        initialParams={{isToAdopt: isToAdopt}}
      />
      <DetailStack.Screen 
        name="animalDetails" 
        component={AnimalDetails} 
        options={{ title: 'Detalhes'}} 
      />

      <DetailStack.Screen 
        name="interesteds" 
        component={Interesteds} 
        options={{ header: ({ navigation, options }: any) => (
          <Header
            color={Colors.bluePrimary}
            title={'Interessados'}
            // search
            icon="arrow-back"
            onDrawerClick={navigation.goBack}
          />
        ),}} 
      />
      <DetailStack.Screen 
        name="userProfile" 
        component={UserProfile} 
        options={{ header: ({ navigation, options }: any) => (
          <Header
            color={Colors.bluePrimary}
            title={'Interessados'}
            // search
            onDrawerClick={navigation.toggleDrawer}
          />
        ),}} 
      />
    </DetailStack.Navigator>
  )
}

export default function Routes() {
  const status = useAppSelector((state) => state.auth.status);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, []);
  const linking = {
    prefixes: ['https://meau.com.br', 'meau://'],
    async getInitialURL() {
      // First, you may want to do the default deep link handling
      // Check if app was opened from a deep link
      const url = await Linking.getInitialURL();

      if (url != null) {
        return url;
      }

      // Handle URL from expo push notifications
      const response = await Notifications.getLastNotificationResponseAsync();

      return response?.notification.request.content.data.url;
    },
    subscribe(listener: any) {
      const onReceiveURL = ({ url }: { url: string }) => listener(url);

      // Listen to incoming links from deep linking
      const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);

      // Listen to expo push notifications
      const subscription = Notifications.addNotificationResponseReceivedListener(response => {
        const url = response.notification.request.content.data.url;

        // Any custom logic to see whether the URL needs to be handled
        //...

        // Let React Navigation handle the URL
        listener(url);
      });

      return () => {
        // Clean up the event listeners
        eventListenerSubscription.remove();
        subscription.remove();
      };
    },
  }
    return (
        <NavigationContainer
          linking={linking}
          >
          <Drawer.Navigator>
            {status ? (
                <>
                  <Drawer.Screen name="inicio" component={Index} options={{ title: '', drawerLabel: 'Início' }}/>
                  <Drawer.Screen 
                    name="animalRegister" 
                    component={AnimalRegister} 
                    options={{
                      title: 'Cadastrar um Pet',
                      header: ({ navigation, options }: any) => (
                      <Header
                        color={Colors.yellowPrimary}
                        title={'Cadastrar um Pet'}
                        // search
                        icon="arrow-back"
                        onDrawerClick={navigation.goBack}
                      />
                  )}}/>
                  <Drawer.Screen 
                    name="animalListingAdoption"
                    options={{ title: 'Adotar', headerShown: false, unmountOnBlur: true }}
                    listeners={({navigation}) => ({blur: () => navigation.setParams({screen: undefined})})}
                  >{props => <DetailsRoute {...props} isToAdopt={true} />}</Drawer.Screen>
                  <Drawer.Screen 
                    name="animalListingMyPets" 
                    options={{ title: 'Meus Pets', headerShown: false, unmountOnBlur: true }}
                    listeners={({navigation}) => ({blur: () => navigation.setParams({screen: undefined})})}
                  >{props => <DetailsRoute {...props} isToAdopt={false} />}</Drawer.Screen>
                  <Drawer.Screen
                    name="chatRoute"
                    component={ChatRoute}
                    options={{ 
                      title: "Minhas Conversas", 
                      unmountOnBlur: true, 
                      headerShown: false,
                     }}
                    listeners={({navigation}) => ({blur: () => navigation.setParams({screen: undefined})})}
                  />
                  <Drawer.Screen
                    name="pendingAdoptions"
                    component={pendingAdoptions}
                    options={{ title: "Adoções Pendentes", unmountOnBlur: true }}
                  />
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
