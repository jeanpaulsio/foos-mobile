import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Text, ScrollView, View } from "react-native";

import * as actions from "../../actions";
import * as colors from "../../styles/colors";
import { Container } from "../../components";

// The results on this screen are calculated
// The API sends users back in order - so no front-end sorting needed
// Styling could use some love

class Teams extends Component {
  render() {
    return (
      <Container
        bgColor={colors.WHITE}
        style={{ paddingTop: 20 }}
        title="Leaderboard"
      >
        <ScrollView>
          {this.props.user.list.map(user => {
            return (
              <View key={user.id} style={{borderWidth: 1, paddingVertical: 10}}>
                <Text>
                  {user.handle} - W: {user.games_won} L: {user.games_lost}
                </Text>
                <Text>
                  PCT: {user.winning_percentage}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, actions)(Teams);
