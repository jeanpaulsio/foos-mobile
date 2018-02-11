import React, { Component } from "react";
import { connect } from "react-redux";
import { Keyboard, View } from "react-native";
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
    Keyboard.dismiss();
  };

  handleSignOut = () => this.props.signOut();

  render() {
    const { oldPassword, password } = this.state;
    const buttonIsDisabled = someEmptyItems(oldPassword, password);

    return (
      <Container
        bgColor={colors.WHITE}
        style={{ paddingTop: 20 }}
        errorMessage={this.props.errors.user}
        successMessage={this.props.success.user}
        title="Settings"
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
          bgColor={buttonIsDisabled ? colors.TRANSPARENT : colors.GREY}
          borderColor={buttonIsDisabled ? colors.BLACK : colors.GREY}
          textColor={buttonIsDisabled ? colors.BLACK : colors.WHITE}
          handlePress={this.handleUpdateProfile}
        >
          Update Password
        </Button>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end"
          }}
        >
          <Button
            bgColor={colors.BLACK}
            borderColor={colors.BLACK}
            textColor={colors.WHITE}
            handlePress={this.handleSignOut}
          >
            Sign Out
          </Button>
        </View>
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
