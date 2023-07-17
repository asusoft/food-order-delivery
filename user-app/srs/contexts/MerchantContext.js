import React, { createContext, useContext, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { useAuthContext } from "./AuthContext";

const MerchantContext = createContext({});

const MerchantContextProvider = ({ children }) => {
    const db = firestore();
    const { dbUser } = useAuthContext();
    const dbUserID = dbUser?.id

    const [favorite, setFavorite] = useState(false);
    const [favoriteMerchants, setFavoriteMerchants] = useState([])
    const [merchant, setMerchant] = useState({});
    const [merchantID, setMerchantID] = useState();

    React.useEffect(() => {
        async function fetchData() {
            const result = await getMerchantByID(merchantID);
            setMerchant(result);
        }
        if (merchantID) {
            fetchData();
        } else {
            setMerchant(null);
        }
    }, [merchantID])

    React.useEffect(() => {
        async function fetchData() {
            const isFav = await isFavoriteMerchant(merchantID);
            setFavorite(isFav);
        }
        fetchData();
    }, [merchantID, favoriteMerchants])

    React.useEffect(() => {
        async function fetchData() {
            await getFavoriteMerchants()
        }
        fetchData()
    }, [dbUserID])

    const getMerchants = async () => {
        try {
            return new Promise((resolve, reject) => {
                db.collection("Merchants")
                    .onSnapshot((querySnapshot) => {
                        let merchantsList = [];
                        querySnapshot.forEach(async (doc) => {
                            merchantsList.push({
                                ...doc.data(),
                                id: doc.id,
                            });
                        });
                        resolve(merchantsList);
                    }, reject);
            });
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const getMerchantByID = async (merchant_ID) => {
        try {
            const doc = await db.collection('Merchants').doc(merchant_ID).get();
            if (doc.exists) {
                const merchantData = doc.data()
                const merchantObject = { ...merchantData, id: merchant_ID };
                return merchantObject;
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

    const getFavoriteMerchants = async () => {
        try {
            if (dbUserID) {
                return new Promise((resolve, reject) => {
                    db.collection("FavoriteMerchants")
                        .where("userID", "==", dbUserID)
                        .onSnapshot((querySnapshot) => {
                            const favoriteList = [];
                            querySnapshot.forEach((doc) => {
                                const itemID = doc.id;
                                const item = doc.data();
                                favoriteList.push({ ...item, id: itemID.toString() });
                            });
                            setFavoriteMerchants(favoriteList);
                        }, reject);
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const isFavoriteMerchant = async (merchant_ID) => {
        const result = favoriteMerchants.some((merchant) => merchant.merchantID === merchant_ID);
        return result
    }

    const toggleFavorite = async (merchant_ID) => {
        await isFavoriteMerchant(merchant_ID) ? removeFavoriteMerchant(merchant_ID) : addFavoriteMerchant(merchant_ID)
    }

    const removeFavoriteMerchant = (merchant_ID) => {
        db.collection("FavoriteMerchants")
            .doc(merchant_ID)
            .delete()
            .then(() => {
                setFavorite(false);
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    }

    const addFavoriteMerchant = (merchant_ID) => {
        db.collection("FavoriteMerchants")
            .doc(merchant_ID)
            .set({
                merchantID: merchant_ID,
                userID: dbUserID,
            })
            .then(() => {
                setFavorite(true);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    return (
        <MerchantContext.Provider value={{
            getMerchants,
            getMerchantByID,
            getMerchantByName,
            getFavoriteMerchants,
            toggleFavorite,
            setMerchantID,
            isFavoriteMerchant,
            favorite,
            merchant,
            favoriteMerchants
        }}>
            {children}
        </MerchantContext.Provider>
    )
}

export default MerchantContextProvider;

export const useMerchantContext = () => useContext(MerchantContext);