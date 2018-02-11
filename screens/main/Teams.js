import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";

import * as actions from "../../actions";
import * as colors from "../../styles/colors";
import * as dimensions from "../../styles/dimensions";
import { Button, Container } from "../../components";

class Teams extends Component {
  state = { userModalVisible: false };

  componentDidMount() {
  }

  openUserModal = () => {
    this.setState({ userModalVisible: true });
  }

  closeUserModal = () => {
    this.setState({ userModalVisible: false });
  }

  handleAddTeam = () => {};

  render() {
    return (
      <Container title="Teams">
        <Modal
          visible={this.state.userModalVisible}
          animationType={"slide"}
          onRequestClose={() => this.closeUserModal()}
        >
          <ScrollView style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text>This is content inside of modal component</Text>
              <Button
                bgColor={colors.BLACK}
                borderColor={colors.BLACK}
                textColor={colors.WHITE}
                handlePress={this.closeUserModal}
              >
                Close
              </Button>
            </View>
          </ScrollView>
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
    flex: 1,
    justifyContent: "center"
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

const mapStateToProps = ({ teams }) => ({ teams });

export default connect(mapStateToProps, actions)(Teams);
