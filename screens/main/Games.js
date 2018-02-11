import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Text } from "react-native";

import * as actions from "../../actions";
import * as colors from "../../styles/colors";
import { Container } from "../../components";

class Teams extends Component {
  render() {
    return (
      <Container
        bgColor={colors.WHITE}
        style={{ paddingTop: 20 }}
        title="Games"
      >
        <Text>Games</Text>
      </Container>
    );
  }
}


export default connect(null, actions)(Teams);
