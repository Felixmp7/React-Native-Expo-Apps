import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TodosList from '../screens/todos/TodosList';
import TodosProvider from '../contexts/TodosContext';
import CreateTodo from '../screens/todos/CreateTodo';

const Todos = createStackNavigator();

const TodosNavigator = () => (
    <TodosProvider>
        <Todos.Navigator initialRouteName="TodosList" screenOptions={{ headerShown: false }}>
            <Todos.Screen
                name="TodosList"
                component={TodosList}
            />
            <Todos.Screen
                name="CreateTodo"
                component={CreateTodo}
            />
        </Todos.Navigator>
    </TodosProvider>
);

export default TodosNavigator;
