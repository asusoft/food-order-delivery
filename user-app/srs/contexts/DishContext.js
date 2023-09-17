import React, { createContext, useContext, useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { useAuthContext } from "./AuthContext";

const DishContext = createContext({});

const DishContextProvider = ({ children }) => {
    const db = firestore();
    const { dbUser } = useAuthContext();
    const dbUserID = dbUser?.id
    const [dish, setDish] = useState({});
    const [dishID, setDishID] = useState()
    const [favorite, setFavorite] = useState(false);
    const [favoriteDishes, setFavoriteDishes] = useState([])

    React.useEffect(() => {
        async function fetchData() {
            const result = await getDishByID(dishID);
            setDish(result);
        }
        if (dishID) {
            fetchData();
        } else {
            setDish(null);
        }
    }, [dishID])

    React.useEffect(() => {
        async function fetchData() {
            const isFav = await isFavoriteDish(dishID);
            setFavorite(isFav);
        }
        fetchData();
    }, [dishID, favoriteDishes])

    React.useEffect(() => {
        async function fetchData() {
            await getFavoriteDishes()
        }
        fetchData()
    }, [dbUserID])

    const getDishByID = async (dishID) => {
        try {
            const doc = await db.collection('Dishes').doc(dishID).get();
            if (doc.exists) {
                const dishData = doc.data()
                const dishObject = { ...dishData, id: dishID };
                return dishObject;
            } else {
                console.log('No such merchant!');
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    };

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

    const getFavoriteDishes = async () => {
        try {
            if (dbUserID) {
                return new Promise((resolve, reject) => {
                    db.collection("FavoriteDishes")
                        .where("userID", "==", dbUserID)
                        .onSnapshot((querySnapshot) => {
                            const favoriteList = [];
                            querySnapshot.forEach((doc) => {
                                const itemID = doc.id;
                                const item = doc.data();
                                favoriteList.push({ ...item, id: itemID.toString() });
                            });
                            setFavoriteDishes(favoriteList);
                        }, reject);
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const isFavoriteDish = async (dishID) => {
        const result = favoriteDishes.some((dish) => dish.dishID === dishID);
        return result
    }

    const toggleFavorite = async (dishID) => {
        await isFavoriteDish(dishID) ? removeFavoriteDish(dishID) : addFavoriteDish(dishID)
    }

    const removeFavoriteDish = (dishID) => {
        db.collection("FavoriteDishes")
            .doc(dishID)
            .delete()
            .then(() => {
                setFavorite(false);
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    }

    const addFavoriteDish = (dishID) => {
        db.collection("FavoriteDishes")
            .doc(dishID)
            .set({
                dishID: dishID,
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
        <DishContext.Provider value={{
            setDishID,
            toggleFavorite,
            dish,
            favorite,
            favoriteDishes,
        }}>
            {children}
        </DishContext.Provider>
    )
}

export default DishContextProvider;

export const useDishContext = () => useContext(DishContext);