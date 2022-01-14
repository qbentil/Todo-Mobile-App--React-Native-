import {Button, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, View} 
from 'react-native'

import {Constants} from 'expo'
import React from 'react'

let id = 0;

const Todo = props => (
  <View style = {styles.TodoContainer}>
    <Switch value = {props.todo.checked} onValueChange = {props.onToggle}/>
    <Button  title = "Delete" onPress = { props.onDelete} />
    <Text>{props.todo.text}</Text>
  </View>
)

export default class App extends React.Component{
    constructor()
    {
      super();
      this.state = {
        text: "",
        todos: [],
      };
    }

    // add TODO
    addTodo()
    {
      id++;
      if(this.state.text !== "")
      {
        this.setState({
          todos: [
            ...this.state.todos, { id: id++, text: this.state.text, checked: false }
          ]
        });

        // Empty the input
        this.setState({
          text: ""
        })
      }
    }

    // remove TODO
    removeTodo(id){
      this.setState({
        todos: this.state.todos.filter(todo => todo.id !== id)
      });
    }
    // Handle checked todo
    toggleTodoState(id)
    {
      this.setState({
        todos: this.state.todos.map(todo => {
          if (todo.id !== id) return todo;
          return {
            id: todo.id,
            text: todo.text,
            checked: !todo.checked,
          };
        })
      })
    }
    render()
    {
      return (
        <View style = {[styles.fill, styles.AppContainer]}>
          <View style = {styles.HeaderContainer}>
            <Text>TODO Count: {this.state.todos.length}</Text>
            <Text>Unchecked TODO Count: {this.state.todos.filter(todo => !todo.checked).length}</Text>
          </View>
          <View style = {[styles.inputContainer]}>
            <TextInput
              style={styles.input}
              placeholder="Enter TODO Please"
              keyboardType = "alphanumeric"
              value = {this.state.text}
              onChangeText={(text) => this.setState({text})}
            />
            <Button 
              style = {styles.button}
              title = "Add"
              onPress={() => this.addTodo()} 
            />
          </View>
          <ScrollView style = {styles.fill}>
            {this.state.todos.map( todo => (
               <Todo
                todo = {todo}
                onDelete = {() => this.removeTodo(todo.id)} 
                onToggle = {() => this.toggleTodoState(todo.id)}
                key = {todo.id} 
               />
            ))}
          </ScrollView>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  TodoContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: "space-around",
    paddingVertical: 10
  },
  AppContainer: {
    paddingTop: Constants.statusBarHeight
  },
  HeaderContainer: {
    flexDirection: 'row', 
    justifyContent: "space-around",
    paddingVertical: 10
  },
  fill: {
    flex: 1
  },
  inputContainer: {
    flexDirection: 'row', 
    justifyContent: "space-around",
    paddingVertical: 10
  },
  input: {
    height: 40,
    width: 250,
    borderWidth: 0.5,
    padding: 10,
  },
  button: {
    height: 40,
    padding: 10,
  }
})

