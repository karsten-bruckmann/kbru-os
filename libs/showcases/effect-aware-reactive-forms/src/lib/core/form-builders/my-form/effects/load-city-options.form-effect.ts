import { map, Observable, switchMap } from 'rxjs';
import {
    distinctValue,
    FormEffect,
} from '@kbru-os/effect-aware-reactive-forms';
import { FormGroup } from '../../../types/form-group.type';
import { AddressData } from '../../../models/address-data.model';

export const loadCityOptionsFormEffect =
    (
        getCities: (zipCode: string) => Observable<string[]>
    ): FormEffect<FormGroup> =>
    (formGroup) =>
        distinctValue(formGroup).pipe(
            switchMap((value: AddressData) => getCities(value.zipCode)),
            map((cities) => {
                if (cities.length > 0) {
                    console.log(cities);
                    formGroup.get('city')?.setProp('options', cities);
                    formGroup.get('city')?.enable();
                } else {
                    formGroup.get('city')?.setProp('options', []);
                    formGroup.get('city')?.disable();
                }
            })
        );
