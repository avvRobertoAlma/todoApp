import React, { Component } from "React"
import { View, Text, StyleSheet, Switch, Button, TextInput } from "react-native"

import { Icon } from "react-native-elements"

class Row extends Component {
  render() {
    const { complete } = this.props
    const textComponent = (
      <View style={styles.textWrapper}>
        <Text style={[styles.text, complete && styles.complete]}>
          {this.props.text}
        </Text>
      </View>
    )

    const EditButton = (
      <Icon name="mode-edit" color="green" onPress={this.props.onEdit} />
    )

    const removeButton = (
      <Icon name="delete" color="red" onPress={this.props.onRemoveItem} />
    )

    const doneButton = (
      <Icon name="save" color="blue" onPress={() => this.props.onEdit(false)} />
    )

    const editingComponent = (
      <View style={styles.textWrapper}>
        <TextInput
          style={styles.input}
          onChangeText={this.props.onUpdate}
          value={this.props.text}
          autoFocus
        />
      </View>
    )

    const voidComponent = <View />

    return (
      <View style={styles.container}>
        <Switch value={complete} onValueChange={this.props.onComplete} />
        {this.props.editing ? editingComponent : textComponent}
        {this.props.editing ? voidComponent : EditButton}
        {this.props.editing ? doneButton : removeButton}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  input: {
    height: 100,
    flex: 1,
    fontSize: 20,
    padding: 0,
    color: "#4d4d4d",
  },
  textWrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
  complete: {
    textDecorationLine: "line-through",
    textDecorationColor: "red",
  },
  text: {
    fontSize: 20,
  },
})

export default Row
