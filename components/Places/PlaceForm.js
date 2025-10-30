import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constans/colors";
import { ImagePicker } from "./ImagePicker";
import { LocationPicker } from "./LocationPicker";
import { Button } from "../ui/Button";
import { Place } from "../../models/place";

export function PlaceForm({onCreatePlace}) {
    const [title, setTitle] = useState();
    const [pickedLocation, setPickedLocation] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [address, setAddress] = useState();

    function onChangeTitleHandler(text) {
        setTitle(text);
    }

    function onTakeImageHandler(imageUri) {
        setSelectedImage(imageUri);
    }

    const onPickLocationHandler = useCallback((location, address) => {
        setPickedLocation(location);
        setAddress(address);
    }, [])

    function savePlaceHandler() {        
        const placeData = new Place(title, selectedImage, address, pickedLocation);
        onCreatePlace(placeData);
    }

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={onChangeTitleHandler} value={title}/>
            </View>
            <ImagePicker onTakeImage={onTakeImageHandler} selectedImage={selectedImage}/>
            <LocationPicker onPickLocation={onPickLocationHandler} pickedLocation={pickedLocation}/>
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100,
        borderRadius: 4
    }
});