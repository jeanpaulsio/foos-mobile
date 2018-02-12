import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  SafeAreaView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import * as actions from "../../actions";
import * as colors from "../../styles/colors";
import * as dimensions from "../../styles/dimensions";
import { Button, Container } from "../../components";

class Teams extends Component {
  state = { userModalVisible: true, playerIds: [], users: [] };

  componentWillReceiveProps(nextProps) {
    if (this.props.user.list !== nextProps.user.list) {
      this.setState({ users: nextProps.user.list });
    }
  }

  openUserModal = () => {
    this.setState({ userModalVisible: true });
  };

  closeUserModal = () => {
    this.setState({ userModalVisible: false });
  };

  handleSelectPlayer = id => {
    if (this.state.playerIds.length < 2) {
      this.setState({ playerIds: this.state.playerIds.concat(id) });
    }

    if (this.state.playerIds.includes(id)) {
      const index = this.state.playerIds.findIndex(ids => ids === id);
      const playerIds = [
        ...this.state.playerIds.slice(0, index),
        ...this.state.playerIds.slice(index + 1)
      ];
      this.setState({ playerIds });
    }
  };

  handleAddTeam = () => {
    const [captain_id, player_id] = this.state.playerIds

    console.log("team of:", captain_id, player_id);
  };

  findAvailablePairs = (firstPlayerId, users, teams) => {
    const unavailablePairs = teams.filter(item => {
      return (
        item.captain_id === firstPlayerId || item.player_id === firstPlayerId
      );
    });

    let unavailableIds = [];

    unavailablePairs.forEach(pair => {
      unavailableIds.push(pair.captain_id);
      unavailableIds.push(pair.player_id);
    });

    unavailableIds = unavailableIds.filter(id => id !== firstPlayerId)

    let availableUsers = users.filter(user => {
      return !unavailableIds.includes(user.id);
    });

    return availableUsers
  };

  render() {
    const filteredUsers = this.findAvailablePairs(
      this.state.playerIds[0],
      this.state.users,
      this.props.teams.data
    );

    return (
      <Container title="Teams">
        <Modal
          visible={this.state.userModalVisible}
          animationType={"slide"}
          onRequestClose={() => this.closeUserModal()}
        >
          <SafeAreaView style={styles.modalContainer}>
            <ScrollView style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                {filteredUsers.map(user => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.listItemContainer,
                        {
                          backgroundColor: this.state.playerIds.includes(
                            user.id
                          )
                            ? "red"
                            : "white"
                        }
                      ]}
                      key={user.id}
                      onPress={this.handleSelectPlayer.bind(this, user.id)}
                    >
                      <Text style={styles.listItem}>{user.handle}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
            <Button
              bgColor={colors.BLACK}
              borderColor={colors.BLACK}
              textColor={colors.WHITE}
              handlePress={this.handleAddTeam}
            >
              Add Team
            </Button>

            <Button
              bgColor={colors.BLACK}
              borderColor={colors.BLACK}
              textColor={colors.WHITE}
              handlePress={this.closeUserModal}
            >
              Close
            </Button>
          </SafeAreaView>
        </Modal>

        <ScrollView style={styles.scrollContainer}>
          {this.props.teams.data.map(team => {
            return (
              <View style={styles.listItemContainer} key={team.id}>
                <Text style={styles.listItem}>{team.team_name}</Text>
                <Text>Won: {team.games_won}</Text>
                <Text>Lost: {team.games_lost}</Text>
                <Text>Pct: {team.winning_percentage}</Text>
              </View>
            );
          })}
        </ScrollView>

        <Button
          bgColor={colors.BLACK}
          borderColor={colors.BLACK}
          textColor={colors.WHITE}
          handlePress={this.openUserModal}
        >
          Add Team
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    height: dimensions.SCREEN_HEIGHT
  },
  innerContainer: {
    borderWidth: 1,
    borderColor: "red",
    flex: 1
  },
  scrollContainer: {
    margin: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: dimensions.SCREEN_WIDTH
  },
  listItemContainer: {
    paddingVertical: 10,
    borderBottomWidth: 0.5
  },
  listItem: {
    fontSize: 16,
    fontWeight: "600"
  }
});

const mapStateToProps = ({ teams, user }) => ({ teams, user });

export default connect(mapStateToProps, actions)(Teams);
