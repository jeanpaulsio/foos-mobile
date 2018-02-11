import React, { Component } from "react"
import { connect } from "react-redux";
import { View } from "react-native";
import PropTypes from "prop-types";

import * as actions from "../../actions";
import * as colors from "../../styles/colors";
import { Button } from "../../components";

class Settings extends Component {
  handleSignOut = () => this.props.signOut()

  render() {
    return (
      <View>
        <Button
          bgColor={colors.PRIMARY}
          borderColor={colors.PRIMARY}
          textColor={colors.WHITE}
          handlePress={this.handleSignOut}
        >
          Sign Out
        </Button>
      </View>
    );
  }
}

Settings.propTypes = {
  signOut: PropTypes.func
}

export default connect(null, actions)(Settings);
