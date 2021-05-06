/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-rn';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, db } from '../services/firebase';
import { addMessage, findConversation } from '../services/chat';
import ChatRoomHeader from '../components/ChatRoomHeader';

const ChatRoom = ({ route }: any): JSX.Element => {
    const [messages, setMessages] = useState<Array<any>>([]);
    const [chatId, setChatId] = useState<any>(undefined);
    const { userData } = route.params;

    const onSend = useCallback(async (messagesList: Array<any> = []) => {
        const newMessage = { ...messagesList[0] };
        await addMessage(newMessage, chatId);
    }, [chatId]);

    const findChatId = async () => {
        const chatId = await findConversation(userData);
        setChatId(chatId);
    };

    useEffect(() => void findChatId(), []);

    useEffect(() => {
        if (chatId) {
            const unsubscribe = db.collection('chats').doc(chatId)
                .onSnapshot((doc: any) => {
                    const chatMessages = doc.data().messages.map((message: any) => ({
                        _id: message._id,
                        createdAt: message.createdAt.toDate(),
                        text: message.text,
                        user: message.user,
                    }));
                    setMessages([...chatMessages]);
                });
            return () => unsubscribe();
        }
        return;

    }, [chatId]);

    return (
        <SafeAreaView style={tw('flex-1')}>
            <ChatRoomHeader {...userData} />
            <GiftedChat
                messages={messages}
                messagesContainerStyle={{ backgroundColor: '#fff' }}
                onSend={(newMessages) => onSend(newMessages)}
                user={{
                    _id: auth?.currentUser?.uid,
                    name: auth?.currentUser?.displayName,
                    avatar: auth?.currentUser?.photoURL,
                }}
            />
        </SafeAreaView>
    );
};

export default ChatRoom;
