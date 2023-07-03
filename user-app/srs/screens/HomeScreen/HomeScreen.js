//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';
import Header from '../../components/Header';
import Offer from '../../components/Offer';
import Story from '../../components/Story';
import StoryViewer from '../../components/StoryViewer';
import dummyData from '../../../assets/constants/dummyData'
import MerchantCard from '../../components/MerchantCard';

// create a component
const HomeScreen = () => {
    const Offers = dummyData.Offers;
    const Storie = dummyData.Stories;
    const Merchants = dummyData.Merchants;

    const [modalVisible, setModalVisible] = useState(false);
    const [story, setStory] = useState([]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                    <Text style={{ fontSize: 17, fontWeight: '700', marginBottom: 10 }}>Popular merchants near you</Text>
                    <FlatList data={Merchants}
                        renderItem={({ item }) => <MerchantCard merchant={item} />}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <StoryViewer setModalVisible={setModalVisible} story={story} modalVisible={modalVisible} />
            </ScrollView>
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
