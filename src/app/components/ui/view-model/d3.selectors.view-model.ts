import { Selector } from "@ngxs/store";
import { WorldState } from "../../../store/state/world.state";

export interface D3DataModel {
    loading: boolean;
    hierachy: any
}

export class D3Selectors {

    @Selector([
        WorldState.getLoading,
        WorldState.getHierachy
    ])
    static getViewModel(
        loading: boolean,
        hierachy: any
    ): D3DataModel {
        return {
            loading,
            hierachy           
        }
    }

}