//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native';
import { COLORS, SIZES } from '../../../assets/constants/theme';
import dummyData from '../../../assets/constants/dummyData';
import TopButtons from '../../components/TopButtons';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Rating from '../../components/Rating';
import FooterButton from '../../components/FooterButton';
import QuantityButton from '../../components/QuantityButton';

import { useDishContext } from '../../contexts/DishContext';

const HEADER_HEIGHT = 250;

// create a component
const DishInfoScreen = ({ route }) => {
    const dummyImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfUoQbNCD6YgZ2ruZ7vH48CIg3zgYnWShQStmDz8g5BT-ERLuFy1Td-bs7C7wxYBF4MRw&usqp=CAU"


    const { dish_ID } = route.params;

    const { dish, setDishID, toggleFavorite, favorite } = useDishContext();

    const navigation = useNavigation();
    const sizes = dummyData.Sizes;

    const [isLoading, setIsLoading] = useState(false)


    React.useEffect(() => {
        if (dish) {
            setIsLoading(false);
        } else {
            setIsLoading(true)
        }
    }, [dish, dish_ID])

    React.useEffect(() => {
        async function fetchData() {
            try {
                setDishID(dish_ID)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [dish_ID])

    const goBack = () => {
        navigation.goBack();
    }

    function RenderHeader() {
        return (
            <View>
                <View style={{
                    marginTop: -30
                }}>
                    <TopButtons back={goBack} like={() => toggleFavorite(dish_ID)} isFavorite={favorite} />

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
                            source={{ uri: dish?.image ? dish?.image : dummyImage }}
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
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>{dish?.name}</Text>
                    <Rating rating={dish?.rating} showText={true} size={16} color={COLORS.primary} containerStyle={{ marginVertical: 10 }} />
                    <Text style={{ fontSize: 18, marginVertical: 10 }}>Description</Text>
                    <Text style={{ fontSize: 14 }}>{dish?.description}</Text>
                </View>
            </View>
        )
    }

    function RenderSizes() {
        const sizesLowercase = sizes.map(size => ({
            name: size.name.charAt(0).toUpperCase() + size.name.slice(1).toLowerCase(),
            price: size.price
        }));
        return (
            <View style={styles.sizeView}>
                <Text style={{ color: COLORS.black, fontSize: 18 }}>Sizes:</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginLeft: 20,
                    }}>
                    <FlatList
                        data={sizesLowercase}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <Pressable
                                    key={item.id}
                                    style={{
                                        marginRight: 10,
                                        height: 40,
                                        paddingHorizontal: 10,
                                        backgroundColor: COLORS.secondary,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                        padding: 5,
                                    }}
                                >
                                    <Text style={{
                                        fontSize: 16,
                                        color: COLORS.black

                                    }}
                                    >
                                        {item.name}</Text>
                                </Pressable>
                            );
                        }}
                    />
                </View>
            </View>
        )
    }

    function RenderFooter() {
        return (
            <View style={{ position: 'absolute', bottom: 0, height: 155, width: '100%', backgroundColor: COLORS.white, padding: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 18 }}>
                    <View style={{ marginStart: 10 }}>
                        <Text style={{ fontSize: 14 }}>Price</Text>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>₦ 1250</Text>
                    </View>
                    <QuantityButton quntity={10} size={40} />
                </View>
                <FooterButton label='Add to cart' footerStyle={{ height: 50, marginTop: 20 }} onPress={() => alert("Adding to cart")} />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {RenderHeader()}
            {
                dish && (
                    <>
                        <View style={{ marginHorizontal: 20 }}>
                            {RenderInfo()}
                            {RenderSizes()}
                        </View>
                        {RenderFooter()}
                    </>
                )
            }
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
    sizeView: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    }
});

//make this component available to the app
export default DishInfoScreen;
