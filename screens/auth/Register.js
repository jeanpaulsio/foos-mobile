import React, { Component } from "react";
import { connect } from "react-redux";
import { AsyncStorage, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import * as actions from "../../actions";
import * as colors from "../../styles/colors";
import { Button, Container, Center, Input } from "../../components";

class Register extends Component {
  state = { handle: "", password: "" };

  handleRegister = () => {

  }

  render() {
    return (
      <Container errorMessage={""}>
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
          bgColor={colors.PRIMARY}
          borderColor={colors.WHITE}
          textColor={colors.WHITE}
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

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80
  }
});

export default connect(null, actions)(Register);
