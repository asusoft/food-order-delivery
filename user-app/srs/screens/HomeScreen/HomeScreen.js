//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';
import Header from '../../components/Header';
import Offer from '../../components/Offer';
import Story from '../../components/Story';
import dummyData from '../../../assets/constants/dummyData'

// create a component
const HomeScreen = () => {
    const Offers = dummyData.Offers;
    const Storie = dummyData.Stories;
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={{ marginLeft: 20, marginBottom: 5 }}>
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
            <View style={{ marginTop: 5, marginHorizontal: 25 }}>
                <Text style={{ fontSize: 17, fontWeight: '700', marginBottom: 10 }}>Top deals from our merchants</Text>
                <FlatList
                    data={Storie}
                    horizontal
                    scrollEventThrottle={32}
                    pagingEnabled
                    snapToAlignment={'center'}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <Story item={item} />
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
