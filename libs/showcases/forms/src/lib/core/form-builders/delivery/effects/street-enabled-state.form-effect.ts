import { map } from 'rxjs';
import { distinctValue, FormEffect } from '@kbru/form-effects';
import { FormGroup } from '../../../types/form-group.type';

export const streetEnabledStateFormEffect: FormEffect<FormGroup> = (
    formGroup
) => {
    const cityControl = formGroup.get('city');
    if (!cityControl) {
        throw new Error('zipCode not in form');
    }
    return distinctValue(cityControl).pipe(
        map((city) => {
            if (!city) {
                formGroup.get('street')?.disable();
            } else {
                formGroup.get('street')?.enable();
            }
        })
    );
};
