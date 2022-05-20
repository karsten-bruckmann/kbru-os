import { createReducer, on } from '@ngrx/store';
import { DeliveryData } from './delivery-data.model';
import { deliveryDataChangedAction } from './delivery-data.actions';

export const deliveryDataReducer = createReducer<DeliveryData>(
    {
        address: {
            zipCode: '',
            street: '',
            city: '',
        },
    },
    on(deliveryDataChangedAction, (state, action) => ({
        ...state,
        ...action.data,
    }))
);
