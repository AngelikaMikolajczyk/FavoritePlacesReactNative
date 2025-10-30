import { StyleSheet, View, Alert, Text } from "react-native";
import { OutlinedButton } from "../ui/OutlinedButton";
import { Colors } from "../../constans/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import MapView, { Marker } from "react-native-maps";
import { useEffect } from "react";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { getAddress } from "../../util/getAddress";

function formatterAddress(address) {
    return  `${address.name}, ${address.postalCode} ${address.city}, ${address.country}`;
}

export function LocationPicker({onPickLocation, pickedLocation}) {
    const [locationPermissionInfo, requestPermission] = useForegroundPermissions();
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        async function handleLocation() {
            if(isFocused && route.params) {
                const mapSelectedLocation = route.params.selectedLocation;
                const address = await getAddress(mapSelectedLocation);
                const formatted = formatterAddress(address[0]);
                onPickLocation(mapSelectedLocation, formatted);
            }
        }
        handleLocation();
    }, [route, isFocused])

    useEffect(() => {
        async function handleLocation() {
            if(pickedLocation) {
                const address = await getAddress(pickedLocation);
                const formatted = formatterAddress(address[0]);
                onPickLocation(pickedLocation, formatted);     
            }
        }
        handleLocation();
       
    }, [pickedLocation, onPickLocation])

    async function verifyPermission() {
        if(locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if(locationPermissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert('No permission. Need grand location permission to use this app.');
            return false;
        }

        return true; 
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermission();
        if(!hasPermission) {
            return;
        }

        try {
            const location = await getCurrentPositionAsync();
            onPickLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude,  
            })
            
        } catch(error) {
             Alert.alert(
                "Could not fetch location!",
                "Please try again later or pick a location on the map."
            );
        }
    }

    function pickOnMapHandler() {
        navigation.navigate('Map');
    }

    return <View>
        <View style={styles.mapPreview}>
            {pickedLocation ? (
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: pickedLocation.lat,
                    longitude: pickedLocation.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: pickedLocation.lat,
                        longitude: pickedLocation.lng,
                    }}
                />
            </MapView>
            ) : (
            <Text>No location chosen yet!</Text>
            )}
        </View>
        <View style={styles.actions}>
            <OutlinedButton icon='location' onPress={getLocationHandler}>Locate User</OutlinedButton>
            <OutlinedButton icon='map' onPress={pickOnMapHandler}>Pick On Map</OutlinedButton>
        </View>
    </View>
}

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    map: {
        width: "100%",
        height: "100%",
        borderRadius: 4
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});