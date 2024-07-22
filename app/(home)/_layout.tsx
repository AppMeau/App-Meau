import { Text } from 'react-native';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useAppSelector } from '../../redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from '../../components/header';
import Colors from '../../util/Colors';


export default function Layout() {
    const isLoading = false;
    const session = useAppSelector((state) => state.auth.status);

    if (isLoading) {
        return <Text>a{session}</Text>;
    }

    if (!session) {
        return <Redirect href="/401" />;
    }
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
    )

}