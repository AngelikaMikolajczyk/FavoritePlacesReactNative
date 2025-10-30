import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { IconButton } from "../components/ui/IconButton";

export function Map({navigation}) {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 51.47,
    longitude: 19.27,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({
      lat: lat,
      lng: lng,
    });
  }

  const saveSelectedLocation = useCallback(() => {
    if(!selectedLocation) {
        Alert.alert('No location selected. You have to pick a location.');
        return;
    }

    // navigation.navigate('AddPlace', {selectedLocation}); //  is navigating to a new "AddPlace" screen instead of navigating back to the initial "AddPlace" screen in your navigation history
    navigation.popTo('AddPlace', {selectedLocation});
  }, [navigation, selectedLocation])

  useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: ({tintColor}) => <IconButton icon='save' size={24} color={tintColor} onPress={saveSelectedLocation}/>
    })
  }, [navigation, saveSelectedLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
        {
            selectedLocation && (
                <Marker coordinate={{
                    latitude: selectedLocation.lat,
                    longitude: selectedLocation.lng,
                }}/>
            )
        }
        
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
