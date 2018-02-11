import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StatusBarPaddingIOS from "react-native-ios-status-bar-padding";

import * as colors from "../styles/colors";
import * as dimensions from "../styles/dimensions";

class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBarPaddingIOS />
        <View style={styles.textContainer}>
          <TouchableOpacity
            style={[styles.section, styles.sectionLeft]}
            onPress={this.props.handlePress}
          >
            {this.props.handlePress && (
              <Ionicons
                name="md-arrow-round-back"
                size={23}
                color={colors.WHITE}
              />
            )}
          </TouchableOpacity>
          <View style={styles.section}>
            <Text style={styles.text}>{this.props.title}</Text>
          </View>

          <TouchableOpacity
            style={[styles.section, styles.sectionRight]}
            onPress={() => {}}
          />
        </View>
      </View>
    );
  }
}

Header.propTypes = {
  handlePress: PropTypes.func,
  title: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.GREY_DARKER,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.GREY_DARK
  },
  textContainer: {
    width: dimensions.SCREEN_WIDTH,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  section: {
    justifyContent: "center",
    alignItems: "center",
    width: dimensions.SCREEN_WIDTH * 0.7,
    paddingVertical: 15
  },
  sectionLeft: {
    width: dimensions.SCREEN_WIDTH * 0.15,
    alignItems: "flex-start",
    paddingLeft: 10
  },
  sectionRight: {
    width: dimensions.SCREEN_WIDTH * 0.15,
    alignItems: "flex-end",
    paddingRight: 10
  },
  text: {
    color: colors.GREY,
    fontSize: 18,
    fontWeight: "600"
  }
});

export { Header };
