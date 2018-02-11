import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import * as actions from "../actions";
import * as colors from "../styles/colors";
import * as dimensions from "../styles/dimensions";

class TabBar extends Component {
  render() {
    const currentIndex = this.props.nav.routes[1].index;
    const tabs = [
      { index: 0, name: "Games", icon: "md-man", route: "games" },
      {
        index: 1,
        name: "Leaderboard",
        icon: "md-trophy",
        route: "leaderboard"
      },
      { index: 2, name: "Teams", icon: "md-contacts", route: "teams" },
      { index: 3, name: "Settings", icon: "md-settings", route: "settings" }
    ];

    return (
      <SafeAreaView style={styles.safeView}>
        <View style={styles.tabContainer}>
          {tabs.map(tab => {
            return (
              <TouchableOpacity
                key={tab.index}
                style={styles.tab}
                onPress={() => this.props.navigateTo(tab.route)}
              >
                <Ionicons
                  name={tab.icon}
                  size={26}
                  color={
                    currentIndex === tab.index ? colors.WHITE : colors.GREY
                  }
                />

                <Text
                  style={[
                    styles.tabText,
                    currentIndex === tab.index && styles.tabTextSelected
                  ]}
                >
                  {tab.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    );
  }
}

TabBar.propTypes = {
  navigateTo: PropTypes.func,
  nav: PropTypes.object
};

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: colors.GREY_DARK
  },
  tabContainer: {
    width: dimensions.SCREEN_WIDTH,
    height: 60,
    backgroundColor: colors.GREY_DARK,
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: colors.GREY
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  tabText: {
    fontSize: 8,
    color: colors.GREY
  },
  tabTextSelected: {
    color: colors.WHITE
  }
});

const mapStateToProps = ({ nav }) => ({ nav });

const connectedTabBar = connect(mapStateToProps, actions)(TabBar);

export { connectedTabBar as TabBar };
