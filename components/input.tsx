import { Ionicons } from "@expo/vector-icons";
import React, { Key, useState } from "react";
import { StyleSheet, View, TextInput, KeyboardTypeOptions } from "react-native";
// import { TextInput } from "react-native-paper";

type textContentType = "password" | "username" | "name";
type props = {
  type?: textContentType;
  keyboardType?: KeyboardTypeOptions;
  lazy?: boolean;
  rule?: (value: any) => boolean;
  placeholder: string;
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
};

export default function InputComponent(props: props) {
  const [focused, setFocus] = useState(false);
  const [isValid, setValid] = useState<null | boolean>(null);

  return (
    <View
      style={{
        ...styles.container,
        borderColor: focused ? "#88c9bf" : "#e6e7e8",
        borderBottomWidth: focused ? 2 : 1,
      }}
    >
      <TextInput
        textContentType={props.type ? props.type : "none"}
        secureTextEntry={props.type === "password"}
        style={[isValid && { color: "red" }, styles.input]}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={isValid || isValid === null ? "#bdbdbd" : "red"}
        onFocus={() => {
          setFocus(true);
        }}
        onChange={(e) => {
          if (!props.lazy) {
            if (props.rule) {
              setValid(props.rule(e.nativeEvent.text));
            }
          }
        }}
        keyboardType={props.keyboardType ? props.keyboardType : "default"}
        onEndEditing={(e) => {
          setFocus(false);
          if (props.lazy) {
            if (props.rule) {
              setValid(props.rule(e.nativeEvent.text));
            }
          }
        }}
      />
      {isValid ? (
        <Ionicons
          name="checkmark"
          style={{ padding: 0 }}
          size={24}
          color="#88c9bf"
        />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "baseline",
    flexDirection: "row",
    width: 312,
    borderBottomWidth: 1,
    paddingLeft: 8,
    borderColor: "#e6e7e8",
    paddingBottom: 8,
  },
  input: {
    height: 15,
    flexGrow: 1,
    fontSize: 14,
    justifyContent: "center",
    includeFontPadding: false,
    fontFamily: "roboto-regular",
    color: "#575757",
  },
});
