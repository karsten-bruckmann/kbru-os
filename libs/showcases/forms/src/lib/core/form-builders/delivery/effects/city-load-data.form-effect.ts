import { distinctUntilChanged, filter, map, Observable } from 'rxjs';
import { FormGroup } from '../../../types/form-group.type';
import { FormEffect } from '@kbru/form-effects';
import {
    CitiesLoading,
    citiesNotLoaded,
    CitiesNotLoaded,
} from '../../../state/cities/cities.model';
import { concatLatestFrom } from '@ngrx/effects';

export const cityLoadDataFormEffect =
    (
        selectCities: (
            zipCode: string
        ) => Observable<string[] | CitiesLoading | CitiesNotLoaded>,
        loadCities: (zipCode: string) => void
    ): FormEffect<FormGroup> =>
    (formGroup) => {
        const zipControl = formGroup.get('zipCode');
        if (!zipControl) {
            throw new Error('zipCode not in form');
        }
        return zipControl.valueChanges.pipe(
            distinctUntilChanged(),
            filter((zipCode) => !!zipCode && zipCode.length === 5),
            concatLatestFrom((zipCode) => selectCities(zipCode)),
            filter(([, cities]) => citiesNotLoaded(cities)),
            map(([zipCode]) => {
                loadCities(zipCode);
            })
        );
    };
