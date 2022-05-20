import { map, Observable } from 'rxjs';
import { State } from '../../../models/state.model';
import { FormGroup } from '../../../types/form-group.type';
import { FormEffect } from '@kbru/form-effects';

export const toggleAddressGroupFormEffect =
    (state$: Observable<State>): FormEffect<FormGroup> =>
    (formGroup) =>
        state$.pipe(
            map((state) => {
                if (!state.userData) {
                    formGroup.get('address')?.setProp('visible', true);
                } else {
                    formGroup.get('address')?.setProp('visible', false);
                }
            })
        );
