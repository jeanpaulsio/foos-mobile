import React, { Component } from "react";
import { object, func } from "prop-types";
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
import { Button, Container } from "../../components";

class Teams extends Component {
  static propTypes = {
    teams: object,
    user: object,
    createTeam: func
  };

  state = { userModalVisible: false, playerIds: [], users: [] };

  componentWillReceiveProps(nextProps) {
    if (this.props.user.list !== nextProps.user.list) {
      this.setState({ users: nextProps.user.list });
    }
  }

  openUserModal = () => {
    this.setState({ userModalVisible: true, playerIds: [] });
  };

  closeUserModal = () => {
    this.setState({ userModalVisible: false, playerIds: [] });
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

  handleAddTeam = async () => {
    const [captain_id, player_id] = this.state.playerIds;

    await this.props.createTeam({ captain_id, player_id });
    this.closeUserModal();
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

    unavailableIds = unavailableIds.filter(id => id !== firstPlayerId);

    let availableUsers = users.filter(user => {
      return !unavailableIds.includes(user.id);
    });

    return availableUsers;
  };

  render() {
    const filteredUsers = this.findAvailablePairs(
      this.state.playerIds[0],
      this.state.users,
      this.props.teams.data
    );

    const buttonIsDisabled = this.state.playerIds.length < 2;

    return (
      <Container title="Teams">
        <Modal
          visible={this.state.userModalVisible}
          animationType={"slide"}
          onRequestClose={() => this.closeUserModal()}
        >
          <SafeAreaView style={styles.modalContainer}>
            <ScrollView>
              {filteredUsers.map(user => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.container,
                      this.state.playerIds.includes(user.id) &&
                        styles.modalListItemSelected
                    ]}
                    key={user.id}
                    onPress={this.handleSelectPlayer.bind(this, user.id)}
                  >
                    <Text
                      style={[
                        styles.modalListItemText,
                        this.state.playerIds.includes(user.id) &&
                          styles.modalListItemTextSelected
                      ]}
                    >
                      {user.handle}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <Button
              disabled={buttonIsDisabled}
              bgColor={buttonIsDisabled ? colors.TRANSPARENT : colors.GREY}
              borderColor={buttonIsDisabled ? colors.BLACK : colors.GREY}
              textColor={buttonIsDisabled ? colors.BLACK : colors.WHITE}
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

        <ScrollView style={styles.container}>
          {this.props.teams.data.map(team => {
            return (
              <View style={styles.listItem} key={team.id}>
                <Text style={styles.listItemTitle}>{team.team_name}</Text>
                <Text style={styles.listItemBody}>Won: {team.games_won}</Text>
                <Text style={styles.listItemBody}>Lost: {team.games_lost}</Text>
                <Text style={styles.listItemBody}>
                  Pct: {team.winning_percentage}%
                </Text>
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
    flex: 1
  },
  modalListItemSelected: {
    backgroundColor: colors.BLACK
  },
  modalListItemText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.BLACK
  },
  modalListItemTextSelected: {
    color: colors.WHITE
  },
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

const mapStateToProps = ({ teams, user }) => ({ teams, user });

export default connect(mapStateToProps, actions)(Teams);
