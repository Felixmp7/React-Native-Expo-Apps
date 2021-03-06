import { ERROR, SUCCESS, users } from '../../constants';
import { auth, db } from './firebase';

type ApiResponseProps = {
    status: string;
    data: any,
    error?: any
};

interface RegisterProps {
    email: string;
    password?: string;
    imageURL: string;
    name: string;
    user?: any
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
                status: SUCCESS,
                data: null,
            };
        }
        return {
            status: ERROR,
            data: null,
            error: { message: 'Login error' },
        };
    } catch (error) {
        console.log(error);
        return {
            status: ERROR,
            data: null,
            error,
        };
    }
};

const registerUserInFirestore = async ({
    email, name, imageURL, user,
}: RegisterProps): Promise<ApiResponseProps> => {
    try {
        const response = await db.collection(users).add({
            name, email, imageURL, _id: user.uid,
        });
        if (response.id) {
            return {
                status: SUCCESS,
                data: null,
            };
        }
        return {
            status: ERROR,
            data: null,
            error: { message: 'User not registered in Firestore' },
        };
    } catch (error) {
        return {
            status: ERROR,
            data: null,
            error,
        };
    }
};
const updateProfile = async ({ name, imageURL, user }: UpdateProps): Promise<ApiResponseProps> => {
    try {
        await user.updateProfile({ displayName: name, photoURL: imageURL });
        return {
            status: SUCCESS,
            data: null,
        };
    } catch (error) {
        return {
            status: ERROR,
            data: null,
            error,
        };
    }
};

export const registerNewUser = async ({
    email,
    password,
    imageURL,
    name,
}: RegisterProps): Promise<ApiResponseProps> => {
    try {
        const response = await auth.createUserWithEmailAndPassword(email, password);
        if (response.user) {
            const updateResponse = await updateProfile({ imageURL, name, user: response.user });
            if (updateResponse.status === SUCCESS) {
                const firestoreResponse = await registerUserInFirestore({
                    email, password, imageURL, name, user: response.user,
                });
                if (firestoreResponse.status === SUCCESS) {
                    return { status: SUCCESS, data: null };
                }
                return { status: SUCCESS, data: null };
            }
            return {
                status: ERROR,
                data: null,
                error: { message: 'Error ocurred in updateProfile' },
            };
        }
        return {
            status: ERROR,
            data: null,
            error: { message: 'Register error' },
        };
    } catch (error) {
        console.log(error);
        return { status: ERROR, data: null, error };
    }
};
