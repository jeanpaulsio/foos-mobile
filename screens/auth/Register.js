import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import * as actions from "../../actions";
import * as colors from "../../styles/colors";
import { someEmptyItems } from "../../lib/utils";
import { Button, Container, Center, Input } from "../../components";

class Register extends Component {
  state = { handle: "", password: "" };

  handleRegister = () => {
    const params = {
      handle: this.state.handle,
      password: this.state.password,
      password_confirmation: this.state.password
    };

    this.props.signUp(params);
    this.setState({ handle: "", password: "" });
  };

  render() {
    const { handle, password } = this.state;
    const buttonIsDisabled = someEmptyItems(handle, password);

    return (
      <Container errorMessage={this.props.errors.registrationErrors}>
        <Center>
          <Image
            style={styles.image}
            // eslint-disable-next-line
            source={require("../../assets/icon.png")}
          />
        </Center>

        <Input
          placeholder="Username"
          value={this.state.handle}
          bgColor={colors.BLACK}
          borderColor={colors.BLACK}
          textColor={colors.WHITE}
          placeholderTextColor={colors.GREY}
          onChangeText={handle => this.setState({ handle })}
        />

        <Input
          secureTextEntry
          placeholder="Password"
          value={this.state.password}
          bgColor={colors.BLACK}
          borderColor={colors.BLACK}
          textColor={colors.WHITE}
          placeholderTextColor={colors.GREY}
          onChangeText={password => this.setState({ password })}
        />

        <Button
          disabled={buttonIsDisabled}
          bgColor={buttonIsDisabled ? colors.TRANSPARENT : colors.PRIMARY}
          borderColor={buttonIsDisabled ? colors.PRIMARY : colors.WHITE}
          textColor={buttonIsDisabled ? colors.PRIMARY : colors.WHITE}
          handlePress={this.handleRegister}
        >
          Register
        </Button>

        <Button
          bgColor={colors.GREY}
          borderColor={colors.WHITE}
          textColor={colors.WHITE}
          handlePress={() => this.props.navigation.goBack()}
        >
          Go Back
        </Button>
      </Container>
    );
  }
}

Register.propTypes = {
  signUp: PropTypes.func,
  navigateTo: PropTypes.func,
  navigation: PropTypes.object,
  errors: PropTypes.object
};

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80
  }
});

const mapStateToProps = ({ errors }) => ({ errors });

export default connect(mapStateToProps, actions)(Register);
