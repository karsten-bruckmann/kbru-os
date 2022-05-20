import { map, Observable } from 'rxjs';
import { FormEffect } from '@kbru-os/effect-aware-reactive-forms';
import { State } from '../../../models/state.model';
import { FormGroup } from '../../../types/form-group.type';
import { AddressData } from '../../../models/address-data.model';

export const preFillUserDataFormEffect =
    (state$: Observable<State>): FormEffect<FormGroup> =>
    (formGroup) =>
        state$.pipe(
            map((state) => {
                if (state.userData) {
                    formGroup.setValue(state.userData);
                } else {
                    formGroup.setValue(<AddressData>{
                        street: '',
                        city: '',
                        zipCode: '',
                    });
                }
            })
        );
