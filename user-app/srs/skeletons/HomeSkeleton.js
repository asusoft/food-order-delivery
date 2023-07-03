import React from 'react';
import { View, Animated, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from '../../assets/constants/theme';

const HomeSkeleton = () => {
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
            <Animated.View style={[styles.header, { opacity }]} />
            <Animated.View style={[styles.offers, { opacity }]} />
            <Animated.View style={[styles.heading, { opacity }]} />
            <View style={{ flexDirection: 'row', marginHorizontal: 25 }}>
                <Animated.View style={[styles.story, { opacity }]} />
                <Animated.View style={[styles.story, { opacity }]} />
                <Animated.View style={[styles.story, { opacity }]} />
                <Animated.View style={[styles.story, { opacity }]} />
            </View>
            <Animated.View style={[styles.heading, { opacity }]} />
            <View style={{ flexDirection: 'row', marginHorizontal: 25 }}>
                <Animated.View style={[styles.special, { opacity }]} />
                <Animated.View style={[styles.special, { opacity }]} />
                <Animated.View style={[styles.special, { opacity }]} />
                <Animated.View style={[styles.special, { opacity }]} />
            </View>
            <Animated.View style={[styles.heading, { opacity }]} />
            <Animated.View style={[styles.merchant, { opacity }]} />


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        height: 60,
        marginHorizontal: 20,
        backgroundColor: COLORS.skeleton
    },
    offers: {
        marginLeft: 20,
        marginBottom: 5,
        width: 318,
        height: 118,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        resizeMode: 'contain',
        backgroundColor: COLORS.skeleton
    },
    heading: {
        marginTop: 10,
        marginHorizontal: 25,
        marginBottom: 10,
        height: 40,
        backgroundColor: COLORS.skeleton
    },
    story: {
        width: 100,
        marginRight: 15,
        height: 120,
        borderRadius: 10,
        borderRadius: 10,
        backgroundColor: COLORS.skeleton
    },
    special: {
        width: 125,
        height: 180,
        marginRight: 20,
        borderRadius: 10,
        borderRadius: 10,
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

export default HomeSkeleton;
