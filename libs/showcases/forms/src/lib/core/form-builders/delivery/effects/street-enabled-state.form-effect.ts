import { filter, map, switchMap } from 'rxjs';
import { distinctStatus, distinctValue, FormEffect } from '@kbru/form-effects';
import { FormGroup } from '../../../types/form-group.type';

export const streetEnabledStateFormEffect: FormEffect<FormGroup> = (
    formGroup
) => {
    const cityControl = formGroup.get('address.city');
    if (!cityControl) {
        throw new Error('zipCode not in form');
    }
    return distinctStatus(formGroup).pipe(
        filter((status) => status !== 'DISABLED'),
        switchMap(() =>
            distinctValue(cityControl).pipe(
                map((city) => {
                    if (!city) {
                        formGroup.get('street')?.disable();
                    } else {
                        formGroup.get('street')?.enable();
                    }
                })
            )
        )
    );
};
