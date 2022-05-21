import { Component } from '@angular/core';
import { DeliveryFormBuilder } from '../../core/form-builders/delivery/delivery.form-builder';
import { Store } from '@ngrx/store';
import {
    userLoggedIn,
    userLoggedOut,
} from '../../core/state/user-data/user-data.actions';
import { userDataSelector } from '../../core/state/user-data/user-data.selectors';

@Component({
    templateUrl: './delivery.component.html',
    styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent {
    constructor(
        private store$: Store,
        private formBuilder: DeliveryFormBuilder
    ) {}

    public form$ = this.formBuilder.form;

    public user$ = this.store$.select(userDataSelector);

    public login(): void {
        this.store$.dispatch(
            userLoggedIn({
                userData: {
                    zipCode: '12435',
                    city: 'Berlin',
                    street: 'An der Spree 64',
                },
            })
        );
    }

    public logout(): void {
        this.store$.dispatch(userLoggedOut());
    }
}
