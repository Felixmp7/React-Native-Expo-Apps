import React, { useState } from 'react';
import {
    Text, View, Pressable, Alert,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import tw from 'tailwind-rn';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useTodos from '../hooks/useTodos';

const Todo = ({
    id, task, description, done,
}: Todos): JSX.Element => {
    const { dispatch } = useTodos();
    const navigation = useNavigation();
    const [isOpen, setIsOpen] = useState(false);
    const statusColor: string = done ? 'bg-green-500' : 'bg-red-500';
    const borderColor: string = done ? 'border-green-500' : 'border-red-500';

    const handleEditTask = () => Alert.alert(
        'Edit task',
        '¿Do you want to edit this task?',
        [
            {
                text: 'Yes',
                onPress: () => navigation.navigate('Todo', {
                    id, task, description, done,
                }),
            },
            {
                text: 'No',
                onPress: () => Alert.alert('Info', 'If do you want to delete any task, swipe to right any task'),
            },
        ],
        { cancelable: true },
    );

    const handleUpdateTodo = (): void => {
        const data = {
            type: 'TOGGLE_DONE_TODO',
            payload: {
                id, task, description, done,
            },
        };
        dispatch(data);
    };

    const DeleteTodo = (): JSX.Element => {
        const handleDelete = (): void => {
            const data = {
                type: 'REMOVE_TODO',
                payload: {
                    id, task, description, done,
                },
            };
            dispatch(data);
        };

        return (
            <Pressable onPress={handleDelete} style={tw('ml-6 rounded justify-center items-center px-3')}>
                <FontAwesome5 name="trash" size={20} style={tw('text-red-500')} />
            </Pressable>
        );
    };

    return (
        <View style={tw(`w-full my-2 rounded p-3 border-2 ${borderColor}`)}>
            <Swipeable renderRightActions={DeleteTodo}>
                <Pressable
                    onPress={() => setIsOpen(!isOpen)}
                    onLongPress={handleEditTask}
                >
                    <View style={tw('w-full flex-row justify-between items-center')}>
                        <Text numberOfLines={2} style={[tw('mr-3'), { flex: 1 }]}>
                            <Text style={tw('font-bold')}>task:</Text>
                            {` ${task}`}
                        </Text>
                        <Pressable onPress={handleUpdateTodo} style={tw(`px-2 py-1 rounded ${statusColor}`)}>
                            <Text style={tw('text-white')}>
                                {done ? 'done' : 'todo'}
                            </Text>
                        </Pressable>
                    </View>
                    {isOpen && (
                        <Text style={tw('mt-4 py-2')}>
                            <Text style={tw('font-bold')}>description:</Text>
                            {` ${description}`}
                        </Text>
                    )}
                </Pressable>
            </Swipeable>
        </View>
    );
};

export default Todo;
