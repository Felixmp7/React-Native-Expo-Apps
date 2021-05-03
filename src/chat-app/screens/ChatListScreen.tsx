import React, { useState, useEffect } from 'react';
import { Alert, View, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-rn';
import ConversationCard from '../components/ConversationCard';
import ChatListHeader from '../components/ChatListHeader';
import { getConversations, getUserDocument } from '../services/chat';

const ChatListScreen = (): JSX.Element => {
    const [chats, setChats] = useState<Array<any>>([]);

    const handleLoadConversations = async () => {
        try {
            const conversationsList = await getConversations();
            console.log(conversationsList);
            if (conversationsList?.length >= 0) {
                const conversations: Array<any> = await Promise.all(conversationsList.map(async (conversation: any) => {
                    return await getUserDocument(conversation.participants[0]);
                }));
                setChats([...conversations]);
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    useEffect(() => void handleLoadConversations(), []);

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
