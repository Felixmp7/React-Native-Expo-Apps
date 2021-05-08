import React from 'react';
import { View, Alert, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import tw from 'tailwind-rn';
import { auth } from '../services/firebase';

const ChatListHeader = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const signOut = async () => {
        try {
            await auth.signOut();
            await AsyncStorage.removeItem('@currentDocId');
            navigation.pop();
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <View style={tw('relative h-16 justify-center items-center border-b border-gray-400')}>
            <Pressable onPress={signOut} style={tw('absolute ml-3 left-0')}>
                <AntDesign name="leftcircleo" size={24} color="black" />
            </Pressable>
            <Avatar
                rounded
                size={42}
                source={{ uri: auth?.currentUser?.photoURL }}
            />
            <Pressable onPress={() => navigation.navigate('NewChatScreen')} style={tw('absolute mr-3 right-0')}>
                <Entypo name="new-message" size={24} color="black" />
            </Pressable>
        </View>
    );
};

export default ChatListHeader;
