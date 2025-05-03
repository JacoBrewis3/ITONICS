import { Region } from "../interfaces/continent-region-country.interfaces";

export const convertToHierarchy = (data: Region): any => {
    return {
      name: 'Europe',
      children: Object.entries(data).map(([regionName, countries]) => ({
        name: regionName,
        children: Array.isArray(countries)
          ? countries.map(country => ({
              name: country.country,
              value: country.population,
              ...country
            }))
          : [] // fallback if it's not an array
      }))
    };
  };
  