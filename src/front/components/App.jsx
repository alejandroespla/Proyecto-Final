import React, { useEffect, useState,useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { APIProvider, ControlPosition, MapControl, Map, useMap, useMapsLibrary, AdvancedMarker, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';


import { createRoot } from "react-dom/client";
const API_KEY = globalThis.GOOGLE_MAPS_API_KEY ?? "AIzaSyAZGZS8YvpJUtpA8KHH5CbnoYUU05xTVak";
const position = { lat: 41.3872516334326, lng: 2.171430948862673 };

export const App = () => {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [markerRef, marker] = useAdvancedMarkerRef();
    return (
        <APIProvider
            apiKey={API_KEY}
            solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
        >
            <Map
                mapId={"2cff1ef28229f873716f5413"}
                defaultZoom={9}
                defaultCenter={position}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
            >
                <AdvancedMarker ref={markerRef} position={null} />
            </Map>
            <MapControl position={ControlPosition.TOP}>
                <div className="autocomplete-control">
                    <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                </div>
            </MapControl>
            <Maphandler place={selectedPlace} marker={marker} />

        </APIProvider>
    );
};
const Maphandler = ({ place, marker }) => {
    const map = useMap();
    useEffect(() => {
        if (!map || !place || !marker) return;
        if (place.geometry?.viewport) {
            map.fitBounds(place.geometry?.location);
        }
        marker.position = place.geometry?.location;
    }, [map, place, marker]);
    return null;
}
const PlaceAutocomplete = ({ onPlaceSelect }) => {
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const inputRef = useRef(null);
    const places = useMapsLibrary("places");

    useEffect(() => {
        if (!places || !inputRef.current) return;

        const options = {
            fields: ["geometry", "name", "formatted_address"],
        };

        setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);
    useEffect(() => {
        if (!placeAutocomplete) return;

        placeAutocomplete.addListener("place_changed", () => {
            onPlaceSelect(placeAutocomplete.getPlace());
        });
    }, [onPlaceSelect, placeAutocomplete]);
    return (
        <div className="autocomplete-container">
            <input ref={inputRef} />
        </div>
    );
};
