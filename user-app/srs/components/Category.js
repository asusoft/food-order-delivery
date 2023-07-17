import { Image, Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../assets/constants/theme';

const Category = ({ category }) => {
    const onPress = () => {
        console.warn('Category Pressed')
    }

    return (
        <Pressable style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{ uri: category.icon }} style={styles.category} />
            <View style={{ padding: 5, borderRadius: 5 }}>
                <Text style={{ fontSize: 12 }}>{category.name}</Text>
            </View>

        </Pressable>
    );
};

export default Category;


const styles = StyleSheet.create({
    category: {
        margin: 8,
        width: 55,
        height: 55,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: "center",
        resizeMode: 'contain'

    },
});
