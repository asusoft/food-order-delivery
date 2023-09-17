//import liraries
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, FlatList, Image, SectionList, TouchableOpacity, Pressable } from 'react-native';
import { COLORS, SIZES } from '../../../assets/constants/theme';
import MerchantInfo from '../../components/MerchantInfo';
import TopButtons from '../../components/TopButtons';
import icons from '../../../assets/constants/icons';
import FooterButton from '../../components/FooterButton';
import MerchantMenu from '../../components/merchantMenu';

import { useMerchantContext } from '../../contexts/MerchantContext';


const HEADER_HEIGHT = 290;

// create a component
const MerchantInfoScreen = ({ navigation, route }) => {

    const { merchant_ID } = route.params;

    const dummyImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfUoQbNCD6YgZ2ruZ7vH48CIg3zgYnWShQStmDz8g5BT-ERLuFy1Td-bs7C7wxYBF4MRw&usqp=CAU"

    const [modalVisible, setModalVisible] = useState(false);

    const { toggleFavorite, setMerchantID, merchant, favorite } = useMerchantContext();

    const [isLoading, setIsLoading] = useState(false)


    React.useEffect(() => {
        if (merchant) {
            setIsLoading(false);
        } else {
            setIsLoading(true)
        }
    }, [merchant, merchant_ID])

    React.useEffect(() => {
        async function fetchData() {
            try {
                setMerchantID(merchant_ID)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [merchant_ID])

    const goBack = () => {
        navigation.goBack();
        setMerchantID(null)
    }

    function RenderHeader() {
        return (
            <View style={{
                alignItems: "center",
                overflow: 'hidden',
                height: HEADER_HEIGHT + 1055,
                marginTop: -1000,
                paddingTop: 1000,
                backgroundColor: COLORS.grey,
                opacity: modalVisible ? 0.3 : 1
            }}>
                <Image
                    source={{ uri: merchant?.image ? merchant?.image : dummyImage }}
                    resizeMode="contain"
                    style={{
                        height: HEADER_HEIGHT + 55,
                        width: "200%",
                    }}
                />

                <View style={{
                    position: "absolute",
                    backgroundColor: COLORS.transparent,
                    bottom: 0,
                    width: "100%",
                    height: HEADER_HEIGHT + 55,
                    padding: 20,
                }} />
                {
                    isLoading ? [] : (
                        <View style={{
                            position: "absolute",
                            bottom: '15%',
                            width: "100%",
                            height: '50%',
                            padding: 20,
                        }}>
                            <Text style={{ fontSize: 22, fontWeight: '700', color: COLORS.white }}>{merchant?.name}</Text>
                            <View style={{ flexDirection: 'row', flex: 1, marginTop: 15 }}>
                                <View style={{ height: '100%', width: '25%', backgroundColor: COLORS.transparentBlack, marginEnd: 10, borderRadius: SIZES.radius, alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 6 }}>
                                    <Image
                                        source={icons.time}
                                        style={{ height: 35, width: 35, tintColor: COLORS.primary }}
                                    />
                                    <Text style={{ fontSize: 14, color: COLORS.white }}>Open untill: {merchant?.closingTime}</Text>
                                </View>
                                <View style={{ height: '100%', width: '35%' }}>
                                    <View style={{ height: '45%', width: '100%', backgroundColor: COLORS.transparentBlack, marginBottom: 10, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 10 }}>
                                        <Image
                                            source={icons.delivery}
                                            style={{ height: 30, width: 30, tintColor: COLORS.primary }}
                                        />
                                        <View>
                                            <Text style={{ fontSize: 16, color: COLORS.white }}>{merchant?.minDeliveryTime}-{merchant?.maxDeliveryTime}</Text>
                                            <Text style={{ fontSize: 14, opacity: 0.5, color: COLORS.white }}>min</Text>
                                        </View>
                                    </View>
                                    <View style={{ height: '45%', width: '100%', flexDirection: 'row' }}>
                                        <View style={{ height: '100%', width: '55%', backgroundColor: COLORS.transparentBlack, marginEnd: 8, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 10 }}>
                                            <Image
                                                source={icons.star}
                                                style={{ height: 25, width: 25, }}
                                            />
                                            <Text style={{ marginStart: 10, fontSize: 18, color: COLORS.white }}>{merchant?.rating}</Text>
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
                        </View>
                    )
                }

                <View style={{
                    position: "absolute",
                    bottom: '70%',
                    width: "100%",
                }}>
                    <TopButtons back={goBack} like={() => toggleFavorite(merchant_ID)} isFavorite={favorite} />
                </View>
            </View>
        )
    }

    function RenderFooter() {
        return (
            <FooterButton
                label="Go To Cart"
                footerStyle={{
                    position: "absolute",
                    justifyContent: "space-between",
                    padding: 20,
                    alignItems: "center",
                    bottom: 40,
                    right: 0,
                    left: 0,
                    height: 60,
                    backgroundColor: COLORS.primary,
                    borderRadius: 18
                }}
                leftComponent={
                    <Text style={{ fontSize: 18, color: COLORS.light, fontWeight: "500" }}> 10 items</Text>
                }
                rightComponent={
                    <Text style={{ fontSize: 18, color: COLORS.light, fontWeight: "500" }}> ₦ 1500</Text>
                }
            />
        );
    }

    const goToDishInfo = () => {
        navigation.navigate("DishInfo")
    }

    return (
        <View style={styles.container}>
            {/* <MerchantMenu /> */}
            {RenderHeader()}
            <View style={{
                flex: 1,
                backgroundColor: COLORS.background,
                borderTopEndRadius: SIZES.radius * 2,
                borderTopStartRadius: SIZES.radius * 2,
                marginTop: -35,
                paddingHorizontal: 20,
                opacity: modalVisible ? 0.6 : 1
            }}>
                {/* {RenderMenuHeader()} */}
                <MerchantMenu onPress={() => goToDishInfo()} merchantID={merchant_ID} />
            </View>
            {RenderFooter()}
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
