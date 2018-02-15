import React, { Component } from "react";
import PropTypes from "prop-types";
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
import * as dimensions from "../../styles/dimensions";
import { Button, Container } from "../../components";

class Teams extends Component {
  state = { gameModalVisible: false, teamIds: [], teams: [] };

  componentWillReceiveProps(nextProps) {
    if (this.props.teams.data !== nextProps.teams.data) {
      this.setState({ teams: nextProps.teams.data });
    }
  }

  openGameModal = () => {
    this.setState({ gameModalVisible: true });
  };

  closeGameModal = () => {
    this.setState({ gameModalVisible: false });
  };

  handleSelectTeam = id => {
    if (this.state.teamIds.length === 2) {
      this.setState({ teamIds: [
        this.state.teamIds[0],
        id
      ]})
      return
    }

    this.setState({ teamIds: this.state.teamIds.concat(id) });
  };

  findAvailableTeams = (firstTeamId, teams) => {
    if (!firstTeamId) return teams;

    const index = teams.findIndex(team => team.id === firstTeamId)
    const { captain_id, player_id } = teams[index];
    const teamPlayers = [captain_id, player_id]

    return teams.filter(({captain_id, player_id}) => {
      return !(teamPlayers.includes(captain_id) || teamPlayers.includes(player_id))
    })
  };

  handleAddGame = async () => {
    const [winning_team_id, losing_team_id] = this.state.teamIds;
    await this.props.createGame({ winning_team_id, losing_team_id });
    await this.setState({ teamIds: [] })
    this.closeGameModal()
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

    return (
      <Container
        bgColor={colors.WHITE}
        style={{ paddingTop: 20 }}
        title="Games"
      >
        <Modal
          visible={this.state.gameModalVisible}
          animationType={"slide"}
          onRequestClose={() => this.closeGameModal()}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View>
              <Text style={{ fontWeight: "600" }}>Winning Team:</Text>
            </View>
            {winningTeamId && (
              <Text>{this.displayTeamNameById(winningTeamId)}</Text>
            )}

            <View>
              <Text>========</Text>
            </View>

            <View>
              <Text style={{ fontWeight: "600" }}>Losing Team:</Text>
            </View>
            {losingTeamId && (
              <Text>{this.displayTeamNameById(losingTeamId)}</Text>
            )}

            <View>
              <Text>========</Text>
            </View>

            <TouchableOpacity onPress={() => this.setState({ teamIds: [] })}>
              <Text>RESET</Text>
            </TouchableOpacity>

            <ScrollView style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                {filteredTeams.map(team => {
                  return (
                    <TouchableOpacity
                      style={[styles.listItemContainer]}
                      key={team.id}
                      onPress={this.handleSelectTeam.bind(this, team.id)}
                    >
                      <Text style={styles.listItem}>{team.team_name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
            <Button
              bgColor={colors.BLACK}
              borderColor={colors.BLACK}
              textColor={colors.WHITE}
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

        <ScrollView>
          {this.props.games.data.slice().reverse().map(game => {
            return (
              <View
                style={{ borderBottomWidth: 0.5, paddingVertical: 10 }}
                key={game.id}
              >
                <Text style={{ fontWeight: "600" }}>
                  Winner: {game.winning_team}
                </Text>
                <Text>Loser: {game.losing_team}</Text>
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
    flex: 1,
    height: dimensions.SCREEN_HEIGHT
  },
  innerContainer: {
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

const mapStateToProps = ({ games, teams }) => ({ games, teams });

export default connect(mapStateToProps, actions)(Teams);
