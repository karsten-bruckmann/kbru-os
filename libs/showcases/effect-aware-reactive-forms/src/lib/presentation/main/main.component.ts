import { Component } from '@angular/core';
import { MyFormBuilder } from '../../core/form-builders/my-form/my.form-builder';
import { StateService } from '../../core/state/state.service';

@Component({
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent {
    public form$ = this.formBuilder.form;

    constructor(
        private formBuilder: MyFormBuilder,
        public stateService: StateService
    ) {}

    public login(): void {
        this.stateService.data$.next({
            ...this.stateService.data$.value,
            userData: {
                zipCode: '12345',
                city: 'Hamburg',
                street: 'An der Alster',
            },
        });
    }

    public logout(): void {
        this.stateService.data$.next({
            ...this.stateService.data$.value,
            userData: null,
        });
    }
}
