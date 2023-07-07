//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ScrollView, Pressable } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';
import Header from '../../components/Header';
import Offer from '../../components/Offer';
import Story from '../../components/Story';
import StoryViewer from '../../components/StoryViewer';
import dummyData from '../../../assets/constants/dummyData'
import MerchantCard from '../../components/MerchantCard';
import DishCard from '../../components/DishCard';
import HomeSkeleton from '../../skeletons/HomeSkeleton';
import { useNavigation } from '@react-navigation/native';

// create a component
const HomeScreen = () => {
    const navigation = useNavigation();
    const Offers = dummyData.Offers;
    const Storie = dummyData.Stories;
    const Merchants = dummyData.Merchants;
    const Dishes = dummyData.Dishes;

    const [modalVisible, setModalVisible] = useState(false);
    const [story, setStory] = useState([]);

    const [loading, setLoading] = useState(true)

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        // Cleanup the timer when the component unmounts or the dependency changes
        return () => clearTimeout(timer);
    })

    if (loading) {
        return (
            <HomeSkeleton />
        )
    } else {


        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <>

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
                                            <Story item={item} setStory={setStory} setModalVisible={setModalVisible} />
                                        )
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: 10, marginHorizontal: 25 }}>
                                <Text style={{ fontSize: 17, fontWeight: '700', marginBottom: 10 }}>Specials for you</Text>
                                <FlatList
                                    data={Dishes}
                                    horizontal
                                    scrollEventThrottle={32}
                                    pagingEnabled
                                    snapToAlignment={'center'}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => {
                                        return (
                                            <DishCard dish={item} />
                                        )
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 17, fontWeight: '700', marginBottom: 10 }}>Popular merchants near you</Text>
                                    <Pressable onPress={() => navigation.navigate("Merchants")}>
                                        <Text style={{ fontSize: 17, fontWeight: '500', marginBottom: 10 }}>See all</Text>
                                    </Pressable>
                                </View>
                                <FlatList data={Merchants}
                                    renderItem={({ item }) => <MerchantCard merchant={item} />}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                            <StoryViewer setModalVisible={setModalVisible} story={story} modalVisible={modalVisible} />

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
});

//make this component available to the app
export default HomeScreen;
