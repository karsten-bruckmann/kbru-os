import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryComponent } from './presentation/delivery/delivery.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DeliveryDataModule } from './core/state/delivery-data/delivery-data.module';
import { UserDataModule } from './core/state/user-data/user-data.module';
import { CitiesModule } from './core/state/cities/cities.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: DeliveryComponent,
            },
        ]),
        DeliveryDataModule,
        UserDataModule,
        CitiesModule,
    ],
    declarations: [DeliveryComponent],
})
export class ShowcasesFormsModule {}
