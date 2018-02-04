import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";

import { defaultAction } from "./actions";
import store from "./store";

class DefaultComponent extends Component {
  componentDidMount() {
    this.props.defaultAction();
  }

  render() {
    return (
      <View>
        <Text>Default Component</Text>
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
});
