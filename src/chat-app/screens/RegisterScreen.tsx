import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import tw from 'tailwind-rn';
import { Input, Button } from 'react-native-elements';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { auth } from '../services/firebase';
import defaultImage from 'constants/ProfileImages';

const RegisterScreen = ({ navigation }: any): JSX.Element => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageURL, setImageURL] = useState('');

    const handleRegister = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(({ user }: any) => {
                user.updateProfile({
                    displayName: name,
                    photoURL: imageURL || defaultImage,
                }).then(() => {
                    Alert.alert('Notification', `User ${name} was created successfully`, [{
                        text: 'OK',
                        onPress: () => navigation.replace('ChatRoom'),
                    }]);
                }).catch((error: { message: string | undefined; }) => {
                    Alert.alert('Notification', error.message);
                });
            })
            .catch((error: { message: string | undefined; }) => {
                Alert.alert('Notification', error.message);
            });
    };

    return (
        <View style={tw('flex-1 relative p-3 bg-white')}>
            <Input
                placeholder="Name"
                label="Name"
                leftIcon={<FontAwesome name="user-circle-o" size={24} color="black" />}
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <Input
                placeholder="Email"
                label="Email"
                leftIcon={<MaterialIcons name="email" size={24} color="black" />}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <Input
                placeholder="Password"
                label="Password"
                leftIcon={<MaterialIcons name="lock-outline" size={24} color="black" />}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <Input
                placeholder="ImageUrl"
                label="ImageUrl"
                leftIcon={<MaterialCommunityIcons name="face-profile" size={24} color="black" />}
                value={imageURL}
                onChangeText={(text) => setImageURL(text)}
            />
            <Button title="Register" onPress={handleRegister} buttonStyle={tw('w-1/2 self-center bg-pink-600')} />
        </View>
    );
};

export default RegisterScreen;
