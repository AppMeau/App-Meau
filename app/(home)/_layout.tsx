import { Text } from 'react-native';
import { Redirect, Slot } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import Header from '../../components/header';
import Colors from '../../util/Colors';

export default function Layout() {
    const isLoading = false;
    const session = true;

    if (isLoading) {
        return <Text>a{session}</Text>;
    }

    if (!session) {
        return <Redirect href="/login" />;
    }
    return <Slot />;
}