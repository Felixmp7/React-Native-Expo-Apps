import defaultImage from '../../constants/ProfileImages';
import { auth, db } from './firebase';

interface RegisterProps {
    email: string;
    password?: string;
    imageURL: string;
    name: string;
}

interface UpdateProps {
    user: any;
    imageURL: string;
    name: string;
}

export const login = async (email: string, password: string): Promise<ApiResponseProps> => {
    try {
        const response = await auth.signInWithEmailAndPassword(email, password);
        if (response.user) {
            return {
                status: 'SUCCESS',
                data: null
            };
        }
        return {
            status: 'ERROR',
            data: null,
            error: { message: 'Login error' }
        };
    } catch (error) {
        console.log(error);
        return {
            status: 'ERROR',
            data: null,
            error
        };
    }
};

const registerUserInFirestore = async ({ email, name, imageURL }: RegisterProps): Promise<ApiResponseProps> => {
    try {
        const response = await db.collection('users').add({ name, email, imageURL });
        if(response.id) {
            return {
                status: 'SUCCESS',
                data: null
            };
        }
        return {
            status: 'ERROR',
            data: null,
            error: { message: 'User not registered in Firestore'}
        };
    } catch (error) {
        return {
            status: 'ERROR',
            data: null,
            error
        };
    }
};
const updateProfile = async ({ name, imageURL, user }: UpdateProps): Promise<ApiResponseProps> => {
    try {
        await user.updateProfile({
            displayName: name,
            photoURL: imageURL || defaultImage,
        });
        return {
            status: 'SUCCESS',
            data: null
        };
    } catch (error) {
        return {
            status: 'ERROR',
            data: null,
            error
        };
    }
};

export const registerNewUser = async ({ email, password, imageURL, name }: RegisterProps): Promise<ApiResponseProps> => {
    try {
        const response = await auth.createUserWithEmailAndPassword(email, password);
        if (response.user) {
            const updateResponse = await updateProfile({ imageURL, name, user: response.user });
            if (updateResponse.status === 'SUCCESS') {
                const firestoreResponse = await registerUserInFirestore({
                    email, password, imageURL, name
                });
                if (firestoreResponse.status === 'SUCCESS') {
                    return { status: 'SUCCESS', data: null };
                }
                return { status: 'SUCCESS', data: null };
            }
            return {
                status: 'ERROR',
                data: null,
                error: { message: 'Error ocurred in updateProfile' }
            };
        }
        return {
            status: 'ERROR',
            data: null,
            error: { message: 'Register error' }
        };
    } catch (error) {
        console.log(error);
        return { status: 'ERROR', data: null, error };
    }
};