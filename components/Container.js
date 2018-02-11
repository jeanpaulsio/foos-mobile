import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

const Container = props => {
  return (
    <View
      style={[
        styles.container,
        props.padding && { padding: 20 },
        props.bgColor && { backgroundColor: props.bgColor }
      ]}
    >
      {props.children}
    </View>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.bool,
  bgColor: PropTypes.string
};

Container.defaultProps = {
  padding: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0
  },
});

export { Container };
