//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';
import Header from '../../components/Header';
import Offer from '../../components/Offer';
import Stories from '../../components/Stories';
import dummyData from '../../../assets/constants/dummyData'

// create a component
const HomeScreen = () => {
    const Offers = dummyData.Offers;
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={{ marginLeft: 20, marginBottom: 10 }}>
                <FlatList
                    data={Offers}
                    horizontal
                    scrollEventThrottle={32}
                    pagingEnabled
                    snapToAlignment={'center'}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <Offer item={item} />
                        )
                    }}
                />
            </View>
            <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 20 }}>Top deals from our merchants</Text>
                <FlatList
                    data={Offers}
                    horizontal
                    scrollEventThrottle={32}
                    pagingEnabled
                    snapToAlignment={'center'}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <Stories item={item} />
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
});

//make this component available to the app
export default HomeScreen;
