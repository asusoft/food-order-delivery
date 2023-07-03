import { Image, Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { COLORS } from '../../assets/constants/theme';

const Category = ({ category }) => {
    const onPress = () => {
        console.warn('Category Pressed')
    }

    return (
        <Pressable style={styles.CategoryItem}>
            <Image source={{ uri: category.image }} style={styles.ItemIcon} />
            <Text style={styles.CategoryName}>{category.name}</Text>
        </Pressable>
    );
};

export default Category;


const styles = StyleSheet.create({
    CategoryItem: {
        flexDirection: 'row',
        backgroundColor: COLORS.secondary,
        margin: 8,
        width: 130,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: "flex-start",
        padding: 15
    },

    CategoryName: {
        fontSize: 12,
        fontWeight: "500",
    },

    ItemIcon: {
        height: 40,
        width: 40,
        marginEnd: 10,
        resizeMode: "contain"

    }
});
