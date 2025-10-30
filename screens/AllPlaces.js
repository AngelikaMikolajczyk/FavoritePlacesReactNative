import { useEffect, useState } from "react";
import { PlacesList } from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

export function AllPlaces({route}) {
    const [places, setPlaces] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        if(isFocused && route.params) {
            setPlaces(currentPlaces => [...currentPlaces, route.params.place]);
        }
    }, [isFocused, route]);

    return <PlacesList places={places}/>
}