import React, { Component } from "react";
import { connect } from "react-redux";
import { AsyncStorage, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import * as actions from "../../actions";
import * as colors from "../../styles/colors";
import { Button, Container, Center, Input } from "../../components";
import { forceSignOut } from "../../lib/auth_helpers";

class Login extends Component {
  state = { handle: "", password: "", forceSignOut: true };

  async componentDidMount() {
    this.state.forceSignOut && forceSignOut();

    const jwt = await AsyncStorage.getItem("jwt");
    await this.props.checkToken(jwt);

    jwt && this.props.navigateTo("main");
  }

  handleSignIn = () => {
    const { handle, password } = this.state;
    this.props.authenticate({ handle, password }, () => {
      this.props.navigateTo("main");
    });
  };

  render() {
    return (
      <Container errorMessage={this.props.errors.authErrors}>
        <Center>
          <Image
            style={styles.image}
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
          bgColor={colors.PRIMARY}
          borderColor={colors.WHITE}
          textColor={colors.WHITE}
          handlePress={this.handleSignIn}
        >
          Sign In
        </Button>

        <Button
          bgColor={colors.GREY}
          borderColor={colors.WHITE}
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
  authenticate: PropTypes.func,
  checkToken: PropTypes.func,
  navigateTo: PropTypes.func,
  navigation: PropTypes.object
};

const mapStateToProps = ({ errors }) => ({ errors })

export default connect(mapStateToProps, actions)(Login);
