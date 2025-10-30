import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { OutlinedButton } from "../components/ui/OutlinedButton";
import { Colors } from "../constans/colors";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

export function PlaceDetails({route, navigation}) {
    const [placeDetails, setPlaceDetails] = useState();
        const isFocused = useIsFocused();
        useEffect(() => {
            if(isFocused && route.params && route.params.placeDetails) {
                setPlaceDetails(route.params.placeDetails);
            }
        }, [isFocused, route]);

    function showOnMapHandler() {
        navigation.navigate('Map', {initialLocation: placeDetails.location});
    }

    return placeDetails && <ScrollView>
        <Image style={styles.image} source={{uri: placeDetails.imageUri}}/>
        <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
                <Text style={styles.address}>{placeDetails.address}</Text>
            </View>
            <OutlinedButton icon='map' onPress={showOnMapHandler}>View On Map</OutlinedButton>
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
})