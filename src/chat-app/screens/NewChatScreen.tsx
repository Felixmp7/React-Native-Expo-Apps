import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import tw from 'tailwind-rn';
import { getUsers } from '../services/chat';
import UserCard from '../components/UserCard';

type UserProps = {
    _id: string;
    email: string;
    imageURL: string;
    name: string;
};

const NewChatScreen = (): JSX.Element => {
    const [users, setUsers] = useState<Array<UserProps>>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadUsers = async () => {
        const response = await getUsers();
        setUsers(response);
        setIsLoading(false);
    };

    useEffect(() => void handleLoadUsers(), []);

    if(isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={tw('flex-1 p-3')}>
            <FlatList
                data={users}
                keyExtractor={(item) => String(item._id)}
                renderItem={({ item }) => <UserCard {...item} />}
                ItemSeparatorComponent={() => <View style={tw('my-2')} />}
                ListEmptyComponent={
                    <Text style={tw('mt-5 text-3xl text-center text-gray-500')}>No Chats</Text>
                }
            />
        </View>
    );
};

export default NewChatScreen;
