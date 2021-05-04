import React, { useState, useEffect } from 'react';
import { Alert, View, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-rn';
import ConversationCard from '../components/ConversationCard';
import ChatListHeader from '../components/ChatListHeader';
import { auth, db } from '../services/firebase';

const ChatListScreen = (): JSX.Element => {
    const [chats, setChats] = useState<Array<any>>([]);

    const currentUser = {
        _id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        imageURL: auth.currentUser.photoURL,
        email: auth.currentUser.email,
    };

    useEffect(() => {
        const unsubscribe = db.collection('chats')
            .where('participants', 'array-contains', currentUser)
            .onSnapshot((querySnapshot: any) => {
                if (querySnapshot) {
                    const conversations: Array<any> = [];
                    querySnapshot.forEach((doc: any) => {
                        const found = doc.data().participants.find((participant: any) => participant._id !== currentUser._id);
                        if (doc.data().messages.length) {
                            conversations.push({
                                ...found,
                                lastMessage: doc.data().messages[0].text
                            });
                        }
                    });
                    setChats(conversations);
                }
            },
            (error: any) => Alert.alert('Notification', error.message));
        return () => unsubscribe();
    }, []);

    return (
        <SafeAreaView style={tw('flex-1')}>
            <ChatListHeader />
            <View style={tw('flex-1 p-3')}>
                <FlatList
                    data={chats}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item }) => <ConversationCard {...item} />}
                    ListEmptyComponent={<Text style={tw('text-3xl text-center text-gray-500')}>No Chats</Text>}
                />
            </View>
        </SafeAreaView >
    );
};

export default ChatListScreen;
