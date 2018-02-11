import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import PropTypes from "prop-types";

class Button extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }

  handlePressIn = () => {
    Animated.spring(this.animatedValue, {
      toValue: 1.1
    }).start();
  };

  handlePressOut = () => {
    if (this.props.disabled) return;

    Animated.spring(this.animatedValue, {
      toValue: 1
    }).start();

    this.props.handlePress();
  };

  render() {
    const { disabled, children, bgColor, borderColor, textColor } = this.props;

    const animatedStyle = {
      transform: [{ scale: this.animatedValue }]
    };
    const colorStyle = {
      backgroundColor: bgColor,
      borderColor: borderColor
    };
    const textStyle = {
      color: textColor
    };

    return (
      <TouchableWithoutFeedback
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
      >
        <Animated.View
          style={[!disabled && animatedStyle, styles.button, colorStyle]}
        >
          <Text style={[styles.text, textStyle]}>{children}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

Button.propTypes = {
  bgColor: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  disabled: false
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1
  },
  text: {
    alignSelf: "center",
    fontSize: 16,
    paddingVertical: 13,
    fontWeight: "600"
  }
});

export { Button };
