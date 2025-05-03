import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Country, World } from "../../shared/interfaces/continent-region-country.interfaces";
import { Injectable } from "@angular/core";
import { WorldActions } from "../actions/world-actions";import { FetchDataService } from "../../services/fetch-data.service";
import { catchError, of, tap } from "rxjs";
 '../actions/world-actions/index';

export interface WorldStateModel {
    world: World | null;
    isLoading: boolean;
    loaded: boolean;
    selectedCountry: Country | null
    error: boolean;
    errorMessage: string;
    filterType: string;
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
        filterType: "area"
    }
})
@Injectable()
export class WorldState {

    constructor(
        private dataServices: FetchDataService,
        private store: Store
    ) {}
    
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
    static getFilterType(state: WorldStateModel): string {
        return state.filterType
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
            ctx.patchState({
                world: action.payload ?? null,
                isLoading: false
            })
    }

    @Action(WorldActions.FetchFailed)
    fetchFailed(ctx: StateContext<WorldStateModel>, action: WorldActions.FetchFailed) {

            ctx.patchState({
                error: true,
                errorMessage: action.payload.message
            })
    }

    @Action(WorldActions.FilterChanged)
    filterChanged(ctx: StateContext<WorldStateModel>, action: WorldActions.FilterChanged) {

        ctx.patchState({
            filterType: action.payload ?? 'area'
        })

    }
}