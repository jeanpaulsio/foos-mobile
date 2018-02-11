import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";

import * as actions from "../actions";
import * as colors from "../styles/colors";
import * as dimensions from "../styles/dimensions";

class Alert extends Component {
  handlePress = () => {
    this.props.dismissErrors();
  };

  render() {
    if (this.props.message === "") return <View />;

    return (
      <TouchableOpacity
        onPress={this.handlePress}
        style={styles.errorContainer}
      >
        <View style={styles.errorContainerMessage}>
          <Text style={styles.errorMessage}>{this.props.message}</Text>
        </View>

        <View style={styles.errorContainerClose}>
          <Text style={styles.errorMessage}>
            <Ionicons name="md-close-circle" size={20} color={colors.WHITE} />
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  dismissErrors: PropTypes.func
};

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: colors.WARNING,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: dimensions.SCREEN_WIDTH,
    paddingTop: 20
  },
  errorContainerMessage: {
    width: dimensions.SCREEN_WIDTH * 0.85,
    paddingVertical: 10,
    paddingLeft: 10
  },
  errorContainerClose: {
    width: dimensions.SCREEN_WIDTH * 0.15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  errorMessage: {
    color: colors.WHITE,
    fontSize: 12,
    fontWeight: "600"
  }
});

const connectedAlert = connect(null, actions)(Alert);

export { connectedAlert as Alert };
