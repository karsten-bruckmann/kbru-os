import { Injectable } from '@angular/core';
import {
    createEffectAwareForm,
    FormControlWithProps,
    FormGroupWithProps,
} from '@kbru-os/effect-aware-reactive-forms';
import { toggleFormFormEffect } from './effects/toggle-form.form-effect';
import { setInitialValueFormEffect } from './effects/set-initial-value.form-effect';
import { StateService } from '../../state/state.service';
import { BehaviorSubject, map } from 'rxjs';
import { toggleAddressGroupFormEffect } from './effects/toggle-address-group.form-effect';
import { FormGroup } from '../../types/form-group.type';
import { preFillUserDataFormEffect } from './effects/pre-fill-user-data.form-effect';

export interface Props {
    visible: boolean;
}

@Injectable({ providedIn: 'root' })
export class MyFormBuilder {
    constructor(private stateService: StateService) {}

    public get form(): BehaviorSubject<FormGroup> {
        const addressForm = createEffectAwareForm<FormGroup>(
            new FormGroupWithProps(
                { visible: true },
                {
                    zipCode: new FormControlWithProps({ visible: true }),
                    city: new FormControlWithProps({ visible: true }),
                    street: new FormControlWithProps({ visible: true }),
                }
            ),
            [
                toggleAddressGroupFormEffect(this.stateService.data$),
                preFillUserDataFormEffect(this.stateService.data$),
            ]
        );
        const form = new FormGroupWithProps<Props>(
            { visible: true },
            {
                time: new FormControlWithProps({ visible: true }),
                address: addressForm.value,
            }
        );
        form.setProp('visible', false);

        console.log(form.get('address.zipCode')?.prop('visible'));

        return createEffectAwareForm(form, [
            () => addressForm.pipe(map(() => undefined)),
            toggleFormFormEffect,
            setInitialValueFormEffect(this.stateService),
        ]);
    }
}
