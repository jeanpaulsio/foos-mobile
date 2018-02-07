import React, { Component } from "react";
import { connect } from "react-redux";
import {
  AsyncStorage,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  View
} from "react-native";
import PropTypes from "prop-types";

import * as actions from "../../actions";

class Login extends Component {
  state = { email: "jp@rails.com", password: "Ready2go" };

  async componentDidMount() {
    // await AsyncStorage.removeItem("jwt");
    // if jwt
    //    test jwt to see if it is expired
    //      if its not expired, redirect to "main"
    //      else load login screen
    // else
    //    load login screen
    const jwt = await AsyncStorage.getItem("jwt");

    if (jwt) {
      this.props.navigateTo("main");
    }
  }

  handleSignIn = () => {
    const { email, password } = this.state;
    this.props.authenticate({ email, password }, () => {
      this.props.navigateTo("main")
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Login Screen</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
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

        <TouchableWithoutFeedback onPressIn={this.handleSignIn}>
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

Login.propTypes = {
  authenticate: PropTypes.func
};

export default connect(null, actions)(Login);
