import {
  FlatList, View, Pressable, Text,
} from 'react-native';
import * as React from 'react';
import tw from 'tailwind-rn';
import { AntDesign } from '@expo/vector-icons';
import useTodos from '../hooks/useTodos';
import Todo from '../components/Todos';

const TodosList = ({ navigation }: any): JSX.Element => {
  const { state: { todos } } = useTodos();

  return (
    <View style={tw('flex-1 relative p-3 bg-white')}>
      <FlatList
        data={todos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Todo {...item} />}
        ListEmptyComponent={<Text style={tw('text-3xl text-center text-gray-500')}>No tasks</Text>}
      />
      <View style={tw('absolute bottom-0 right-0 mr-3 justify-center items-end mb-6')}>
        <Pressable
          style={tw('justify-center items-center')}
          onPress={() => navigation.navigate('Todo', { isNewTodo: true })}
        >
          <AntDesign name="pluscircle" size={56} style={tw('text-blue-500')} />
        </Pressable>
      </View>
    </View>
  );
};

export default TodosList;
