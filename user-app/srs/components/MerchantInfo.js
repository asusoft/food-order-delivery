//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants/theme';
import Rating from './Rating';

// create a component

const MerchantInfo = ({ merchant }) => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: "700", textAlign: 'center' }}>{merchant.name}</Text>
            <Text style={{ fontSize: 16, color: COLORS.grey, opacity: 1 }}>{merchant.address}</Text>
            <Text style={{ fontSize: 16, }}>Delivers in {merchant.minDeliveryTime.toFixed(0)} - {merchant.maxDeliveryTime.toFixed(0)} mins</Text>
            <Text style={{ fontSize: 16, }}>Open till: 22:00</Text>
            <Rating rating={merchant.rating.toFixed(1)} showText={true} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        backgroundColor: COLORS.secondary,
        borderRadius: 15,
        justifyContent: "space-between",
        alignItems: "center"
    },
});

//make this component available to the app
export default MerchantInfo;
