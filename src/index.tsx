import * as React from 'react';
import {
    Pressable, SafeAreaView, Text, View,
} from 'react-native';
import tw from 'tailwind-rn';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }: any): JSX.Element => {
    const navigateTo = (screen: string) => navigation.navigate(screen);

    return (
        <SafeAreaView style={tw('flex-1 bg-white justify-center items-center')}>
            <View style={tw('border-b-2 border-pink-600 mb-10')}>
                <Text style={tw('text-center text-2xl text-pink-600 font-semibold')}>React Native Practices</Text>
            </View>

            <View style={tw('items-center')}>
                <Pressable onPress={() => navigateTo('Todos')} style={tw('mb-3')}>
                    <View style={tw('bg-green-100 p-5 mb-2 rounded-full')}>
                        <FontAwesome5 style={tw('text-green-500')} name="tasks" size={40} />
                    </View>
                    <Text style={tw('text-lg text-center text-green-500')}>Todos</Text>
                </Pressable>
                <View style={tw('flex-row')}>
                    <Pressable onPress={() => navigateTo('Chat')} style={tw('mr-8')}>
                        <View style={tw('bg-indigo-100 p-5 rounded-full')}>
                            <Ionicons style={tw('text-indigo-400')} name="chatbubbles-sharp" size={40} />
                        </View>
                        <Text style={tw('text-lg text-center text-indigo-500')}>Chat</Text>
                    </Pressable>
                    <Pressable>
                        <View style={tw('bg-blue-100 p-5 rounded-full')}>
                            <MaterialCommunityIcons style={tw('text-blue-400')} name="weather-cloudy" size={40} />
                        </View>
                        <Text style={tw('text-lg text-center text-blue-500')}>Weather</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
