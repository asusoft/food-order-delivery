//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { COLORS, SIZES } from '../../assets/constants/theme';
import { useNavigation } from '@react-navigation/native';

// create a component
const DishCard = ({ dish, onPress }) => {

    const navigation = useNavigation()

    const goToDishInfo = () => {
        navigation.navigate("DishInfo", { dish_ID: dish.id })
    }
    return (
        <Pressable onPress={() => goToDishInfo()} style={styles.container}>
            <View style={{ height: '100%', width: '40%', overflow: 'hidden' }}>
                <Image
                    source={{ uri: dish?.image ? dish?.image : [] }}
                    style={{
                        flex: 1
                    }}
                />
            </View>
            <View style={{ flex: 1, marginHorizontal: 20, }}>
                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>{dish?.name}</Text>
                <Text numberOfLines={4}>{dish?.description}</Text>
                <View style={{ opacity: 0.7, backgroundColor: COLORS.lightPrimary, marginTop: 10, borderRadius: 12, alignItems: 'center', justifyContent: 'center', padding: 8 }}>
                    <Text style={{ opacity: 1, fontSize: 16, color: COLORS.darkPrimary, fontWeight: '700' }}>From ₦ 750</Text>
                </View>
            </View>
        </Pressable>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        marginVertical: 5,
        height: 175,
        paddingVertical: 20,
        borderRadius: SIZES.radius,
        flexDirection: 'row'
    },
    Like: {
        position: "absolute",
        top: 5,
        right: 5,
        height: 20,
        width: 25,
    },
});

//make this component available to the app
export default DishCard;
