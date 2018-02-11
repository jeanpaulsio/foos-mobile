import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

const Input = props => {
  return (
    <View
      style={[
        styles.inputContainer,
        {
          borderColor: props.borderColor,
          backgroundColor: props.bgColor
        }
      ]}
    >
      <TextInput
        secureTextEntry={props.secureTextEntry}
        multiline={props.multiline}
        autoFocus={props.autoFocus}
        value={props.value}
        editable={props.editable}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        onSubmitEditing={props.onSubmitEditing}
        style={[
          styles.input,
          { color: props.textColor }
        ]}
        returnKeyType="done"
        autoCapitalize="none"
        blurOnSubmit
        underlineColorAndroid={"transparent"}
      />
    </View>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool.isRequired,
  placeholderTextColor: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  keyboardType: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  editable: PropTypes.bool,
  multiline: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

Input.defaultProps = {
  keyboardType: "default",
  editable: true,
  secureTextEntry: false
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10
  },
  input: {
    height: 42,
    marginVertical: 3,
    paddingHorizontal: 14,
    fontSize: 16,
    fontWeight: "600"
  },
  multiline: {
    height: 120,
    textAlignVertical: "top"
  }
});

export { Input };
