import React, { Component } from "react";
import { func, object } from "prop-types";
import { connect } from "react-redux";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import * as actions from "../../actions";
import * as colors from "../../styles/colors";
import { Container } from "../../components";

// The results on this screen are calculated
// The API sends users back in order - so no front-end sorting needed
// Styling could use some love

class Teams extends Component {
  static propTypes = {
    user: object,
    fetchUsers: func
  };

  state = { refreshing: false };

  handleRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.fetchUsers();
    this.setState({ refreshing: false });
  };

  render() {
    return (
      <Container bgColor={colors.WHITE} title="Leaderboard">
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              enabled={true}
              tintColor={colors.GREY}
              colors={[colors.GREY]}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          }
        >
          {this.props.user.list.filter(user => user.games_played > 0).map((user, index) => {
            return (
              <View style={styles.listItem} key={user.id}>
                <View style={styles.handleContainer}>
                  {index === 0 && (
                    <Text style={styles.listItemTitle}>🥇{user.handle}</Text>
                  )}
                  {index === 1 && (
                    <Text style={styles.listItemTitle}>🥈{user.handle}</Text>
                  )}
                  {index === 2 && (
                    <Text style={styles.listItemTitle}>🥉{user.handle}</Text>
                  )}
                  {index > 2 && (
                    <Text style={styles.listItemTitle}>{user.handle}</Text>
                  )}
                  <Text style={styles.listItemTitle}>{user.rating}</Text>
                </View>
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
  handleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
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
