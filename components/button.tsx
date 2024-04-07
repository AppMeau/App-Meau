import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

type componentProps = {
    type: 'positive',
    link: string,
    children: string
}
export default function ButtonComponent(props: componentProps) {
  return (
    <Link
        style={styles[props.type]}
        href={props.link}
    >{props.children}</Link>
  );
}

const styles = StyleSheet.create({
  positive: {
    fontFamily: 'roboto',
    backgroundColor: '#88c9bf',
    width: 232,
    height: 40,
    borderRadius: 2,
    color: '#434343',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});