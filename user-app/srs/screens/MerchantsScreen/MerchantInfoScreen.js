//import liraries
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, FlatList } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';
import dummyData from '../../../assets/constants/dummyData';
import MerchantInfo from '../../components/MerchantInfo';
import MenuItem from '../../components/MenuItem';
import Category from '../../components/Category';


const HEADER_HEIGHT = 370;

// create a component
const MerchantInfoScreen = () => {
    const merchant = dummyData.Merchants[0];
    const dishes = dummyData.Dishes;
    const categories = dummyData.Categories;

    const scrollY = useRef(new Animated.Value(0)).current;

    function renderMerchantCardHeader() {
        return (
            <View
                style={{
                    alignItems: "center",
                    overflow: 'hidden',
                    height: HEADER_HEIGHT + 1109,
                    marginTop: -1000,
                    paddingTop: 1000,
                    backgroundColor: COLORS.background
                }}
            >
                <Animated.Image
                    source={{ uri: merchant?.image }}
                    resizeMode="contain"
                    style={{
                        height: HEADER_HEIGHT,
                        width: "200%",
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                                    outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                                })
                            },
                            {
                                scale: scrollY.interpolate({
                                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                                    outputRange: [2, 1, 1]
                                })
                            }
                        ]
                    }}
                />
                <Animated.View style={{
                    position: "absolute",
                    bottom: 15,
                    left: 30,
                    right: 30,
                    height: 200,
                    transform: [
                        {
                            translateY: scrollY.interpolate({
                                inputRange: [0, 170, 250],
                                outputRange: [0, 0, 100],
                                extrapolate: 'clamp'
                            })
                        }
                    ]
                }}>
                    <MerchantInfo merchant={merchant} />
                </Animated.View>
            </View>
        )
    }


    function renderHearderBar() {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 0,
                    right: 0,
                    height: 90,
                    flexDirection: 'row',
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingBottom: 10
                }}>
                {/* Screen Overlay */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: -20,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: COLORS.secondary,
                        opacity: scrollY.interpolate({
                            inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 80],
                            outputRange: [0, 1],
                        })
                    }}
                />

                {/* Header Bar Title */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        alignItems: "center",
                        justifyContent: "flex-end",
                        paddingBottom: 20,
                        opacity: scrollY.interpolate({
                            inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                            outputRange: [0, 1],
                        }),
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                                    outputRange: [0, 1],
                                    extrapolate: "clamp"
                                })
                            }
                        ]
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>{merchant.name}</Text>
                </Animated.View>
            </View>
        )
    }

    function RenderMenuHeader() {
        return (
            <>
                <View
                    style={{
                        flexDirection: "row",
                        paddingHorizontal: 30,
                        paddingBottom: 10,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.lightGray
                    }}>

                    <Text style={{ flex: 1, fontSize: 26 }}>Menu</Text>
                    <Text style={{ color: COLORS.dark, fontSize: 16, marginTop: 5 }}>
                        {dishes?.length} items
                    </Text>

                </View>
            </>
        )
    }

    return (
        <View style={styles.container}>
            <Animated.FlatList
                data={dishes}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* Header */}
                        {renderMerchantCardHeader()}
                        {/* Menu Header */}
                        {RenderMenuHeader()}
                    </View>
                }
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { y: scrollY } } }
                ], { useNativeDriver: true })}
                renderItem={({ item }) => (
                    <MenuItem item={item} />
                )}
            >
            </Animated.FlatList>
            {renderHearderBar()}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    itemImage: {
        height: "45%",
        width: "100%",
        position: "absolute",
    },

    itemInfo: {
        position: "absolute",
        bottom: 10,
        left: 30,
        right: 30,
        height: 100,
    },
});

//make this component available to the app
export default MerchantInfoScreen;
