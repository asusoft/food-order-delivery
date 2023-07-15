//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, SIZES } from '../../../assets/constants/theme';
import dummyData from '../../../assets/constants/dummyData';
import TopButtons from '../../components/TopButtons';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Rating from '../../components/Rating';

const HEADER_HEIGHT = 290;

// create a component
const DishInfoScreen = () => {
    const navigation = useNavigation();
    const dish = dummyData.Dishes[0]
    const goBack = () => {
        navigation.goBack();
    }

    function RenderHeader() {
        return (
            <View>
                <View style={{
                    marginTop: -30
                }}>
                    <TopButtons back={goBack} item={dish} />

                    <View style={{
                        alignItems: "center",
                        overflow: 'hidden',
                        height: HEADER_HEIGHT,
                        marginTop: 15,
                        marginHorizontal: 20,
                        borderRadius: SIZES.radius + 5,
                        backgroundColor: COLORS.grey
                    }}>

                        <Image
                            source={{ uri: dish.image ? dish.image : [] }}
                            resizeMode="contain"
                            style={{
                                height: HEADER_HEIGHT + 55,
                                width: "200%",
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
    function RenderInfo() {
        return (
            <View>
                <View style={{
                    marginTop: 20
                }}>
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>{dish.name}</Text>
                    <Rating rating={dish.rating} showText={true} size={16} color={COLORS.primary} containerStyle={{ marginVertical: 10 }} />
                    <Text style={{ fontSize: 18, marginVertical: 10 }}>Description</Text>
                    <Text style={{ fontSize: 14 }}>{dish.description}</Text>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>

            {RenderHeader()}
            <View style={{ marginHorizontal: 20 }}>
                {RenderInfo()}
            </View>

        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.background,
    },
});

//make this component available to the app
export default DishInfoScreen;
