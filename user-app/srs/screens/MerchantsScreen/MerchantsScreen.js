//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import MerchantCard from '../../components/MerchantCard';
import dummyData from '../../../assets/constants/dummyData'
import { COLORS } from '../../../assets/constants/theme';
import { SafeAreaView } from 'react-native';
import { useAuthContext } from '../../contexts/AuthContext'


// create a component
const MerchantsScreen = () => {
    const { dbUser } = useAuthContext();
    const firstName = dbUser?.name.split(" ")[0];
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <>
                        <Header />
                        <View style={styles.greetings}>
                            <Text style={styles.greetingHeader}>
                                Hello, {firstName}
                            </Text>
                            <Text style={styles.greetingSubheader}>Explore our merchants</Text>
                        </View>
                        <SearchBar />
                    </>
                )}
            />
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    greetings: {
        margin: 5,
        marginLeft: 20,
        marginTop: 10,
        padding: 5
    },
    greetingHeader: {
        fontWeight: "700",
        fontSize: 25
    },
    greetingSubheader: {
        color: "gray",
        fontWeight: "500",
        fontSize: 15,
        marginTop: 10
    }
});

//make this component available to the app
export default MerchantsScreen;
