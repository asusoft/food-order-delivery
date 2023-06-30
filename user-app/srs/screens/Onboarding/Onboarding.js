//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, FlatList, Dimensions, Image } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import dummyData from '../../../assets/constants/dummyData'

// create a component
const Onboarding = () => {
    const { width, height } = Dimensions.get('screen');
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const Onboarders = dummyData.OnboardingData;
    const navigation = useNavigation();

    const onSignIn = () => {
        navigation.navigate("Auth", { screen: 'SignIn' })
    }
    const onSignUp = () => {
        navigation.navigate("Auth", { screen: 'SignUp' })
    }

    const RenderItem = ({ item }) => {
        return (
            <View style={{ width, alignItems: 'center', marginBottom: 20 }}>
                <View style={{ flex: 0.7, justifyContent: 'center' }}>
                    <Image source={{ uri: item.image }} style={{ width: width / 2, height: width / 2, resizeMode: 'contain' }} />
                </View>
                <View style={{ flex: 0.3, alignItems: 'center', paddingHorizontal: 40 }}>
                    <Text style={{ fontSize: 20, fontWeight: '800', textAlign: 'center', color: COLORS.white }}>{item.title}</Text>
                    <Text style={{ marginTop: 30, fontSize: 16, textAlign: 'center', marginHorizontal: 20, color: COLORS.white }}>{item.description}</Text>
                </View>
            </View>
        )
    }

    const Indicator = ({ scrollX }) => {
        return (
            <View style={{ position: 'absolute', bottom: 150, flexDirection: 'row', marginBottom: 20 }}>
                {
                    Onboarders.map((_, i) => {
                        const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
                        const scale = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.6, 1, 0.6],
                            extrapolate: 'clamp'
                        })
                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.8, 1, 0.8],
                            extrapolate: 'clamp'
                        })
                        return (
                            <Animated.View
                                key={`indicator=${i}`}
                                style={{
                                    height: 10,
                                    width: 10,
                                    borderRadius: 5,
                                    backgroundColor: COLORS.secondary,
                                    opacity,
                                    margin: 10,
                                    transform: [{
                                        scale
                                    }]
                                }}
                            />
                        )
                    })
                }
            </View>
        )

    }

    function renderFooter() {
        return (
            <View style={{ flexDirection: 'row', marginTop: 70, position: 'absolute', bottom: 80, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 }}>
                <Button
                    text="Log in"
                    color={COLORS.darkPrimary}
                    textColor={COLORS.white}
                    onPress={() => onSignIn()}
                />
                <Button
                    text="Create account"
                    color={COLORS.darkPrimary}
                    textColor={COLORS.white}
                    customStyle={{
                        marginLeft: 30,
                        paddingHorizontal: 10,
                        flex: 1
                    }}
                    onPress={() => onSignUp()}
                />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Animated.FlatList
                data={Onboarders}
                contentContainerStyle={{ paddingBottom: 100 }}
                horizontal
                scrollEventThrottle={32}
                pagingEnabled
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.key}
                renderItem={({ item }) => {
                    return (
                        <RenderItem item={item} />
                    )
                }}
            />
            <Indicator scrollX={scrollX} />
            {renderFooter()}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,

    },
});

//make this component available to the app
export default Onboarding;
