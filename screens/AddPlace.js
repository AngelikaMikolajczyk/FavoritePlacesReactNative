import { PlaceForm } from "../components/Places/PlaceForm";

export function AddPlace({navigation}) {
    function createPlaceHandler(place) {
        navigation.popTo('AllPlaces', {place: place})
    }
    return <PlaceForm onCreatePlace={createPlaceHandler}/>
}