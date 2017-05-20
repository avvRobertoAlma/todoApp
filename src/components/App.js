import React, { Component } from "React"
import {
  Image,
  View,
  Text,
  StyleSheet,
  Platform,
  ListView,
  AsyncStorage,
  ActivityIndicator,
} from "react-native"

import Header from "./Header"
import Footer from "./Footer"
import Row from "./Row"

const filterItems = (filter, items) => {
  return items.filter(item => {
    if (filter == "ALL") {
      return true
    } else if (filter == "ACTIVE") {
      return !item.complete
    } else if (filter == "COMPLETED") {
      return item.complete
    }
  })
}

class App extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      loading: true,
      value: "",
      items: [],
      dataSource: ds.cloneWithRows([]),
      filter: "ALL",
    }
    this.handleToggleComplete = this.handleToggleComplete.bind(this)
    this.onAddItem = this.onAddItem.bind(this)
    this.setSource = this.setSource.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.handleClearComplete = this.handleClearComplete.bind(this)
    this.handleToggleEditing = this.handleToggleEditing.bind(this)
    this.handleUpdateText = this.handleUpdateText.bind(this)
  }

  componentWillMount() {
    AsyncStorage.getItem("items").then(json => {
      try {
        const items = JSON.parse(json)
        this.setSource(items, items, { loading: false })
      } catch (error) {
        alert("Error:", error.message)
        this.setState({
          loading: false,
        })
      }
    })
  }

  handleUpdateText(key, text) {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) return item
      return {
        ...item,
        text,
      }
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems))
  }

  handleToggleEditing(key, editing) {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) return item
      return {
        ...item,
        editing,
      }
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems))
  }

  handleClearComplete() {
    const newItems = filterItems("ACTIVE", this.state.items)
    this.setSource(newItems, newItems)
  }

  handleFilter(filter) {
    this.setSource(this.state.items, filterItems(filter, this.state.items), {
      filter,
    })
  }

  setSource(items, itemsDataSource, otherState = {}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDataSource),
      ...otherState,
    })
    AsyncStorage.setItem("items", JSON.stringify(items))
  }

  handleRemoveItem(key) {
    const newItems = this.state.items.filter(item => {
      if (item.key !== key) return item
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems))
  }

  handleToggleComplete(key, complete) {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) return item
      return {
        ...item,
        complete,
      }
    })
    console.log(newItems)
    this.setSource(newItems, filterItems(this.state.filter, newItems))
  }
  onAddItem() {
    if (!this.state.value) return
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false,
      },
    ]
    this.setSource(newItems, filterItems(this.state.filter, newItems), {
      value: "",
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.onAddItem}
          onChange={value => this.setState({ value })}
        />
        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            renderRow={({ key, ...value }) => {
              return (
                <Row
                  key={key}
                  onComplete={complete =>
                    this.handleToggleComplete(key, complete)}
                  onUpdate={text => this.handleUpdateText(key, text)}
                  onEdit={editing => this.handleToggleEditing(key, editing)}
                  onRemoveItem={() => this.handleRemoveItem(key)}
                  {...value}
                />
              )
            }}
            renderSeparator={(sectionId, rowId) => {
              return <View key={rowId} style={styles.separator} />
            }}
          />
        </View>
        <Footer
          filter={this.state.filter}
          onFilter={this.handleFilter}
          count={filterItems("ACTIVE", this.state.items).length}
          onClearComplete={this.handleClearComplete}
        />
        {this.state.loading &&
          <View style={styles.loading}>
            <ActivityIndicator animating size="large" />
          </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    ...Platform.select({
      android: {
        paddingTop: 10,
      },
    }),
  },
  content: {
    flex: 1,
  },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.2)",
  },
  list: {
    backgroundColor: "#FFF",
  },
  separator: {
    borderWidth: 1,
    borderColor: "#F5F5F5",
  },
})

export default App
