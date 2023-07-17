import React, { createContext, useContext, useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { useAuthContext } from "./AuthContext";

const DishContext = createContext({});

const DishContextProvider = ({ children }) => {
    const db = firestore();
    const { dbUser } = useAuthContext();
    const dbUserID = dbUser?.id

    const [merchantID, setMerchant_ID] = useState()
    const [DATA, setData] = useState([])

    React, useEffect(() => {
        const fetchData = async () => {
            const categoriesList = [];

            const categoriesSnapshot = await db.collection("DishCategories")
                .where("merchantID", "==", merchantID)
                .get();

            for (const categoryDoc of categoriesSnapshot.docs) {
                const categoryID = categoryDoc.id;
                const category = categoryDoc.data();
                const dishList = [];

                const dishesSnapshot = await db.collection("Dishes")
                    .where("categoryID", "==", categoryID)
                    .get();

                dishesSnapshot.forEach((dishDoc) => {
                    dishList.push({
                        ...dishDoc.data(),
                        id: dishDoc.id,
                    });
                });

                categoriesList.push({ ...category, id: categoryID.toString(), data: dishList });
            }

            setData(categoriesList);
        };
        fetchData()
    }, [merchantID])

    const getDishes = async (categoryID) => {
        return new Promise((resolve, reject) => {
            db.collection("Dishes")
                .where("categoryID", "==", categoryID)
                .onSnapshot((querySnapshot) => {
                    let dishList = [];
                    querySnapshot.forEach(async (doc) => {
                        dishList.push({
                            ...doc.data(),
                            id: doc.id,
                        });
                    });
                    resolve(dishList);
                }, reject);
        });

    }

    return (
        <DishContext.Provider value={{
            setMerchant_ID,
            DATA
        }}>
            {children}
        </DishContext.Provider>
    )
}

export default DishContextProvider;

export const useDishContext = () => useContext(DishContext);