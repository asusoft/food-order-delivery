import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../assets/constants/theme';
import icons from '../../assets/constants/icons';


const MerchantCard = ({ merchant }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const routeName = route.name;

    const onPress = () => {

    }

    return (
        <Pressable onPress={onPress} style={styles.MerchantItem}>
            <View style={styles.MerchantItemImageHolder}>
                <Image
                    style={styles.MerchantImage}
                    source={{
                        uri: merchant.image,
                    }}
                />
                <Image source={merchant?.isFavorite ? icons.heartFilled : icons.heart} style={styles.Like} />
            </View>
            <View style={styles.ItemInfo}>
                <Text style={styles.ItemName}>{merchant.name}</Text>
                <Text style={styles.ItemDescription}>{merchant.address}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image style={styles.InfoIcon} source={icons.star} />
                    <Text style={styles.InfoText}>{merchant.rating.toFixed(1)}</Text>
                    <Image style={styles.InfoIcon} source={icons.delivery} />
                    <Text style={styles.InfoText}>₽{merchant.deliveryFee}</Text>
                    <Image style={styles.InfoIcon} source={icons.time} />
                    <Text style={styles.InfoText}>{merchant.minDeliveryTime.toFixed(0)} - {merchant.maxDeliveryTime.toFixed(0)} mins</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default MerchantCard;


const styles = StyleSheet.create({
    MerchantItem: {
        height: 250,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: COLORS.secondary,
    },

    MerchantItemImageHolder: {
        height: "65%",
        width: "100%",
        borderTopEndRadius: 25
    },

    MerchantImage: {
        flex: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    ItemInfo: {
        margin: 10,
        marginRight: 15,
        justifyContent: "space-between",
    },

    ItemName: {
        fontSize: 17,
        marginBottom: 5,
        fontWeight: "600"
    },

    ItemDescription: {
        fontSize: 12,
        marginBottom: 5,
        fontWeight: "400",
        color: COLORS.grey
    },
    Like: {
        position: "absolute",
        top: 8,
        right: 8,
        padding: 15,
        height: 35,
        width: 35,
        tintColor: COLORS.red
    },
    InfoText: {
        fontSize: 14,
        marginLeft: 8,
        marginRight: 35,
        marginTop: 3
    },
    InfoIcon: {
        height: 25,
        width: 25,
        tintColor: COLORS.oldPrimary
    }
});
