import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import tw from 'tailwind-rn';
import { Input, Button } from 'react-native-elements';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { auth } from '../services/firebase';

const RegisterScreen = ({ navigation }: any): JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleRegister = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }:any) => {
        user.updateProfile({
          displayName: name,
          photoURL: imageURL || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.kindpng.com%2Fimgv%2FixRmTT_free-high-quality-person-icon-default-profile-picture%2F&psig=AOvVaw17PXCjS1QBKpa3rSWWBrBc&ust=1619379883379000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIirqqnSl_ACFQAAAAAdAAAAABAD',
        }).then(() => {
          Alert.alert('Notification', `User ${name} was created successfully`, [{
            text: 'OK',
            onPress: () => navigation.replace('Chat'),
          }]);
        }).catch((error: any) => {
          Alert.alert('Notification', error.message);
        });
      })
      .catch((error: any) => {
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
