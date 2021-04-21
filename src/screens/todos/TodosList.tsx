import {
  FlatList, View, Pressable,
} from 'react-native';
import * as React from 'react';
import tw from 'tailwind-rn';
import { AntDesign } from '@expo/vector-icons';
import useTodos from '../../hooks/useTodos';
import Todo from '../../components/Todos';

const TodosList = ({ navigation }: any): JSX.Element => {
  const { state: { todos } } = useTodos();

  return (
    <View style={tw('flex-1 p-3 bg-white justify-between')}>
      <FlatList
        style={{ maxHeight: '80%' }}
        data={todos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Todo {...item} />
        )}
      />
      <View style={tw('justify-center items-end mb-6')}>
        <Pressable
          style={tw('justify-center items-center')}
          onPress={() => navigation.navigate('CreateTodo')}
        >
          <AntDesign name="pluscircle" size={56} style={tw('text-blue-500')} />
        </Pressable>
      </View>
    </View>
  );
};

export default TodosList;
