import React, { Component } from "react";
import {
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  View
} from "react-native";
import PropTypes from "prop-types";

class Login extends Component {
  state = { handle: "", password: "" };

  handleSignIn = () => {
    console.log("handleSignIn")
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login Screen</Text>
        <View style={styles.inputContainer}>
          <TextInput
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
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={styles.input}
            returnKeyType="done"
            blurOnSubmit
            underlineColorAndroid={"transparent"}
          />
        </View>

        <TouchableWithoutFeedback
          onPressIn={this.handleSignIn}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
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
  button: {
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    backgroundColor: "grey",
    height: 50
  },
  buttonText: {
    color: "white"
  }
});

export default Login;
