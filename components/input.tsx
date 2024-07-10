import { Ionicons } from "@expo/vector-icons";
import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, KeyboardTypeOptions } from "react-native";

type textContentType = "password" | "username" | "name";

export default function InputComponent({
  type,
  keyboardType,
  lazy,
  rule,
  placeholder,
  value,
  onChangeText,
  disabled,
  valid,
}: {
  type?: textContentType;
  keyboardType?: KeyboardTypeOptions;
  lazy?: boolean;
  rule?: (value: any) => boolean;
  placeholder: string;
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
  valid?: boolean;
}) {
  useFonts({
    Roboto_400Regular,
  });
  const [focused, setFocus] = useState(false);
  const [isValid, setValid] = useState<null | boolean>(null);

  useEffect(() => {
    if (disabled || !valid) setValid(null);
  }, [disabled, valid]);

  return (
    <View
      style={{
        ...styles.container,
        borderColor: focused ? "#88c9bf" : "#e6e7e8",
        borderBottomWidth: focused ? 2 : 1,
      }}
    >
      <TextInput
        editable={!disabled}
        textContentType={type ? type : "none"}
        secureTextEntry={type === "password"}
        style={[
          styles.input,
          isValid === null || isValid ? { color: "#575757" } : { color: "red" },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isValid === null || isValid ? "#bdbdbd" : "red"}
        onFocus={() => {
          setFocus(true);
        }}
        onChange={(e) => {
          if (!lazy) {
            if (rule) {
              setValid(rule(e.nativeEvent.text));
            }
          }
        }}
        keyboardType={keyboardType ? keyboardType : "default"}
        onEndEditing={(e) => {
          setFocus(false);
          if (lazy) {
            if (rule) {
              setValid(rule(e.nativeEvent.text));
            }
          }
        }}
      />
      {isValid && valid ? (
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
    fontFamily: "Roboto_400Regular",
  },
});
