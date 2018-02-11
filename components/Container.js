import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import { Alert, Header } from "../components";

const Container = props => {
  return (
    <View
      style={[
        styles.container,
        props.bgColor && { backgroundColor: props.bgColor }
      ]}
    >
      <Alert warning message={props.errorMessage} />
      <Alert success message={props.successMessage} />
      {!props.hideHeader && (
        <Header title={props.title} handlePress={props.handleNavigation} />
      )}
      <View
        style={[
          styles.children,
          props.style,
        ]}
      >
        {props.children}
      </View>
    </View>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  errorMessage: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
  padding: PropTypes.bool,
  bgColor: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
  handleNavigation: PropTypes.func,
  hideHeader: PropTypes.bool,
};

Container.defaultProps = {
  padding: false,
  errorMessage: "",
  successMessage: ""
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  children: {
    flex: 1
  }
});

export { Container };
