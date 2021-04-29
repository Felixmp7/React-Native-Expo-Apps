import React, { useState } from 'react';
import {
    Text, View, TextInput, TouchableOpacity,
} from 'react-native';
import uuid from 'react-native-uuid';
import tw from 'tailwind-rn';
import useTodos from '../hooks/useTodos';

const TodoDetails = ({ navigation, route }: any): JSX.Element => {
    const { dispatch } = useTodos();
    const { params } = route;
    const taskTitle = params?.isNewTodo ? '' : params.task || '';
    const taskDescription = params?.isNewTodo ? '' : params.description || '';
    const textButton = params?.isNewTodo ? 'Add Todo' : 'Edit Todo' || 'Add Todo';

    const [task, setTask] = useState(taskTitle);
    const [description, setDescription] = useState(taskDescription);

    const handleTodo = (): void => {
        if (params.isNewTodo) handleAddTodo();
        else handleEditTodo();
    };

    const handleAddTodo = (): void => {
        const data = {
            type: 'ADD_TODO',
            payload: {
                id: String(uuid.v4()),
                task,
                description,
                done: false,
            },
        };
        dispatch(data);
        navigation.goBack();
    };

    const handleEditTodo = (): void => {
        const data = {
            type: 'UPDATE_TODO',
            payload: {
                id: params.id,
                task,
                description,
                done: params.done,
            },
        };
        dispatch(data);
        navigation.goBack();
    };

    return (
        <View style={tw('flex-1 p-3 justify-between')}>
            <View style={tw('border border-green-500 bg-white rounded p-3')}>
                <View style={tw('w-full flex-row justify-between items-center mb-6')}>
                    <TextInput
                        style={tw('flex-1 mr-3 pb-1 border-b border-gray-500')}
                        onChangeText={(text) => setTask(text)}
                        value={task}
                        placeholder="task"
                        keyboardType="default"
                    />
                    <View style={tw('px-2 py-1 rounded bg-gray-300')}>
                        <Text style={tw('font-medium')}>Pending</Text>
                    </View>
                </View>
                <TextInput
                    style={tw('pb-1 border-b border-gray-500')}
                    onChangeText={(text) => setDescription(text)}
                    value={description}
                    multiline
                    placeholder="description"
                    keyboardType="default"
                />
            </View>
            <View style={tw('justify-center items-center my-6')}>
                <TouchableOpacity
                    style={tw('border-2 border-green-600 rounded p-2 justify-center items-center')}
                    onPress={handleTodo}
                >
                    <Text style={tw('text-green-600 font-semibold')}>{textButton}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TodoDetails;
