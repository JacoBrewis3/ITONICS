export interface Country {
    country: string;
    population: number;
    wikipedia: string;
    flag: string;
    land_area_km2: number;
}

export type Region = {
    [region: string]: Country[];
  };
export interface World {
    [continentName:string]: Region;
}

type EuropeData = {
    Europe: Region;
};