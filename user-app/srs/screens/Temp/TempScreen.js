//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';
import Loading from '../../components/Loading';

import { useAuthContext } from '../../contexts/AuthContext';

// create a component
const TempScreen = () => {
    const { signOut, dbUser } = useAuthContext();
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        dbUser ? setLoading(false) : setLoading(true)
    }, [dbUser])

    const handleSignOut = () => {
        signOut()
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => handleSignOut()}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text>Name: {dbUser?.name}</Text>
                <Text>Email: {dbUser?.email}</Text>
                <Text>Phone: {dbUser?.phoneNumber}</Text>
                <Text style={{ color: COLORS.primary, marginStart: 10, fontWeight: 'bold' }}>
                    SIGN OUT
                </Text>
            </TouchableOpacity>
            {
                loading ? <Loading /> : []
            }
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
});

//make this component available to the app
export default TempScreen;
