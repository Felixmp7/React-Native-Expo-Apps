import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import tw from 'tailwind-rn';

const ChatRoomHeader = ({ imageURL, name, email }: any) => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const goBack = () => navigation.goBack();

    return (
        <View style={tw('flex-row h-16 items-center border-b border-gray-400')}>
            <Pressable onPress={goBack} style={tw('mx-3 px-2 h-full justify-center')}>
                <Ionicons name="arrow-back-outline" size={24} style={tw('text-gray-400')} />
            </Pressable>
            <View style={tw('flex-row items-center')}>
                <Avatar
                    rounded
                    size={42}
                    source={{ uri: imageURL }}
                />
                <View style={tw('ml-2 w-48')}>
                    <Text numberOfLines={1} style={tw('text-lg')}>{name}</Text>
                    <Text numberOfLines={1} style={tw('text-xs text-gray-500')}>{email}</Text>
                </View>
            </View>
        </View>
    );
};

export default ChatRoomHeader;
