import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Text } from "react-native";

import * as actions from "../../actions";
import * as colors from "../../styles/colors";
import { Container } from "../../components";

class Teams extends Component {
  componentDidMount() {
    this.props.fetchTeams()
  }

  render() {
    return (
      <Container
        bgColor={colors.WHITE}
        style={{ paddingTop: 20 }}
        title="Teams"
      >
        <Text>Teams</Text>
      </Container>
    );
  }
}


export default connect(null, actions)(Teams);
