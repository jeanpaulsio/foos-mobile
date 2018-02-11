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
    this.props.warning && this.props.dismissErrors();
    this.props.success && this.props.dismissSuccess();
  };

  render() {
    if (this.props.message === "") return <View />;

    return (
      <TouchableOpacity
        onPress={this.handlePress}
        style={[
          styles.alertContainer,
          this.props.warning && styles.warning,
          this.props.success && styles.success
        ]}
      >
        <View style={styles.alertContainerMessage}>
          <Text style={styles.alertMessage}>{this.props.message}</Text>
        </View>

        <View style={styles.alertContainerClose}>
          <Text style={styles.alertMessage}>
            <Ionicons name="md-close-circle" size={20} color={colors.WHITE} />
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  dismissErrors: PropTypes.func,
  dismissSuccess: PropTypes.func,
  warning: PropTypes.bool,
  success: PropTypes.bool
};

const styles = StyleSheet.create({
  alertContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: dimensions.SCREEN_WIDTH,
    paddingTop: 20
  },
  alertContainerMessage: {
    width: dimensions.SCREEN_WIDTH * 0.85,
    paddingVertical: 10,
    paddingLeft: 10
  },
  alertContainerClose: {
    width: dimensions.SCREEN_WIDTH * 0.15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  alertMessage: {
    color: colors.WHITE,
    fontSize: 12,
    fontWeight: "600"
  },
  warning: {
    backgroundColor: colors.WARNING
  },
  success: {
    backgroundColor: colors.BLACK
  }
});

const connectedAlert = connect(null, actions)(Alert);

export { connectedAlert as Alert };
