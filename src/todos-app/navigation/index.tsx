import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TodosList from '../screens/TodosList';
import TodosProvider from '../TodosContext';
import TodoDetails from '../screens/TodoDetails';

const Todos = createStackNavigator();

const TodosNavigator = () => (
  <TodosProvider>
    <Todos.Navigator initialRouteName="TodosList">
      <Todos.Screen
        name="TodosList"
        component={TodosList}
      />
      <Todos.Screen
        name="Todo"
        component={TodoDetails}
      />
    </Todos.Navigator>
  </TodosProvider>
);

export default TodosNavigator;
