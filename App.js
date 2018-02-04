import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import { TextInput, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import axios from "axios";

import { defaultAction } from "./actions";
import store from "./store";

class DefaultComponent extends Component {
  state = {
    email: "",
    password: "",
  };

  componentDidMount() {
    this.props.defaultAction();
  }

  handleLogin = () => {

  };

  render() {
    return (
      <View>
        <Text>Default Component</Text>
        <View style={styles.inputContainer}>
          <TextInput onChangeText={email => this.setState({ email })} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput onChangeText={password => this.setState({ password })} />
        </View>
        <TouchableWithoutFeedback
          onPressIn={this.handleLogin}
        >
          <View>
            <Text>Login</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const Connected = connect(null, { defaultAction })(DefaultComponent);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Connected />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    borderWidth: 1,
  },
  input: {
    height: 42,
    marginVertical: 3,
    fontSize: 16,
  },
});
