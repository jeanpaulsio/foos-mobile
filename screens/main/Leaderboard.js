import React, { Component } from "react";
import { object } from "prop-types";
import { connect } from "react-redux";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import * as actions from "../../actions";
import * as colors from "../../styles/colors";
import { Container } from "../../components";

// The results on this screen are calculated
// The API sends users back in order - so no front-end sorting needed
// Styling could use some love

class Teams extends Component {
  static propTypes = {
    user: object
  };

  render() {
    return (
      <Container bgColor={colors.WHITE} title="Leaderboard">
        <ScrollView style={styles.container}>
          {this.props.user.list.map((user, index) => {
            return (
              <View style={styles.listItem} key={user.id}>
                {index === 0 ? (
                  <Text style={[styles.listItemTitle, { fontSize: 20 }]}>
                    🏆 {user.handle}
                  </Text>
                ) : (
                  <Text style={styles.listItemTitle}>{user.handle}</Text>
                )}

                <Text style={styles.listItemBody}>Won: {user.games_won}</Text>
                <Text style={styles.listItemBody}>Lost: {user.games_lost}</Text>
                <Text style={styles.listItemBody}>
                  Pct: {user.winning_percentage}%
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  listItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: colors.GREY
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.BLACK
  },
  listItemBody: {
    fontSize: 14,
    color: colors.GREY
  }
});

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, actions)(Teams);
