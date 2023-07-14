//import liraries
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, FlatList, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../../assets/constants/theme';
import dummyData from '../../../assets/constants/dummyData';
import MerchantInfo from '../../components/MerchantInfo';
import DishCard from '../../components/DishCard';
import TopButtons from '../../components/TopButtons';
import { useNavigation } from '@react-navigation/native';
import icons from '../../../assets/constants/icons';
import images from '../../../assets/constants/images';


const HEADER_HEIGHT = 310;

// create a component
const MerchantInfoScreen = () => {
    const navigation = useNavigation();
    const merchant = dummyData.Merchants[3];
    const dishes = dummyData.Dishes;

    const [modalVisible, setModalVisible] = useState(false);

    const scrollY = useRef(new Animated.Value(0)).current;

    const goBack = () => {
        navigation.goBack();
    }

    function renderMerchantCardHeader() {
        return (
            <View
                style={{
                    alignItems: "center",
                    overflow: 'hidden',
                    height: HEADER_HEIGHT + 1055,
                    marginTop: -1000,
                    paddingTop: 1000,
                    backgroundColor: COLORS.grey
                }}
            >
                <Animated.Image
                    source={{ uri: merchant.image ? merchant.image : images.restaurant }}
                    resizeMode="contain"
                    style={{
                        opacity: 0.8,
                        height: HEADER_HEIGHT + 55,
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
                    backgroundColor: COLORS.transparent,
                    bottom: 0,
                    width: "100%",
                    height: HEADER_HEIGHT + 55,
                    padding: 20,
                    opacity: scrollY.interpolate({
                        inputRange: [0, 310, 310],
                        outputRange: [1, 0, -1],
                    }),
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
                }} />
                <Animated.View style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: '50%',
                    padding: 20,
                    opacity: scrollY.interpolate({
                        inputRange: [0, 300, 300],
                        outputRange: [1, 0, -1],
                    }),
                    transform: [
                        {
                            translateY: scrollY.interpolate({
                                inputRange: [0, 320, 320],
                                outputRange: [0, 0, 100],
                                extrapolate: 'clamp'
                            })
                        }
                    ]
                }}>
                    <Text style={{ fontSize: 22, fontWeight: '700', color: COLORS.white }}>{merchant.name}</Text>
                    <View style={{ flexDirection: 'row', flex: 1, marginTop: 15 }}>
                        <View style={{ height: '100%', width: '25%', backgroundColor: COLORS.transparentBlack, marginEnd: 10, borderRadius: SIZES.radius, alignItems: 'center', justifyContent: 'space-around', padding: 10 }}>
                            <Image
                                source={icons.time}
                                style={{ height: 35, width: 35, tintColor: COLORS.primary }}
                            />
                            <Text style={{ marginStart: 10, fontSize: 14, color: COLORS.white }}>Open till: 00:00</Text>
                        </View>
                        <View style={{ height: '100%', width: '35%' }}>
                            <View style={{ height: '45%', width: '100%', backgroundColor: COLORS.transparentBlack, marginBottom: 10, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 10 }}>
                                <Image
                                    source={icons.delivery}
                                    style={{ height: 30, width: 30, tintColor: COLORS.primary }}
                                />
                                <View>
                                    <Text style={{ fontSize: 16, color: COLORS.white }}>{merchant.minDeliveryTime}-{merchant.maxDeliveryTime}</Text>
                                    <Text style={{ fontSize: 14, opacity: 0.5, color: COLORS.white }}>min</Text>
                                </View>
                            </View>
                            <View style={{ height: '45%', width: '100%', flexDirection: 'row' }}>
                                <View style={{ height: '100%', width: '55%', backgroundColor: COLORS.transparentBlack, marginEnd: 8, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 10 }}>
                                    <Image
                                        source={icons.star}
                                        style={{ height: 25, width: 25, }}
                                    />
                                    <Text style={{ marginStart: 10, fontSize: 18, color: COLORS.white }}>{merchant.rating}</Text>
                                </View>
                                <TouchableOpacity onPress={() => setModalVisible(true)} style={{ height: '100%', flex: 1, backgroundColor: COLORS.transparentBlack, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        source={icons.info}
                                        style={{ height: 25, width: 25, tintColor: COLORS.white }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
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
                            inputRange: [HEADER_HEIGHT - 80, HEADER_HEIGHT - 50],
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
                            inputRange: [HEADER_HEIGHT - 60, HEADER_HEIGHT - 40],
                            outputRange: [0, 1],
                        }),
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [HEADER_HEIGHT - 60, HEADER_HEIGHT - 50],
                                    outputRange: [0, 1],
                                    extrapolate: "clamp"
                                })
                            }
                        ]
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>{merchant.name}</Text>
                </Animated.View>

                <TopButtons back={goBack} item={merchant} />
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

    const RenderMenuItems = () => {
        return (
            <View style={{
                alignItems: 'center'
            }}>
                <FlatList
                    data={dishes}
                    scrollEventThrottle={32}
                    pagingEnabled
                    numColumns={2}
                    snapToAlignment={'center'}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <>
                                <DishCard dish={item} />
                            </>
                        )
                    }}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Animated.FlatList
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { y: scrollY } } }
                ], { useNativeDriver: true })}
                ListHeaderComponent={
                    <View style={{ opacity: modalVisible ? 0.5 : 1 }}>
                        {/* Header */}
                        {renderMerchantCardHeader()}
                        {RenderMenuHeader()}
                        <RenderMenuItems />
                    </View>
                }
            />
            {renderHearderBar()}
            <MerchantInfo setModalVisible={setModalVisible} merchant={merchant} modalVisible={modalVisible} />
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
