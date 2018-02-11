import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import { Alert } from "../components";

const Container = props => {
  return (
    <View
      style={[
        styles.container,
        props.bgColor && { backgroundColor: props.bgColor }
      ]}
    >
      <Alert message={props.errorMessage} />
      <View style={styles.children}>{props.children}</View>
    </View>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  errorMessage: PropTypes.string.isRequired,
  padding: PropTypes.bool,
  bgColor: PropTypes.string
};

Container.defaultProps = {
  padding: false,
  errorMessage: ""
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  children: {
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});

export { Container };
