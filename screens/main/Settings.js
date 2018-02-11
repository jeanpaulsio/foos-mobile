import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import * as actions from "../../actions";
import * as colors from "../../styles/colors";
import { Button, Container, Input } from "../../components";
import { someEmptyItems } from "../../lib/utils";

class Settings extends Component {
  state = { oldPassword: "", password: "" };

  handleUpdateProfile = () => {
    const params = {
      old_password: this.state.oldPassword,
      password: this.state.password
    };
    this.props.updateUser(params);
    this.setState({ oldPassword: "", password: "" });
  };

  handleSignOut = () => this.props.signOut();

  render() {
    const { oldPassword, password } = this.state;
    const buttonIsDisabled = someEmptyItems(oldPassword, password);

    return (
      <Container
        style={{ paddingTop: 20 }}
        errorMessage={this.props.errors.user}
        successMessage={this.props.success.user}
      >
        <Input
          secureTextEntry
          placeholder="Current Password"
          value={this.state.oldPassword}
          bgColor={colors.BLACK}
          borderColor={colors.BLACK}
          textColor={colors.WHITE}
          placeholderTextColor={colors.GREY}
          onChangeText={oldPassword => this.setState({ oldPassword })}
        />

        <Input
          secureTextEntry
          placeholder="Update Password"
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
          handlePress={this.handleUpdateProfile}
        >
          Update Password
        </Button>

        <Button
          bgColor={colors.TRANSPARENT}
          borderColor={colors.PRIMARY}
          textColor={colors.PRIMARY}
          handlePress={this.handleSignOut}
        >
          Sign Out
        </Button>
      </Container>
    );
  }
}

Settings.propTypes = {
  signOut: PropTypes.func,
  updateUser: PropTypes.func,
  errors: PropTypes.object,
  success: PropTypes.object
};

const mapStateToProps = ({ errors, success }) => ({ errors, success });

export default connect(mapStateToProps, actions)(Settings);
