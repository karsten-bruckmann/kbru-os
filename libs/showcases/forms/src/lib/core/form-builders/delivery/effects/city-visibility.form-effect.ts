import { map, Observable, switchMap } from 'rxjs';
import { FormGroup } from '../../../types/form-group.type';
import { distinctValue, FormEffect } from '@kbru/form-effects';
import {
    CitiesLoading,
    CitiesNotLoaded,
} from '../../../state/cities/cities.model';

export const cityVisibilityFormEffect =
    (
        selectCities: (
            zipCode: string
        ) => Observable<string[] | CitiesLoading | CitiesNotLoaded>
    ): FormEffect<FormGroup> =>
    (formGroup) => {
        const zipControl = formGroup.get('zipCode');
        if (!zipControl) {
            throw new Error('zipCode not in form');
        }
        return distinctValue(zipControl).pipe(
            switchMap((zipCode) => selectCities(zipCode)),
            map((cities) => {
                if (cities.length === 1) {
                    formGroup.get('city')?.setProp('visible', false);
                } else {
                    formGroup.get('city')?.setProp('visible', true);
                }
            })
        );
    };
