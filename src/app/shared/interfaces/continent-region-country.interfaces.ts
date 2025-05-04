export interface Country {
    country: string;
    population: number;
    wikipedia: string;
    flag: string;
    land_area_km2: number;
    value?: number;
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

export type FilterType = 'population' | 'land_area_km2';