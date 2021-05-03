import { auth, db } from './firebase';

interface ConversationProps {
    participants: Array<string>;
    chatId: string;
}

export const getUsers = async () => {
    const usersCollection = db.collection('users');
    const users = await usersCollection.get();

    const usersList = users.docs.map((doc: any) => {
        return {
            _id: doc.data()._id,
            email: doc.data().email,
            imageURL: doc.data().imageURL,
            name: doc.data().name,
        };
    });

    return usersList.filter((user: any) => user._id !== auth.currentUser.uid);
};

export const createNewChat = async (participantData: any) => {
    const { uid } = auth.currentUser;
    const participantId = participantData._id;

    const newChatDocument = await db.collection('chats').add({
        messages: [],
        participants: [ uid, participantId ]
    });

    const usersRef = db.collection('users');
    const currentPromise = usersRef.where('_id', '==', uid).get();
    const participantPromise = usersRef.where('_id', '==', participantId).get();

    const [currentSnapshot, participantSnapshot] = await Promise.all([ currentPromise, participantPromise ]);

    const currentUserDocument = usersRef.doc(currentSnapshot.docs[0].id);
    const participantDocument = usersRef.doc(participantSnapshot.docs[0].id);

    const currentUserData = await currentUserDocument.get();
    const { conversations } = currentUserData.data();
    conversations.unshift({ chatId: newChatDocument.id, participants: [participantId] });

    const currentUpdatePromise = currentUserDocument.update({ conversations });

    const participantUserData = await participantDocument.get();
    const { conversations: participantConversations } = participantUserData.data();
    conversations.unshift({ chatId: newChatDocument.id, participants: [participantId] });
    const participantUpdatePromise = participantDocument.update({ conversations: participantConversations });

    await Promise.all([currentUpdatePromise, participantUpdatePromise]);
    return newChatDocument.id;
};

export const getUserDocument = async (id: string) => {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('_id', '==', id).get();
    return snapshot.docs[0].data();
};

export const findConversation = async (participant: any) => {
    let found: string | undefined;
    let chatId: string | undefined;
    const { uid } = auth.currentUser;
    const participantId = participant._id;
    try {
        const currentUserDoc = await getUserDocument(uid);
        if (currentUserDoc.conversations) {
            currentUserDoc.conversations.forEach((conversation: ConversationProps) => {
                found = conversation.participants.find((participant: string) => participant === participantId);
                if (found) {
                    return ({ chatId } = conversation);
                }
            });

            if (found) return chatId;
        }

        return await createNewChat(participant);
    } catch (error) {
        console.log(error);
    }
};

export const addMessage = async (newMessage: any, chatId: string) => {
    try {
        const chatDocument = await db.collection('chats').doc(chatId);
        const chatData = await chatDocument.get();
        const { messages } = chatData.data();
        messages.unshift(newMessage);
        await chatDocument.update({ messages });
    } catch (error) {
        console.log(error);
    }
};

export const getConversations = async () => {
    const { uid } = auth.currentUser;
    try {
        const currentUserDoc = await getUserDocument(uid);
        return currentUserDoc.conversations;
    } catch (error) {
        console.log(error);
    }
};
