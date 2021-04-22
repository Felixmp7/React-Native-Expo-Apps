import * as React from 'react';
import {
    Text, View, TextInput, TouchableOpacity,
} from 'react-native';
import uuid from 'react-native-uuid';
import tw from 'tailwind-rn';
import useTodos from '../../hooks/useTodos';

const CreateTodo = ({ navigation }: any): JSX.Element => {
    const { dispatch } = useTodos();
    const [task, setTask] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleCreateTodo = (): void => {
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
                    placeholder="description"
                    keyboardType="default"
                />
            </View>
            <View style={tw('justify-center items-center my-6')}>
                <TouchableOpacity
                    style={tw('border-2 border-green-600 rounded p-2 justify-center items-center')}
                    onPress={handleCreateTodo}
                >
                    <Text style={tw('text-green-600 font-semibold')}>Create Todo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CreateTodo;
