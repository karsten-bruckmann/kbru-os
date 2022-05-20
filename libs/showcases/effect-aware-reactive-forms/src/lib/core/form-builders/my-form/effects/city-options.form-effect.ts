import { distinctUntilChanged, map, Observable, of, switchMap } from 'rxjs';
import {
    distinctValue,
    FormEffect,
} from '@kbru-os/effect-aware-reactive-forms';
import { FormGroup } from '../../../types/form-group.type';
import { AddressData } from '../../../models/address-data.model';

export const cityOptionsFormEffect =
    (
        getCities: (zipCode: string) => Observable<string[]>
    ): FormEffect<FormGroup> =>
    (formGroup) =>
        distinctValue(formGroup).pipe(
            map((value: AddressData) => value?.zipCode || ''),
            distinctUntilChanged(),
            switchMap((value) =>
                value.length === 5 ? getCities(value) : of([])
            ),
            map((cities) => {
                if (cities.length > 0) {
                    formGroup.get('city')?.setProp('options', cities);
                    formGroup.get('city')?.enable();
                    if (cities.length === 1) {
                        formGroup.get('city')?.setValue(cities[0]);
                        formGroup.get('city')?.disable();
                    }
                    formGroup.get('street')?.enable();
                } else {
                    formGroup.get('city')?.setValue('');
                    formGroup.get('city')?.setProp('options', []);
                    formGroup.get('city')?.disable();
                    formGroup.get('street')?.disable();
                }
            })
        );
