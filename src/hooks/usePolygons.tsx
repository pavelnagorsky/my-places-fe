import {useEffect, useState} from "react";
import {PlaceType} from "@/containers/SearchPage/LocationAutocomplete/LocationAutocomplete";
import {ICoordinate, POLYGON_TYPES} from "@/services/open-street-map-service/interfaces";
import {ILatLngCoordinate} from "@/components/Map/Map";
import openStreetMapService from "@/services/open-street-map-service/open-street-map.service";

interface IUsePolygonsProps {
    readonly address: PlaceType | null
}

// custom hook to display region borders based on region address
export function usePolygons({ address }: IUsePolygonsProps) {
    const [polygons, setPolygons] = useState<google.maps.Polygon[]>([]);

    // constructing array of latLng coordinates from array of numbers
    const constructCoordinates = (paths: ICoordinate[]): ILatLngCoordinate[] => {
        const coordinates: ILatLngCoordinate[] = [];
        paths.forEach((location, i) =>{
            // dismiss some values for performance
            if (i % 10 === 0){
                coordinates.push({lat: location[1], lng: location[0]});
            }
        });
        return coordinates;
    }

    // every time selected region changes - fetch new polygons
    useEffect(() => {
        if (!address) {
            setPolygons([]);
            return;
        }
        // request for fetching region administrative borders by text search in polygons
        openStreetMapService.getPolygonData(address.structured_formatting.main_text)
            .then(({data}) => {
                // filter data to include only polygons and multi-polygons
                const filterGeoJsonType = data.filter(d => d.geojson.type === POLYGON_TYPES.MULTI_POLYGON || d.geojson.type === POLYGON_TYPES.POLYGON);
                // creating Google Maps polygons based on fetched coordinates
                const newPolygons: google.maps.Polygon[] = [];
                filterGeoJsonType.forEach((p) => {
                    if (p.geojson.type === POLYGON_TYPES.POLYGON) {
                        const paths = constructCoordinates(p.geojson.coordinates[0])
                        const polygon = new google.maps.Polygon({
                            paths: paths
                        });
                        newPolygons.push(polygon)
                    } else if (p.geojson.type === POLYGON_TYPES.MULTI_POLYGON) {
                        p.geojson.coordinates.forEach(c => {
                            const paths = constructCoordinates(c[0])
                            const polygon = new google.maps.Polygon({
                                paths: paths
                            });
                            newPolygons.push(polygon)
                        })
                    }
                })
                setPolygons(newPolygons)
            })
            .catch(e => {
                setPolygons([]);
                return;
            })
    }, [address])

    // return created polygons
    return polygons;
}