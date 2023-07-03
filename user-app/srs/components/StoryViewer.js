//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Modal, Image, TouchableOpacity, Pressable, } from 'react-native';
import images from '../../assets/constants/images';
import { COLORS } from '../../assets/constants/theme';
import Button from './Button'
import icons from '../../assets/constants/icons';
import dummyData from '../../assets/constants/dummyData';

// create a component
const StoryViewer = ({ story, modalVisible, setModalVisible }) => {

    const merchants = dummyData.Merchants;
    const merchant = merchants.find(merchant => merchant.id === story.merchantID);
    const image = { uri: story.image };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.container}>
                        <Image source={image} style={{ height: '100%', width: '100%', borderRadius: 10 }} />
                        <View style={{
                            flex: 1,
                            height: '100%',
                            width: '100%',
                            position: 'absolute', color: COLORS.secondary, fontWeight: '700', fontSize: 12, borderRadius: 10,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)', paddingHorizontal: 20,
                            paddingVertical: 60,
                            justifyContent: 'space-between'
                        }}>
                            {/* TOP */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontSize: 18, color: COLORS.white }}>{merchant?.name}</Text>
                                    <Text style={{ fontSize: 14, color: COLORS.white }}>2 hours ago</Text>
                                </View>
                                <Pressable onPress={() => setModalVisible(false)}>
                                    <Image source={icons.cross} style={{ height: 30, width: 30, tintColor: COLORS.white }} />
                                </Pressable>
                            </View>
                            {/* Middle */}
                            <View>
                                <Text style={{ fontSize: 30, color: COLORS.white }}>{story.title}</Text>
                                <Text style={{ fontSize: 15, color: COLORS.white, marginTop: 40 }}>{story.description}</Text>
                            </View>
                            {/* Bottom */}
                            <Button text="Learn More!!!" color={COLORS.white} customStyle={{ alignSelf: 'center', width: "60%" }} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
});

//make this component available to the app
export default StoryViewer;
