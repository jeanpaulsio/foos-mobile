import React, { Component } from "react";
import { connect } from "react-redux";
import { AsyncStorage, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import * as actions from "../../actions";
import * as colors from "../../styles/colors";
import { Button, Container, Center, Input } from "../../components";
import { someEmptyItems } from "../../lib/utils";
import { removeToken } from "../../lib/auth_helpers";

class Login extends Component {
  state = { handle: "", password: "", forceSignOut: false };

  async componentDidMount() {
    this.state.forceSignOut && removeToken();

    const jwt = await AsyncStorage.getItem("jwt");
    this.props.validateToken(jwt);
  }

  handleSignIn = () => {
    const { handle, password } = this.state;
    this.props.signIn({ handle, password });
    this.setState({ handle: "", password: "" });
  };

  render() {
    const { handle, password } = this.state;
    const buttonIsDisabled = someEmptyItems(handle, password);

    return (
      <Container
        bgColor={colors.GREY_DARKEST}
        errorMessage={this.props.errors.auth}
      >
        <Center>
          <Image
            style={styles.image}
            // eslint-disable-next-line
            source={require("../../assets/icon_white.png")}
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
          bgColor={buttonIsDisabled ? colors.TRANSPARENT : colors.WHITE}
          borderColor={buttonIsDisabled ? colors.WHITE : colors.GREY_DARKEST}
          textColor={buttonIsDisabled ? colors.WHITE : colors.GREY_DARKEST}
          handlePress={this.handleSignIn}
        >
          Sign In
        </Button>

        <Button
          bgColor={colors.GREY_DARK}
          borderColor={colors.GREY_DARK}
          textColor={colors.WHITE}
          handlePress={() => this.props.navigation.navigate("register")}
        >
          Register
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80
  }
});

Login.propTypes = {
  signIn: PropTypes.func,
  validateToken: PropTypes.func,
  navigateTo: PropTypes.func,
  navigation: PropTypes.object,
  errors: PropTypes.object
};

const mapStateToProps = ({ errors }) => ({ errors });

export default connect(mapStateToProps, actions)(Login);
