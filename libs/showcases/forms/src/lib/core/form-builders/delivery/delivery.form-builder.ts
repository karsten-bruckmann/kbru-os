import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { addressEnabledStateFormEffect } from './effects/address-enabled-state.form-effect';
import { FormGroup } from '../../types/form-group.type';
import { createEffectAwareForm } from '@kbru/form-effects';
import { FormControlWithProps, FormGroupWithProps } from '@kbru/control-props';
import { Store } from '@ngrx/store';
import { userDataSelector } from '../../state/user-data/user-data.selectors';
import { cityLoadDataFormEffect } from './effects/city-load-data.form-effect';
import { citiesSelector } from '../../state/cities/cities.selectors';
import { loadCitiesRequested } from '../../state/cities/cities.actions';
import { cityEnabledStateFormEffect } from './effects/city-enabled-state.form-effect';
import { cityOptionsFormEffect } from './effects/city-options.form-effect';
import { streetEnabledStateFormEffect } from './effects/street-enabled-state.form-effect';
import { citySetValueFormEffect } from './effects/city-set-value.form-effect';
import { addressSetValueFormEffect } from './effects/address-set-value.form-effect';
import { cityVisibilityFormEffect } from './effects/city-visibility.form-effect';

export interface Props {
    visible: boolean;
}

@Injectable({ providedIn: 'root' })
export class DeliveryFormBuilder {
    constructor(private store$: Store) {}

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
                cityLoadDataFormEffect(
                    (zipCode) => this.store$.select(citiesSelector(zipCode)),
                    (zipCode) =>
                        this.store$.dispatch(loadCitiesRequested({ zipCode }))
                ),
                cityEnabledStateFormEffect((zipCode) =>
                    this.store$.select(citiesSelector(zipCode))
                ),
                cityOptionsFormEffect((zipCode) =>
                    this.store$.select(citiesSelector(zipCode))
                ),
                citySetValueFormEffect((zipCode) =>
                    this.store$.select(citiesSelector(zipCode))
                ),
                cityVisibilityFormEffect((zipCode) =>
                    this.store$.select(citiesSelector(zipCode))
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
            addressEnabledStateFormEffect(this.store$.select(userDataSelector)),
            addressSetValueFormEffect(this.store$.select(userDataSelector)),
            streetEnabledStateFormEffect,
        ]);
    }
}
