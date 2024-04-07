import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

type componentProps = {
    bgColor: string,
    link: string,
    children: string
}
export default function ButtonComponent(props: componentProps) {
  return (
    <Link
        href={props.link}
    >{props.children}</Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});