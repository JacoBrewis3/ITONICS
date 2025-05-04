import { HttpErrorResponse } from "@angular/common/http";
import { Country, FilterType, World } from "../../../shared/interfaces/continent-region-country.interfaces";

export class Fetch {
    static readonly type = '[World] - Fetch data';
}

export class FetchSuccess {
    static readonly type = '[World] - Fetch data success';
    constructor(public payload: World) {}
}

export class FetchFailed {
    static readonly type = '[World] - Fetch data failed';
    constructor(public payload:HttpErrorResponse ) {}
}

export class FilterChanged {
    static readonly type = '[Filter] - filter changed';
    constructor(public payload: FilterType) {}
}

export class CountrySelected {
    static readonly type = '[Country[ - Selected';
    constructor(public payload: Country) {}
}