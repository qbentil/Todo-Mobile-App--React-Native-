import {Button, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} 
from 'react-native'

import {Constants,} from 'expo-constants'
import React from 'react'
import { StatusBar } from 'expo-status-bar';

let id = 0;

const Todo = props => (
    <View style = {styles.item}>
        <View style = {styles.left}>
          <Switch value = {props.todo.checked} onValueChange = {props.onToggle}/>
          <Text style={styles.text}>{props.todo.text}</Text>
        </View>
        <View>
            <Button  
              title = "Delete" 
              onPress = { props.onDelete} 
              style = {styles.circular}
            />
        </View>
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
            <View style={styles.counters}>
               <Text>TODO Count:</Text>
              <Text style = {styles.count}>{this.state.todos.length}</Text>
            </View>
            <View style={styles.counters}>
               <Text>Unchecked TODO Count:</Text>
              <Text style = {styles.count}>{this.state.todos.filter(todo => !todo.checked).length}</Text>
            </View>
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
  AppContainer: {
    paddingTop: 45,
    backgroundColor: "#e8eaed",
  },
  HeaderContainer: {
    flexDirection: 'row', 
    justifyContent: "space-around",
    paddingVertical: 15,
    paddingHorizontal:10,
    margin: 20,
    borderRadius: 20,
    backgroundColor: "#fff"
  },
  fill: {
    flex: 1
  },
  inputContainer: {
    flexDirection: 'row', 
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10
  },
  counters: {
    flexDirection: "row",
    alignItems: "center"
  },
  count: {
    fontWeight: "bold",
    marginHorizontal: 5,
    color: "#55bcf6",

  },
  input: {
    height: 45,
    width: 300,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 50,
  },
  button: {
    height: 40,
    padding: 10,
  },
  item: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
    marginBottom: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: "center",
    flexWrap: "wrap"
  },
  circular:{
    height: 40,
    padding: 10,
    borderColor: '#55bcf6',
    borderWidth: 2,
    borderRadius: 5 
  },
  text: {
    maxWidth: "80%",
    marginLeft: 10
  },
})

