import { Selector } from "@ngxs/store";
import { Country, FilterType, Region, World } from "../../../shared/interfaces/continent-region-country.interfaces";
import { ErrorObj, WorldState } from "../../../store/state/world.state";

export interface WorldViewModel {
    error: ErrorObj,
    isLoading: boolean,
    selectedCountry: Country | null,
    world: World | null | undefined,
    filterType: FilterType,
    region: Region,
    hierachy: any;
}

export class WorldSelectors {
    
    @Selector([
        WorldState.getError,
        WorldState.getLoading,
        WorldState.getSelectedCountry,
        WorldState.getWorldData,
        WorldState.getFilterType,
        WorldState.getRegion,
        WorldState.getHierachy
      ])
      static getViewModel(
        error: ErrorObj,
        isLoading: boolean,
        selectedCountry: Country | null,
        world: World | null,
        filterType: FilterType,
        region: Region,
        hierachy: any
      ) {
        return {
          error,
          isLoading,
          selectedCountry,
          world,
          filterType,
          region,
          hierachy
        };
      }
      
}

