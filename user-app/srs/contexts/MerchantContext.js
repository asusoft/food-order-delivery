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
            const doc = await db.collection('Merchants').doc(id).get();
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

    const getMerchantByName = async (name) => {
        try {
            if (name !== "") {
                const merchantsList = await getMerchants();
                const searchTerm = name.toLowerCase();
                const matchedMerchants = merchantsList.filter((merchant) =>
                    merchant.name.toLowerCase().startsWith(searchTerm)
                );
                return matchedMerchants
            }
            return null

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <MerchantContext.Provider value={{
            getMerchants,
            getMerchantByID,
            getMerchantByName
        }}>
            {children}
        </MerchantContext.Provider>
    )
}

export default MerchantContextProvider;

export const useMerchantContext = () => useContext(MerchantContext);