import React, { Component } from "react";
import { func, object } from "prop-types";
import { connect } from "react-redux";
import { AsyncStorage, Image, Keyboard, StyleSheet } from "react-native";

import * as actions from "../../actions";
import * as colors from "../../styles/colors";
import { Button, Center, Container, Input, Spinner } from "../../components";
import { someEmptyItems } from "../../lib/utils";
import { removeToken } from "../../lib/auth_helpers";

class Login extends Component {
  static propTypes = {
    signIn: func,
    validateToken: func,
    fetchTeams: func,
    fetchUsers: func,
    fetchGames: func,
    navigateTo: func,
    navigation: object,
    auth: object,
    errors: object
  };

  state = {
    finishedLoading: false,
    handle: "",
    password: "",
    forceSignOut: false
  };

  async componentDidMount() {
    this.state.forceSignOut && removeToken();

    const jwt = await AsyncStorage.getItem("jwt");
    await this.props.validateToken(jwt, () => {
      this.fetchData();
      this.setState({ finishedLoading: true });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isValidatingToken && !nextProps.auth.jwt) {
      this.setState({ finishedLoading: true });
    }
  }

  fetchData = () => {
    this.props.fetchTeams();
    this.props.fetchUsers();
    this.props.fetchGames();
  };

  handleSignIn = () => {
    const { handle, password } = this.state;
    this.props.signIn({ handle, password }, () => this.fetchData());
    this.setState({ handle: "", password: "" });
    Keyboard.dismiss();
  };

  render() {
    const { handle, password } = this.state;
    const buttonIsDisabled = someEmptyItems(handle, password);

    if (!this.state.finishedLoading) return <Spinner />;

    return (
      <Container
        bgColor={colors.WHITE}
        errorMessage={this.props.errors.auth}
        hideHeader
      >
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
          bgColor={buttonIsDisabled ? colors.TRANSPARENT : colors.GREY}
          borderColor={buttonIsDisabled ? colors.BLACK : colors.GREY}
          textColor={buttonIsDisabled ? colors.BLACK : colors.WHITE}
          handlePress={this.handleSignIn}
        >
          Sign In
        </Button>

        <Button
          bgColor={colors.BLACK}
          borderColor={colors.BLACK}
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
    marginTop: 10,
    width: 80,
    height: 80
  }
});

const mapStateToProps = ({ auth, errors }) => ({ auth, errors });

export default connect(mapStateToProps, actions)(Login);
