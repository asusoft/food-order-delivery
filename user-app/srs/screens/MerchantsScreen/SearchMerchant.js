//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Image, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../assets/constants/theme';
import icons from '../../../assets/constants/icons';
import images from '../../../assets/constants/images';

import { useMerchantContext } from '../../contexts/MerchantContext';
import FormInput from '../../components/FormInput';
import { useNavigation } from '@react-navigation/native';

// create a component
const SearchMerchant = ({ modalVisible, setModalVisible }) => {
    const navigation = useNavigation();
    const { getMerchants, getMerchantByName } = useMerchantContext();

    const [name, setName] = useState("")
    const [suggestion, setSuggestion] = useState(null);
    const [merchant, setMerchant] = useState(null)

    React.useEffect(() => {
        async function fetchData() {
            try {
                const result = await getMerchants();
                setSuggestion(result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    React.useEffect(() => {
        async function fetchData() {
            setMerchant(null)
            const searchName = name.trim(); // Remove leading and trailing whitespace

            if (searchName === "") {
                setMerchant(null);
            } else {
                const result = await getMerchantByName(searchName);
                setMerchant(result || null);
            }
        }
        fetchData();
    }, [name]);


    const handlePress = (id) => {
        setModalVisible(false)
        navigation.navigate("MerchantInfo", { merchant_ID: id })

    }

    const RenderList = ({ label, list }) => {
        return (
            <View style={{ marginTop: 20 }}>

                <Text style={{ fontSize: 20, fontWeight: '700' }}>{label}</Text>
                <FlatList
                    data={list}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => handlePress(item.id)}
                            style={{ height: 60, marginTop: 30, flexDirection: 'row', alignItems: 'center' }}
                        >
                            <Image source={images.restaurant} style={{ height: 60, width: 60, borderRadius: 8 }} />
                            <View style={{ marginStart: 15 }}>
                                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 5 }}>{item.name}</Text>
                                <Text>{item.minDeliveryTime}-{item.maxDeliveryTime} min</Text>
                                <Text>Open until: {item.closingTime}</Text>
                            </View>
                        </Pressable>
                    )}
                />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    flex: 1,
                    height: '100%',
                    width: '100%',
                    paddingHorizontal: 20,
                    backgroundColor: COLORS.background
                }}
            >
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.back}>
                        <Image source={icons.back} style={{ height: 25, width: 25, tintColor: COLORS.darkPrimary }} />
                    </Pressable>
                    <FormInput
                        prependComponent={<Ionicons name="md-search" size={24} color={COLORS.darkPrimary} />
                        }
                        value={name}
                        placeholder="Merchant"
                        inputContainerStyle={{
                            paddingHorizontal: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            borderRadius: 8,
                            borderWidth: 0,
                            height: 40,
                            marginTop: 0,
                            backgroundColor: COLORS.darkSecondary,
                        }}
                        inputStyle={{
                            marginStart: 10
                        }}
                        containerStyle={{
                            flex: 1,
                            height: 40,
                        }}
                        onChange={value => {
                            setName(value);
                        }}
                    />
                </View>
                {
                    name !== "" && merchant?.length > 0 ? (
                        <RenderList label="We found:" list={merchant} />
                    ) : name !== "" && (!merchant || merchant.length === 0) ? (
                        <RenderList label="Nothing found, but you might like:" list={suggestion} />
                    ) : (
                        <RenderList label="Frequently searched" list={suggestion} />
                    )
                }
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    back: {
        marginEnd: 20,
        height: 40,
        width: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.darkSecondary,
    },
    container: {
        flex: 1,
        paddingHorizontal: 25,
        backgroundColor: COLORS.background,
    },
    modal: {
        width: '100%',
        height: '100%',
    },
    SearchBar: {
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        flex: 1,
        borderRadius: 8,
        backgroundColor: COLORS.darkSecondary,
    },
    TextInput: {
        marginLeft: 20,
    },
});

//make this component available to the app
export default SearchMerchant;
