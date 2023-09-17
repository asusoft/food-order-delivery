//import liraries
import React, { useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SectionList from 'react-native-tabs-section-list';
import sectionListGetitemLayout from 'react-native-section-list-get-item-layout';
import firestore from '@react-native-firebase/firestore';
import DishCard from './DishCard';
import { COLORS } from '../../assets/constants/theme';

// create a component
const MerchantMenu = ({ onPress, merchantID }) => {
    const db = firestore();
    const listRef = useRef()
    const [isLoading, setIsLoading] = useState(true)

    const [DATA, setData] = useState([])

    React.useEffect(() => {
        db.collection("DishCategories")
            .where("merchantID", "==", merchantID)
            .onSnapshot((querySnapshot) => {
                const categoriesList = [];
                querySnapshot.forEach(async (doc) => {
                    const categoryID = doc.id;
                    const category = doc.data()

                    const dishSnapshot = await db.collection("Dishes")
                        .where("categoryID", "==", categoryID)
                        .get();

                    if (!dishSnapshot.empty) {
                        const dishList = dishSnapshot.docs.map((dishDoc) => ({
                            ...dishDoc.data(),
                            id: dishDoc.id,
                        }));
                        categoriesList.push({ ...category, id: categoryID.toString(), data: dishList });
                    }
                });
                setData(categoriesList)
                setIsLoading(false)
            });
    }, [merchantID])

    const onPressTitle = useCallback((index) => {
        if (!!listRef?.current) {
            listRef.current.sectionList.current.scrollToLocation({
                sectionIndex: index,
                itemIndex: 0,
                animated: true
            })
        }
    }, [DATA])

    const renderSectionTab = useCallback((props) => {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: props.isActive ? COLORS.darkSecondary : COLORS.background,
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    marginBottom: 10,
                }}
                onPress={() => onPressTitle(props.index)}
            >
                <Text
                    style={{ fontSize: 16 }}
                >{props.title}</Text>
            </TouchableOpacity>
        )
    }, [DATA])

    const renderItem = useCallback(({ item, index }) => {
        return (
            <View >
                <DishCard dish={item} onPress={onPress} />
            </View>
        )
    }, [DATA])

    const renderSectionHeader = useCallback(({ section: { title } }) => {
        return (
            <View style={{ height: 40 }}>
                <Text style={{ fontSize: 22, fontWeight: '700', marginHorizontal: 10, }}>{title}</Text>
            </View>
        )
    }, [DATA])

    const getItemLayout = sectionListGetitemLayout({
        getItemHeight: (rowData, sectionIndex, rowIndex) => 185,
        getSectionHeaderHeight: () => 40,
        getSeparatorHeight: () => 8,
        getSectionFooterHeight: () => 30
    })
    const itemSeparatorComponent = useCallback(() => {
        return (
            <View style={{ height: 8 }} />
        )
    }, [DATA])

    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                paddingTop: 30,
            }}>
                <Text>Loading...</Text>
            </View>
        )
    } else {
        return (
            <View style={{
                flex: 1,
                paddingTop: 30,
            }}>
                <SectionList
                    stickySectionHeadersEnabled={false}
                    ref={listRef}
                    showsVerticalScrollIndicator={false}
                    sections={DATA}
                    renderTab={renderSectionTab}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    renderSectionHeader={renderSectionHeader}
                    renderSectionFooter={() => <View style={{ height: 30 }} />}
                    getItemLayout={getItemLayout}
                    ItemSeparatorComponent={itemSeparatorComponent}
                />
            </View>
        )
    }
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    itemStyle: {
        height: 100,
        backgroundColor: '#F0F0F0',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: "center"
    }
});

//make this component available to the app
export default MerchantMenu;
