import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import tw from 'tailwind-rn';

interface ConversationProps {
    name: string;
    email: string;
    imageURL: string;
    _id: string;
    lastMessage: string;
}

const ConversationCard = ({ name, email, imageURL, _id, lastMessage }: ConversationProps): JSX.Element => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const handleOpenChat = () => {
        const userData = { name, email, imageURL, _id };
        navigation.navigate('ChatRoom', { userData });
    };

    return (
        <TouchableOpacity
            onPress={handleOpenChat}
            style={tw('flex-row p-3 justify-between items-center border-b border-gray-200')}
        >
            <View style={tw('flex-row items-center')}>
                <Avatar
                    rounded
                    size={40}
                    source={{ uri: imageURL }}
                />
                <View style={tw('ml-2')}>
                    <Text numberOfLines={1} style={tw('text-lg')}>{name}</Text>
                    <Text numberOfLines={1} style={tw('text-xs text-gray-500')}>{lastMessage}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ConversationCard;
