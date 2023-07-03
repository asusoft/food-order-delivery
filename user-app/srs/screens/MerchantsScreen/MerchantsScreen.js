//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image, ScrollView } from 'react-native';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import MerchantCard from '../../components/MerchantCard';
import dummyData from '../../../assets/constants/dummyData'
import { COLORS, SIZES } from '../../../assets/constants/theme';
import { SafeAreaView } from 'react-native';
import Category from '../../components/Category';
import icons from '../../../assets/constants/icons';
import MerchantsSkeleton from '../../skeletons/MerchantsScreenSkeleton';


// create a component
const MerchantsScreen = () => {
    const Merchants = dummyData.Merchants;
    const categories = dummyData.Categories;

    const [loading, setLoading] = useState(true)

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        // Cleanup the timer when the component unmounts or the dependency changes
        return () => clearTimeout(timer);
    })

    if (loading) {
        return (
            <MerchantsSkeleton />
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <>
                            <Header />
                            <SearchBar />
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: 15, marginBottom: 5, flexDirection: "row" }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={styles.filter}>
                                        <Image source={icons.filter} style={{ width: 25, height: 25, tintColor: COLORS.black }} />
                                    </View>
                                    <Text style={{ fontSize: 12 }}>Filters</Text>
                                </View>

                                <FlatList
                                    data={categories}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => {
                                        return (
                                            <Category category={item} />
                                        );
                                    }}
                                />
                            </ScrollView>
                            <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                                <FlatList data={Merchants}
                                    renderItem={({ item }) => <MerchantCard merchant={item} />}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                        </>
                    )}
                />
            </SafeAreaView>
        );
    }
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    filter: {
        backgroundColor: COLORS.secondary,
        margin: 8,
        width: 55,
        height: 55,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: "center",
        padding: 15
    },
});

//make this component available to the app
export default MerchantsScreen;
