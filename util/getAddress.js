import { reverseGeocodeAsync } from "expo-location";

export async function getAddress(location) {
    const address = await reverseGeocodeAsync({
      latitude: location.lat,
      longitude: location.lng,
    });

    return address;
}