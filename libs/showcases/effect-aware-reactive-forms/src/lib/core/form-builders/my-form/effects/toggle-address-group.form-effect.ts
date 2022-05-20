import { map, Observable } from 'rxjs';
import {
    FormEffect,
    FormGroupWithProps,
} from '@kbru-os/effect-aware-reactive-forms';
import { State } from '../../../models/state.model';
import { Props } from '../my.form-builder';

export const toggleAddressGroupFormEffect =
    (state$: Observable<State>): FormEffect<FormGroupWithProps<Props>> =>
    (formGroup) =>
        state$.pipe(
            map((state) => {
                if (!state.userData) {
                    formGroup.setProp('visible', true);
                } else {
                    formGroup.setProp('visible', false);
                }
            })
        );
