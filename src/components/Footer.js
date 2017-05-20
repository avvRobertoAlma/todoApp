import React, { Component } from "React"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

class Footer extends Component {
  render() {
    const { filter } = this.props
    return (
      <View style={styles.container}>
        <Text>{this.props.count} Rimanenti</Text>
        <View style={styles.filters}>
          <TouchableOpacity
            style={[styles.filter, filter == "ALL" && styles.selected]}
            onPress={() => this.props.onFilter("ALL")}
          >
            <Text>
              Tutti
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filter, filter == "ACTIVE" && styles.selected]}
            onPress={() => this.props.onFilter("ACTIVE")}
          >
            <Text>
              Attivi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filter, filter == "COMPLETED" && styles.selected]}
            onPress={() => this.props.onFilter("COMPLETED")}
          >
            <Text>
              Completati
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filter}
            onPress={this.props.onClearComplete}
          >
            <Text>
              Clear
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 18,
    alignItems: "center",
    justifyContent: "space-between",
  },
  filters: {
    flexDirection: "row",
    alignItems: "center",
  },
  filter: {
    padding: 9,
    borderWidth: 3,
    borderColor: "transparent",
    borderRadius: 4,
  },
  selected: {
    borderColor: "purple",
  },
})

export default Footer
