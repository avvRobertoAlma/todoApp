import React, { Component } from "React"
import { View, Text, StyleSheet, TextInput } from "react-native"

class Header extends Component {
  render() {
    return (
      <View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>To Do List</Text>
        </View>
        <View style={styles.header}>
          <TextInput
            placeholder="Cosa devi fare oggi?"
            returnKeyType="go"
            style={styles.input}
            value={this.props.value}
            onChangeText={this.props.onChange}
            onSubmitEditing={this.props.onAddItem}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleWrapper: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    fontSize: 26,
  },
  input: {
    flex: 1,
    height: 50,
  },
})

export default Header
