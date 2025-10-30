import { FlatList, StyleSheet, Text, View } from "react-native";
import { PlaceItem } from "./PlaceItem";
import { Colors } from "../../constans/colors";

export function PlacesList({ places }) {
    if(!places || places.length === 0) {
        return <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>No placess added yet.</Text>
        </View>
    }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  );
}

const styles = StyleSheet.create({
    list: {
      margin: 18
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200
    }
})
