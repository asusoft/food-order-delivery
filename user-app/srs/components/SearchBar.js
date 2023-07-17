import { StyleSheet, Text, Image, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { COLORS, SIZES } from '../../assets/constants/theme';
import icons from '../../assets/constants/icons';

const SearchBar = () => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.SearchBar}>
            <Ionicons name="md-search" size={24} color="black" />
            <TextInput style={styles.TextInput}
                placeholder="Restaurants, Foods..."
                autoCapitalize="none"
                caretHidden={true}
                autoFocus={false}
            />
        </View>
    );
};

export default SearchBar;


const styles = StyleSheet.create({
    SearchBar: {
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 15,
        backgroundColor: COLORS.secondary,
    },

    TextInput: {
        marginLeft: 20,
    },
});
