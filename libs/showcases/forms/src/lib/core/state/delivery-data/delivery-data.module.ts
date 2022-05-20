import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { DeliveryData } from './delivery-data.model';
import { deliveryDataReducer } from './delivery-data.reducer';

@NgModule({
    imports: [
        StoreModule.forFeature<DeliveryData>(
            'delivery-data',
            deliveryDataReducer
        ),
    ],
})
export class DeliveryDataModule {}
