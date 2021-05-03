import React from 'react';
import { View, Alert, Pressable } from 'react-native';
import { Avatar } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { auth } from '../services/firebase';
import tw from 'tailwind-rn';
import defaultImage from '../../constants/ProfileImages';

const ChatListHeader = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const signOut = async () => {
        try {
            await auth.signOut();
            navigation.pop();
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <View style={tw('relative h-16 bg-indigo-900 justify-center items-center')}>
            <Pressable onPress={signOut} style={tw('absolute ml-3 left-0')}>
                <AntDesign name="leftcircleo" size={24} color="white" />
            </Pressable>
            <Avatar
                rounded
                size={42}
                source={{ uri: auth?.currentUser?.photoURL || defaultImage }}
            />
            <Pressable onPress={() => navigation.navigate('NewChatScreen')} style={tw('absolute mr-3 right-0')}>
                <Entypo name="new-message" size={24} color="white" />
            </Pressable>
        </View>
    );
};

export default ChatListHeader;
