//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../assets/constants/theme';
import dummyData from '../../assets/constants/dummyData';

// create a component
const Story = ({ item, setStory, setModalVisible }) => {
    const merchants = dummyData.Merchants;
    const merchant = merchants.find(merchant => merchant.id === item.merchantID);
    const image = { uri: item.image };

    const handleStoryPress = ({ story }) => {
        setStory(story)
        setModalVisible(true)
    }
    return (
        <View style={{ margin: 5, width: 100 }}>
            <TouchableOpacity onPress={() => {
                setStory(item);
                setModalVisible(true);
            }}
                style={styles.container}
            >
                <Image source={image} style={{ height: '100%', width: '100%', borderRadius: SIZES.radius }} />
                <View style={{
                    flex: 1,
                    height: '100%',
                    width: '100%',
                    position: 'absolute', color: COLORS.secondary, fontWeight: '700', fontSize: 12, borderRadius: SIZES.radius,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)', paddingHorizontal: 10, paddingVertical: 5
                }}>
                    <Text style={{
                        position: 'absolute', color: COLORS.secondary, fontWeight: '700', fontSize: 12, bottom: 5, marginHorizontal: 10
                    }} >{item.title}</Text>
                </View>
            </TouchableOpacity>
            <Text numberOfLines={1} style={{ marginTop: 10, fontSize: 14 }}>{merchant.name}</Text>
            <Text style={{ marginTop: 2, fontSize: 10, opacity: 0.7 }}>2 Hours ago</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: 1,
        width: 100,
        height: 120,
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.darkPrimary,
        backgroundColor: COLORS.secondary,
    },
});

//make this component available to the app
export default Story;
