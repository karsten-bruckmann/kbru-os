import { Injectable } from '@angular/core';
import { StateService } from '../../state/state.service';
import { BehaviorSubject, map } from 'rxjs';
import { toggleAddressGroupFormEffect } from './effects/toggle-address-group.form-effect';
import { FormGroup } from '../../types/form-group.type';
import { preFillUserDataFormEffect } from './effects/pre-fill-user-data.form-effect';
import { cityOptionsFormEffect } from './effects/city-options.form-effect';
import { CitiesApiClient } from '../../api-clients/cities.api-client';
import { createEffectAwareForm } from '@kbru/form-effects';
import { FormControlWithProps, FormGroupWithProps } from '@kbru/control-props';

export interface Props {
    visible: boolean;
}

@Injectable({ providedIn: 'root' })
export class MyFormBuilder {
    constructor(
        private stateService: StateService,
        private citiesApiClient: CitiesApiClient
    ) {}

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
                preFillUserDataFormEffect(this.stateService.data$),
                cityOptionsFormEffect((zipCode) =>
                    this.citiesApiClient.fetch(zipCode)
                ),
            ]
        );
        const form = new FormGroupWithProps<Props>(
            { visible: true },
            {
                time: new FormControlWithProps({ visible: true }),
                address: addressForm.value,
            }
        );

        return createEffectAwareForm(form, [
            () => addressForm.pipe(map(() => undefined)),
            toggleAddressGroupFormEffect(this.stateService.data$),
        ]);
    }
}
