import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentComponent } from './presentation/shipment/shipment.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ShipmentDataModule } from './core/state/shipment-data/shipment-data.module';
import { UserDataModule } from './core/state/user-data/user-data.module';
import { CitiesModule } from './core/state/cities/cities.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: ShipmentComponent,
            },
        ]),
        ShipmentDataModule,
        UserDataModule,
        CitiesModule,
    ],
    declarations: [ShipmentComponent],
})
export class ShowcasesFormsModule {}
