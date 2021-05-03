import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import tw from 'tailwind-rn';
import defaultImage from '../../constants/ProfileImages';

interface UserProps {
    name: string;
    email: string;
    imageURL: string;
    _id: string;
}

const UserCard = ({ name, email, imageURL, _id }: UserProps): JSX.Element => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const handleCreateNewChat = () => {
        const userData = { name, email, imageURL, _id };
        navigation.navigate('ChatRoom', { userData });
    };
    return (
        <TouchableOpacity
            onPress={handleCreateNewChat}
            style={tw('flex-row p-3 justify-between items-center border border-red-500')}
        >
            <View style={tw('flex-row items-center')}>
                <Avatar
                    rounded
                    size={40}
                    source={{ uri: imageURL || defaultImage }}
                />
                <View style={tw('ml-2 w-3/4')}>
                    <Text numberOfLines={1} style={tw('text-lg')}>{name}</Text>
                    <Text numberOfLines={1} style={tw('text-xs text-gray-500')}>{email}</Text>
                </View>
            </View>
            <View style={tw('w-full p-3')}>
                <FontAwesome5 name="arrow-right" size={20} color="black" />
            </View>
        </TouchableOpacity>
    );
};

export default UserCard;
