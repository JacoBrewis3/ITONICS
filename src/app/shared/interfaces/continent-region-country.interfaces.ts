export interface Country {
    country: string;
    population: number;
    wikipedia: string;
    flag: string;
    land_area_km2: number;
}

export interface Region {
    [regionName: string]: Country[];
}
export interface World {
    [continentName:string]: Region[];
}