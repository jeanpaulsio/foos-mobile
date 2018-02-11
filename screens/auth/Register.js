import React, { Component } from "react";
import {
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  View
} from "react-native";
import PropTypes from "prop-types";


class Register extends Component {
  state = { handle: "", password: "" };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="grey"
            autoCapitalize="none"
            value={this.state.handle}
            onChangeText={handle => this.setState({ handle })}
            style={styles.input}
            returnKeyType="done"
            blurOnSubmit
            underlineColorAndroid={"transparent"}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="grey"
            autoCapitalize="none"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={styles.input}
            returnKeyType="done"
            blurOnSubmit
            secureTextEntry
            underlineColorAndroid={"transparent"}
          />
        </View>

        <TouchableWithoutFeedback onPressIn={this.handleSignIn}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPressIn={() => this.props.navigation.goBack()}>
          <View style={[styles.button, { backgroundColor: "grey" }]}>
            <Text style={styles.buttonText}>Go Back</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20
  },
  inputContainer: {
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 10,
    backgroundColor: "black"
  },
  input: {
    height: 42,
    marginVertical: 3,
    paddingHorizontal: 14,
    fontSize: 16,
    fontWeight: "600",
    color: "white"
  },
  button: {
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: "#1673ff",
    height: 50
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 16,
    paddingVertical: 13,
    fontWeight: "600",
    color: "white"
  }
});

export default Register;
