import AsyncStorage from '@react-native-async-storage/async-storage';
import { chats, users } from '../../constants';
import { auth, db } from './firebase';

interface ConversationProps {
    participants: Array<string>;
    chatId: string;
}
interface AddConversationProps {
    userId: string;
    participantId: string;
    newChatDocumentId: string;
}

export const setCurrentDocumentId = async (): Promise<void> => {
    try {
        const { uid } = auth.currentUser;
        const snapshot = await db.collection(users).where('_id', '==', uid).limit(1).get();
        const currentDocId = snapshot.docs[0].id;
        await AsyncStorage.setItem('@currentDocId', currentDocId);

        return;
    } catch (error) {
        console.log('ERROR EN setCurrentDocumentId');
        console.log(error.message);
    }
};

const getCurrentDocumentId = async () => {
    try {
        const docId = await AsyncStorage.getItem('@currentDocId');
        if (docId) return docId;

        return undefined;
    } catch (error) {
        console.log(error.message);
        console.log('ERROR EN getCurrentDocumentId');
        return error;
    }
};

export const getUsers = async () => {
    const usersCollection = db.collection(users);
    const snapshot = await usersCollection.get();

    const usersList = snapshot.docs.map((doc: any) => ({
        _id: doc.data()._id,
        email: doc.data().email,
        imageURL: doc.data().imageURL,
        name: doc.data().name,
    }));

    return usersList.filter((user: any) => user._id !== auth.currentUser.uid);
};

export const getCurrentDocument = async () => {
    try {
        const docId = await getCurrentDocumentId();
        const currentReference = db.collection(users).doc(docId);
        const currentDocument = await currentReference.get();
        return currentDocument;
    } catch (error) {
        console.log(error);
        console.log('ERROR EN getCurrentDocument');
        return error;
    }
};

export const getUserDocument = async (id: string) => {
    try {
        const snapshot = await db.collection(users).where('_id', '==', id).limit(1).get();
        return snapshot.docs[0];
    } catch (error) {
        console.log(error);
        console.log('ERROR EN getUserDocument');
        return error;
    }
};

const addConversationToUser = async ({
    userId,
    participantId,
    newChatDocumentId,
}: AddConversationProps) => {
    try {
        const targetDoc = await getUserDocument(userId);
        const userDocument = await db.collection(users).doc(targetDoc.id);

        const { conversations = [] } = targetDoc.data();
        conversations.unshift({ chatId: newChatDocumentId, participants: [participantId] });

        await userDocument.update({ conversations });
        return;
    } catch (error) {
        console.log('ERROR EN addConversationToUser');
        console.log(error);
    }
};

const createNewChat = async (participantData: any) => {
    try {
        const { uid } = auth.currentUser;
        const currentUserData = {
            _id: uid,
            name: auth.currentUser.displayName,
            imageURL: auth.currentUser.photoURL,
            email: auth.currentUser.email,
        };
        const participantId = participantData._id;

        const newChatDocument = await db.collection(chats).add({
            messages: [],
            participantIds: [uid, participantId],
            participantsData: [currentUserData, participantData],
        });

        await Promise.all([
            addConversationToUser({ userId: uid, participantId, newChatDocumentId: newChatDocument.id }),
            addConversationToUser({ userId: participantId, participantId: uid, newChatDocumentId: newChatDocument.id }),
        ]);

        return newChatDocument.id;
    } catch (error) {
        console.log('ERROR EN createNewChat');
        console.log(error);
        return error;
    }
};

const checkIsPreviousChatExist = async ({ conversations, participantId }: any) => {
    let chatIdFounded: string | undefined;

    try {
        conversations.forEach((conversation: ConversationProps) => {
            const conversationExist = conversation.participants.some((participId: string) => participId === participantId);
            if (conversationExist) {
                chatIdFounded = conversation.chatId;
            }
        });

        if (chatIdFounded) {
            return chatIdFounded;
        }
        return undefined;
    } catch (error) {
        console.log('ERROR EN checkIsPreviousChatExist');
        console.log(error);
        return error;
    }
};

export const findConversation = async (participant: any) => {
    const participantId = participant._id;

    try {
        const currentUserDoc = await getCurrentDocument();
        const hasConversations = currentUserDoc.data().conversations?.length || false;

        if (hasConversations) {
            const chatId = await checkIsPreviousChatExist({
                conversations: currentUserDoc.data().conversations,
                participantId,
            });

            if (chatId) return chatId;
        }

        return await createNewChat(participant);
    } catch (error) {
        console.log('ERROR EN findConversation');
        console.log(error);
        return error;
    }
};

export const addMessage = async (newMessage: any, chatId: string): Promise<void> => {
    try {
        const chatDocument = await db.collection(chats).doc(chatId);
        const chatData = await chatDocument.get();
        const { messages } = chatData.data();
        messages.unshift(newMessage);

        await chatDocument.update({ messages });
    } catch (error) {
        console.log('ERROR EN addMessage');
        console.log(error);
    }
};
