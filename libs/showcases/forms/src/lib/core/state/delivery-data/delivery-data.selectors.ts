import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeliveryData } from './delivery-data.model';

const deliveryDataSelector =
    createFeatureSelector<DeliveryData>('delivery-data');

export const deliveryAddressSelector = createSelector(
    deliveryDataSelector,
    (deliveryData) => deliveryData.address
);

export const deliveryAddressZipCodeSelector = createSelector(
    deliveryAddressSelector,
    (deliveryAddress) => deliveryAddress.zipCode
);

export const deliveryAddressCityCodeSelector = createSelector(
    deliveryAddressSelector,
    (deliveryAddress) => deliveryAddress.city
);

export const deliveryAddressStreetCodeSelector = createSelector(
    deliveryAddressSelector,
    (deliveryAddress) => deliveryAddress.street
);
