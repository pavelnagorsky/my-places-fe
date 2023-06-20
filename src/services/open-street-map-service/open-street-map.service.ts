import axios from "axios";
import { IFetchedPolygonData } from "./interfaces";

const openStreetMapService = {
  // get region borders in polygons
  getPolygonData: (query: string) =>
    axios.get<IFetchedPolygonData[]>(
      `https://nominatim.openstreetmap.org/search.php?q=${query}&polygon_geojson=1&format=json`
    ),
};

export default openStreetMapService;
