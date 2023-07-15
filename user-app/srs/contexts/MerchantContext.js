import React, { createContext, useContext, useState } from "react";
import firestore from '@react-native-firebase/firestore';

const MerchantContext = createContext({});

const MerchantContextProvider = ({ children }) => {
    const db = firestore();
    const [merchantObject, setMerchantObject] = useState({});

    const getMerchants = async () => {
        try {
            const snapshot = await db.collection('Merchants').get();
            let merchantsList = [];
            snapshot.forEach((doc) => {
                merchantsList.push({
                    ...doc.data(),
                    id: doc.id,
                });
            });
            return merchantsList;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const getMerchantByID = async (id) => {
        try {
            const doc = await firestore().collection('Merchants').doc(id).get();
            if (doc.exists) {
                return doc.data();
            } else {
                console.log('No such merchant!');
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    return (
        <MerchantContext.Provider value={{
            getMerchants,
            getMerchantByID,
        }}>
            {children}
        </MerchantContext.Provider>
    )
}

export default MerchantContextProvider;

export const useMerchantContext = () => useContext(MerchantContext);