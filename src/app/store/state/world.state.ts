import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Country, FilterType, Region, World } from "../../shared/interfaces/continent-region-country.interfaces";
import { Injectable } from "@angular/core";
import { WorldActions } from "../actions/world-actions"; import { FetchDataService } from "../../services/fetch-data.service";
import { catchError, of, tap } from "rxjs";
import { convertToHierarchy } from "../../shared/utils/convert-json-to-d3";
import { HierarchyDatum } from "../../components/ui/d3-container/d3-container.component";
'../actions/world-actions/index';

export interface WorldStateModel {
    world: World | null;
    isLoading: boolean;
    loaded: boolean;
    selectedCountry: Country | null
    error: boolean;
    errorMessage: string;
    filterType: FilterType;
    region: Region,
    hierachy: HierarchyDatum;
}

export interface ErrorObj {
    error: boolean;
    errorMessage: string;
}

@State<WorldStateModel>({
    name: 'world',
    defaults: {
        isLoading: false,
        loaded: false,
        selectedCountry: null,
        world: null,
        error: false,
        errorMessage: '',
        filterType: "population",
        region: {},
        hierachy: {
            children: [],
            name: ''
        }
    }
})
@Injectable()
export class WorldState {

    constructor(
        private dataServices: FetchDataService,
        private store: Store
    ) { }

    @Selector()
    static getWorldData(state: WorldStateModel): World | null {
        return state.world;
    }

    @Selector()
    static getLoading(state: WorldStateModel): boolean {
        return state.isLoading;
    }

    @Selector()
    static getError(state: WorldStateModel): ErrorObj {
        return {
            error: state.error,
            errorMessage: state.errorMessage
        }
    }
    @Selector()
    static getSelectedCountry(state: WorldStateModel): Country | null {
        return state.selectedCountry;
    }

    @Selector()
    static getFilterType(state: WorldStateModel): FilterType {
        return state.filterType
    }

    @Selector()
    static getRegion(state: WorldStateModel): Region {
        return state.region;
    }
    @Selector()
    static getHierachy(state: WorldStateModel): HierarchyDatum {
        return state.hierachy
    }

    @Action(WorldActions.Fetch)
    fetchWorld(ctx: StateContext<WorldStateModel>) {

        ctx.patchState({
            isLoading: true
        })

        return this.dataServices.fetchData()
            .pipe(
                tap(results => {
                    this.store.dispatch(new WorldActions.FetchSuccess(results as World))
                }),
                catchError(error => {
                    this.store.dispatch(new WorldActions.FetchFailed(error))
                    return of([])
                })
            )

    }

    @Action(WorldActions.FetchSuccess)
    fetchSuccess(ctx: StateContext<WorldStateModel>, action: WorldActions.FetchSuccess) {
        // simulate loading state - fetching http
        setTimeout(() => {
            // map json data to d3 compatible
            const europeData: Region = action.payload["Europe"];

            const europeDataMapped = convertToHierarchy(europeData);

            if (!europeDataMapped) {
                return;
            }

            ctx.patchState({
                region: europeData ?? null,
                hierachy: europeDataMapped,
                isLoading: false
            })
        }, 2000)

    }

    @Action(WorldActions.FetchFailed)
    fetchFailed(ctx: StateContext<WorldStateModel>, action: WorldActions.FetchFailed) {

        ctx.patchState({
            error: true,
            isLoading: false,
            errorMessage: action.payload.message
        })
    }

    @Action(WorldActions.FilterChanged)
    filterChanged(ctx: StateContext<WorldStateModel>, action: WorldActions.FilterChanged) {

        ctx.patchState({
            filterType: action.payload ?? 'population'
        })

    }

    @Action(WorldActions.CountrySelected)
    countrySelected(ctx: StateContext<WorldStateModel>, action: WorldActions.CountrySelected) {
        console.log(action.payload);

        ctx.patchState({
            selectedCountry: action?.payload ?? {}
        })
    }
}