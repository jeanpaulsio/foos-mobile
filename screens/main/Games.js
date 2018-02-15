import React, { Component } from "react";
import { object, func } from "prop-types";
import { connect } from "react-redux";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Modal,
  TouchableOpacity
} from "react-native";

import * as actions from "../../actions";
import * as colors from "../../styles/colors";
import { Button, Container } from "../../components";

class Teams extends Component {
  static propTypes = {
    games: object,
    teams: object,
    createGame: func,
    fetchUsers: func
  };

  state = { gameModalVisible: false, teamIds: [], teams: [] };

  componentWillReceiveProps(nextProps) {
    if (this.props.teams.data !== nextProps.teams.data) {
      this.setState({ teams: nextProps.teams.data });
    }
  }

  openGameModal = () => {
    this.setState({ gameModalVisible: true, teamIds: [] });
  };

  closeGameModal = () => {
    this.setState({ gameModalVisible: false, teamIds: [] });
  };

  handleSelectTeam = id => {
    if (this.state.teamIds.length === 2) {
      this.setState({
        teamIds: [this.state.teamIds[0], id]
      });
      return;
    }

    this.setState({ teamIds: this.state.teamIds.concat(id) });
  };

  findAvailableTeams = (firstTeamId, teams) => {
    if (!firstTeamId) return teams;
    if (this.state.teamIds.length === 2) return [];

    const index = teams.findIndex(team => team.id === firstTeamId);
    const { captain_id, player_id } = teams[index];
    const teamPlayers = [captain_id, player_id];

    return teams.filter(({ captain_id, player_id }) => {
      return !(
        teamPlayers.includes(captain_id) || teamPlayers.includes(player_id)
      );
    });
  };

  handleAddGame = async () => {
    const [winning_team_id, losing_team_id] = this.state.teamIds;
    await this.props.createGame({ winning_team_id, losing_team_id });
    await this.props.fetchUsers();
    this.closeGameModal();
  };

  displayTeamNameById = id => {
    const index = this.props.teams.data.findIndex(team => {
      return team.id === id;
    });
    const { team_name } = this.props.teams.data[index];
    return team_name;
  };

  render() {
    const filteredTeams = this.findAvailableTeams(
      this.state.teamIds[0],
      this.state.teams
    );
    const [winningTeamId, losingTeamId] = this.state.teamIds;
    const buttonIsDisabled = this.state.teamIds.length < 2;

    return (
      <Container bgColor={colors.WHITE} title="Games">
        <Modal
          visible={this.state.gameModalVisible}
          animationType={"slide"}
          onRequestClose={() => this.closeGameModal()}
        >
          <SafeAreaView style={styles.modalContainer}>
            {this.state.teamIds.length > 0 && (
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => this.setState({ teamIds: [] })}
              >
                <Text style={styles.resetButtonText}>Reset Participants</Text>
              </TouchableOpacity>
            )}

            <View style={styles.participatingTeamsContainer}>
              <Text style={styles.participatingTeamsTitle}>Winning Team:</Text>
              {winningTeamId && (
                <Text style={styles.participatingTeamsBody}>
                  {this.displayTeamNameById(winningTeamId)}
                </Text>
              )}
              {this.state.teamIds.length > 0 && (
                <Text style={styles.participatingTeamsTitle}>Losing Team:</Text>
              )}
              {losingTeamId && (
                <Text style={styles.participatingTeamsBody}>
                  {this.displayTeamNameById(losingTeamId)}
                </Text>
              )}
            </View>

            <ScrollView>
              <View style={styles.innerContainer}>
                {filteredTeams.map(team => {
                  return (
                    <TouchableOpacity
                      style={styles.container}
                      key={team.id}
                      onPress={this.handleSelectTeam.bind(this, team.id)}
                    >
                      <Text style={styles.modalListItemText}>
                        {team.team_name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
            <Button
              disabled={buttonIsDisabled}
              bgColor={buttonIsDisabled ? colors.TRANSPARENT : colors.GREY}
              borderColor={buttonIsDisabled ? colors.BLACK : colors.GREY}
              textColor={buttonIsDisabled ? colors.BLACK : colors.WHITE}
              handlePress={this.handleAddGame}
            >
              Add Game
            </Button>

            <Button
              bgColor={colors.BLACK}
              borderColor={colors.BLACK}
              textColor={colors.WHITE}
              handlePress={this.closeGameModal}
            >
              Close
            </Button>
          </SafeAreaView>
        </Modal>

        <ScrollView style={styles.container}>
          {this.props.games.data
            .slice()
            .reverse()
            .map(game => {
              return (
                <View style={styles.listItem} key={game.id}>
                  <Text style={styles.listItemTitle}>
                    🏆 {game.winning_team}
                  </Text>
                  <Text style={styles.listItemBody}>
                    Losers: {game.losing_team}
                  </Text>
                </View>
              );
            })}
        </ScrollView>
        <Button
          bgColor={colors.BLACK}
          borderColor={colors.BLACK}
          textColor={colors.WHITE}
          handlePress={this.openGameModal}
        >
          Add Game
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1
  },
  modalListItemText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.BLACK
  },
  resetButton: {
    backgroundColor: colors.GREY,
    padding: 13
  },
  resetButtonText: {
    fontWeight: "600",
    fontSize: 16,
    color: colors.WHITE,
    alignSelf: "center"
  },
  participatingTeamsContainer: {
    padding: 20,
    borderBottomWidth: .5,
    borderColor: colors.GREY
  },
  participatingTeamsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.BLACK
  },
  participatingTeamsBody: {
    fontSize: 14,
    color: colors.GREY,
    marginBottom: 5
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
    fontSize: 20,
    fontWeight: "600",
    color: colors.BLACK,
    paddingBottom: 10
  },
  listItemBody: {
    fontSize: 14,
    color: colors.GREY
  }
});

const mapStateToProps = ({ games, teams }) => ({ games, teams });

export default connect(mapStateToProps, actions)(Teams);
