import React, { useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { View, Pressable, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import tw from 'tailwind-rn';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, db } from '../services/firebase';
import defaultImage from '../../constants/ProfileImages';

const ChatScreen = ({ navigation }: any): JSX.Element => {
    const [messages, setMessages] = useState<Array<any>>([]);

    const onSend = useCallback((messagesList: Array<any> = []) => {
        const newMessage = { ...messagesList[0] };
        db.collection('chats').add(newMessage);
    }, []);

    const signOut = () => auth.signOut().then(() => navigation.replace('LoginScreen'))
        .catch((error: any) => Alert.alert(error.message));

    const UserAvatar = (
        <View style={tw('pl-3')}>
            <Avatar
                rounded
                source={{ uri: auth?.currentUser?.photoURL || defaultImage }}
            />
        </View>
    );

    const SignOutButton = (
        <Pressable onPress={signOut} style={tw('pr-3')}>
            <FontAwesome name="sign-out" size={24} color="black" />
        </Pressable>
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => UserAvatar,
            headerRight: () => SignOutButton
        });
    }, []);

    useEffect(() => {
        const chats = db.collection('chats')
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot: any) => {
                const chatMessages = snapshot.docs.map((doc: any) => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user,
                }));
                setMessages([...chatMessages]);
            });

        return chats;
    }, []);

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage
            onSend={(newMessages) => onSend(newMessages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL,
            }}
        />
    );
};

export default ChatScreen;
