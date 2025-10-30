import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { Colors } from "../../constans/colors";
import { OutlinedButton } from "../ui/OutlinedButton";

export function ImagePicker({onTakeImage, selectedImage}) {
    const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

    async function verifyPermission() {
        if(cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if(cameraPermissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert('No permission. Need grand camera permission to use this app.');
            return false;
        }

        return true;
    }

    async function takePhotoHandler() {
        const hasPermission = await verifyPermission();
        if(!hasPermission) {
            return;
        }

        const photo = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5,

        });
       
        onTakeImage(photo.assets[0].uri);
    }

    let imagePreview = <Text>No image taken yet</Text>;

    if(selectedImage) {
        imagePreview = <Image style={styles.image} source={{uri: selectedImage}}/>;
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton onPress={takePhotoHandler} icon='camera'>Take Image</OutlinedButton>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4 
    },
    image: {
        width: '100%',
        height: '100%'
    }
});