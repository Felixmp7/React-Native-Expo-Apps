import React, { useState, useEffect } from 'react';
import {
    Alert, View, FlatList, Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-rn';
import ConversationCard from '../components/ConversationCard';
import ChatListHeader from '../components/ChatListHeader';
import { auth, db } from '../services/firebase';

const ChatListScreen = (): JSX.Element => {
    const [chats, setChats] = useState<Array<any>>([]);

    const { uid } = auth.currentUser;

    useEffect(() => {
        const unsubscribe = db.collection('chats')
            .where('participantIds', 'array-contains', uid)
            .onSnapshot((querySnapshot: any) => {
                const conversations: Array<any> = [];
                querySnapshot.forEach((doc: any) => {
                    const found = doc.data().participantsData.find((participant: any) => participant._id !== uid);
                    if (doc.data().messages.length) {
                        conversations.push({
                            ...found,
                            lastMessage: doc.data().messages[0].text,
                            lastMessageTimestamp: doc.data().messages[0].createdAt.toDate(),
                        });
                    }
                });
                setChats(conversations);
            },
            (error: any) => Alert.alert('Notification', error.message));
        return () => unsubscribe();
    }, [uid]);

    return (
        <SafeAreaView style={tw('flex-1')}>
            <ChatListHeader />
            <View style={tw('flex-1 p-3 bg-white')}>
                <FlatList
                    data={chats}
                    keyExtractor={(item) => String(item._id)}
                    renderItem={({ item }) => <ConversationCard {...item} />}
                    ListEmptyComponent={<Text style={tw('text-3xl text-center text-gray-500')}>No Chats</Text>}
                />
            </View>
        </SafeAreaView>
    );
};

export default ChatListScreen;
