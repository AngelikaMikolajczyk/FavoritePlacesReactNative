import { useEffect, useState } from "react";
import { PlacesList } from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

export function AllPlaces({route}) {
    const [places, setPlaces] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        //is causing bug when places are not form db or context, when go back from another screen causing adding last added place because route.params is in memory
        if(isFocused && route.params && route.params.place) {
            setPlaces(currentPlaces => [...currentPlaces, route.params.place]);
        }
    }, [isFocused, route]);

    return <PlacesList places={places}/>
}