// types of open-street-map API response

export enum POLYGON_TYPES {
    POLYGON = "Polygon",
    MULTI_POLYGON = "MultiPolygon"
}

export interface IFetchedPolygonData {
    geojson: {
        type: POLYGON_TYPES.POLYGON,
        coordinates: IPolygonCoordinate[]
    } | {
        type: POLYGON_TYPES.MULTI_POLYGON,
        coordinates: IMultiPolygonCoordinate[]
    }
}

type IPolygonCoordinate = ICoordinate[];

type IMultiPolygonCoordinate = ICoordinate[][];

export type ICoordinate = number[];