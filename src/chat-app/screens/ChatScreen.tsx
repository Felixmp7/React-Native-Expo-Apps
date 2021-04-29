import React, { useEffect, useState, useCallback } from 'react';
import { View, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import tw from 'tailwind-rn';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, db } from '../services/firebase';
import defaultImage from 'constants/ProfileImages';

const AvatarImage = (): JSX.Element => (
    <View style={tw('pl-3')}>
        <Avatar
            rounded
            source={{ uri: auth?.currentUser?.photoURL || defaultImage }}
        />
    </View>
);
const SignOutButton = (navigation: any): JSX.Element => {
    const signOut = auth.signOut().then(() => navigation.replace('LoginScreen'))
        .catch((error: any) => console.log(error.message));
    return (
        <Pressable onPress={signOut} style={tw('pr-3')}>
            <FontAwesome name="sign-out" size={24} color="black" />
        </Pressable>
    );
};

const ChatScreen = ({ navigation }: any): JSX.Element => {
    const [messages, setMessages] = useState<Array<any>>([]);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: AvatarImage,
            headerRight: SignOutButton(navigation)
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

    const onSend = useCallback((messagesList: Array<any> = []) => {
        const newMessage = { ...messagesList[0] };
        db.collection('chats').add(newMessage);
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
