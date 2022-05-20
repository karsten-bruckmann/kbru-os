import { createAction, props } from '@ngrx/store';
import { DeliveryData } from './delivery-data.model';

export const deliveryDataChangedAction = createAction(
    'deliveryDataChangedAction',
    props<{ data: Partial<DeliveryData> }>()
);
