import React, { createContext, useContext, useEffect, useState } from "react";
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {

    const db = firestore();
    const user = auth().currentUser;
    const uid = user?.uid;

    const [authUser, setAuthUser] = useState(null);
    const [dbUser, setDbUser] = useState(null);

    const sub = uid;

    React.useEffect(() => {
        setAuthUser(user)
    }, [user])

    React.useEffect(() => {
        user ?
            db.collection("Users").where("sub", "==", uid)
                .onSnapshot((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const dbUserData = doc.data()
                        const dbUserObject = { ...dbUserData, id: doc.id };
                        setDbUser(dbUserObject)
                    });
                })
            : []

    }, [uid]);

    const signUp = async (email, password, phoneNumber) => {
        const existingUser = await searchNumber(phoneNumber)

        if (existingUser.length !== 0) {
            throw new Error("A user with the provided phone number exists!!!");
        } else {
            await signUserUp(email, password);
        }

    };

    const signUserUp = async (email, password) => {
        try {
            await auth()
                .createUserWithEmailAndPassword(email, password)
                .then(async () => {
                    await auth()
                        .signInWithEmailAndPassword(email, password)
                })
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const searchNumber = async (searchTerm) => {
        try {
            const querySnapshot = await firestore()
                .collection('Users') // Replace 'yourCollection' with the actual collection name
                .where('phoneNumber', '==', searchTerm) // Replace 'fieldName' with the field you want to search in
                .get();

            const searchResults = querySnapshot.docs.map((doc) => doc.data());
            return searchResults;
        } catch (error) {
            console.log('Error searching Firestore:', error);
        }
    };

    async function verifyPhone(phoneNumber, setConfirm) {
        const existingUser = await searchNumber(phoneNumber)

        if (existingUser.length !== 0) {
            throw new Error("A user with the provided phone number exists!!!");
        } else {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
        }
    }

    async function confirmCode(confirm, code) {
        try {
            await confirm.confirm(code);
            alert("Your Phone Number has been verified")
            await linkAccounts(confirm, code)
        } catch (error) {
            throw new Error(error);
        }
    }

    async function linkAccounts(email, password, name, phoneNumber) {
        try {
            await auth().signOut();

            const userCredentials = await auth().signInWithEmailAndPassword(email, password);
            const user = userCredentials.user;
            setAuthUser(user);

            await createDbUser(user.uid, name, phoneNumber, email);
        } catch (error) {
            throw new Error(error);
        }
    }

    const createDbUser = async (sub, name, phoneNumber, email) => {
        db.collection("Users")
            .add({
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                sub: sub,
            })
            .then((docRef) => {
                setDbUser(docRef);
            })
            .catch(error => alert(error.message))
    };

    const signIn = async (email, password) => {
        await signUserIn(email, password)
    };

    const signUserIn = async (email, password) => {
        try {
            await auth()
                .signInWithEmailAndPassword(email, password)
                .then(userCredentials => {
                    const user = userCredentials.user;
                    setAuthUser(user);
                })
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const signOut = () => {
        auth()
            .signOut()
            .then(function () {
                setAuthUser(null)
                setDbUser(null)
            })
            .catch(error => alert(error.message));
    };

    return (
        <AuthContext.Provider value={{
            authUser,
            dbUser,
            sub,
            signUp,
            signIn,
            signOut,
            setDbUser,
            setAuthUser,
            verifyPhone,
            confirmCode,
            linkAccounts
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);