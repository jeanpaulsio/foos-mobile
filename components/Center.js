import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

const Center = props => {
  return <View style={styles.container}>{props.children}</View>;
};

Center.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export { Center };
