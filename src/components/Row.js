import React, { Component } from "React"
import { View, Text, StyleSheet, Switch, Button, TextInput } from "react-native"

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
      <Button title="Edit" color="green" onPress={this.props.onEdit} />
    )

    const removeButton = (
      <Button title="Rimuovi" color="red" onPress={this.props.onRemoveItem} />
    )

    const doneButton = (
      <Button
        title="Salva"
        color="blue"
        onPress={() => this.props.onEdit(false)}
      />
    )

    const editingComponent = (
      <View style={styles.textWrapper}>
        <TextInput
          style={styles.input}
          multiline
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
