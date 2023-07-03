import React from 'react';
import { View, Animated, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, SIZES } from '../../assets/constants/theme';

const MerchantsSkeleton = () => {
    const animatedValue = new Animated.Value(0);

    React.useEffect(() => {
        Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const opacity = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.4, 1, 0.4],
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Animated.View style={[styles.menu, { opacity }]} />
                <Animated.View style={[styles.location, { opacity }]} />
            </View>
            <Animated.View style={[styles.header, { opacity }]} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginHorizontal: 20 }}>
                <View>
                    <Animated.View style={[styles.category, { opacity }]} />
                    <Animated.View style={[styles.text, { opacity }]} />
                </View>
                <View>
                    <Animated.View style={[styles.category, { opacity }]} />
                    <Animated.View style={[styles.text, { opacity }]} />
                </View>
                <View>
                    <Animated.View style={[styles.category, { opacity }]} />
                    <Animated.View style={[styles.text, { opacity }]} />
                </View>
                <View>
                    <Animated.View style={[styles.category, { opacity }]} />
                    <Animated.View style={[styles.text, { opacity }]} />
                </View>
                <View>
                    <Animated.View style={[styles.category, { opacity }]} />
                    <Animated.View style={[styles.text, { opacity }]} />
                </View>
            </View>
            <Animated.View style={[styles.merchant, { opacity }]} />
            <Animated.View style={[styles.merchant, { opacity }]} />
            <Animated.View style={[styles.merchant, { opacity }]} />
            <Animated.View style={[styles.merchant, { opacity }]} />
            <Animated.View style={[styles.merchant, { opacity }]} />
            <Animated.View style={[styles.merchant, { opacity }]} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    menu: {
        marginTop: 5,
        marginHorizontal: 20,
        height: 35,
        width: 35,
        borderRadius: 10,
        backgroundColor: COLORS.skeleton
    },
    location: {
        marginTop: 5,
        marginLeft: "auto",
        height: 35,
        marginHorizontal: 20,
        width: '50%',
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: COLORS.skeleton
    },
    header: {
        height: 60,
        marginHorizontal: 20,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.skeleton
    },
    category: {
        margin: 8,
        width: 55,
        height: 55,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.skeleton
    },
    text: {
        width: 55,
        height: 10,
        marginRight: 20,
        borderRadius: 10,
        margin: 8,
        backgroundColor: COLORS.skeleton
    },
    merchant: {
        height: 250,
        marginVertical: 10,
        borderRadius: 10,
        marginHorizontal: 25,
        backgroundColor: COLORS.skeleton
    },

});

export default MerchantsSkeleton;
