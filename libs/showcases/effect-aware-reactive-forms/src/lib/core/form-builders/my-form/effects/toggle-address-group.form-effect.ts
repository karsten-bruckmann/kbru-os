import { map, Observable } from 'rxjs';
import { FormEffect } from '@kbru-os/effect-aware-reactive-forms';
import { State } from '../../../models/state.model';
import { FormGroup } from '../../../types/form-group.type';

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
