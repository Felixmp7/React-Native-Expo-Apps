import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, Pressable } from 'react-native';
import { Avatar } from 'react-native-elements';
import tw from 'tailwind-rn';
import defaultImage from '../../constants/ProfileImages';

interface UserProps {
    name: string;
    email: string;
    imageURL: string;
}

const UserCard = ({ name, email, imageURL }: UserProps): JSX.Element => {
    return (
        <View style={tw('flex-row p-3 justify-between items-center border border-red-500')}>
            <View style={tw('flex-row items-center')}>
                <Avatar
                    rounded
                    size={40}
                    source={{ uri: imageURL || defaultImage }}
                />
                <View style={tw('ml-2')}>
                    <Text style={tw('text-lg')}>{name}</Text>
                    <Text style={tw('text-xs text-gray-500')}>{email}</Text>
                </View>
            </View>
            <Pressable style={tw('pr-2')}>
                <FontAwesome5 name="arrow-right" size={20} color="black" />
            </Pressable>
        </View>
    );
};

export default UserCard;
