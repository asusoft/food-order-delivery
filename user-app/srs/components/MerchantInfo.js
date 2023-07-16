//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Image, Pressable, } from 'react-native';
import { COLORS, SIZES } from '../../assets/constants/theme';
import icons from '../../assets/constants/icons';

// create a component
const MerchantInfo = ({ merchant, modalVisible, setModalVisible }) => {
    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.container}>
                <Pressable onPress={() => setModalVisible(false)} style={{ alignSelf: 'flex-end' }}>
                    <Image source={icons.cross} style={{ height: 25, width: 25, tintColor: COLORS.black }} />
                </Pressable>
                <View style={{ padding: 10, }}>
                    <View style={{ marginBottom: 20, }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 12 }}>{merchant?.name}</Text>
                        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 3 }}>{merchant?.address}</Text>
                        <Text style={{ fontSize: 16, opacity: 0.8 }}>We're open untill {merchant?.closingTime}</Text>
                    </View>
                    <View style={{ marginBottom: 20, paddingVertical: 10, flexDirection: 'row', borderWidth: 0.5, borderColor: COLORS.white, borderTopColor: COLORS.grey, borderBottomColor: COLORS.grey }}>
                        <Text style={{ fontSize: 16 }}>Breakfast - </Text>
                        <Text style={{ fontSize: 16 }}>Suchi - </Text>
                        <Text style={{ fontSize: 16 }}>Fast food - </Text>
                        <Text style={{ fontSize: 16 }}>Nuggets - </Text>
                        <Text style={{ fontSize: 16 }}>Drinks - </Text>
                    </View>
                    <View >
                        <Text>Delivery fee: {merchant?.deliveryFee} </Text>
                    </View>
                </View>
            </View>
        </Modal>

    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        height: '40%',
        width: '100%',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: 20
    },
});

//make this component available to the app
export default MerchantInfo;
