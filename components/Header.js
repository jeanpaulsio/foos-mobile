import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as colors from "../styles/colors";
import * as dimensions from "../styles/dimensions";

class Header extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeView}>
        <View style={styles.container}>
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
      </SafeAreaView>
    );
  }
}

Header.propTypes = {
  handlePress: PropTypes.func,
  title: PropTypes.string
};

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: colors.WHITE
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.WHITE,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.BLACK
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
    color: colors.BLACK,
    fontSize: 18,
    fontWeight: "600"
  }
});

export { Header };
