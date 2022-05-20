export interface AddressData {
    zipCode: string;
    city: string;
    street: string;
}

export interface DeliveryData {
    address: AddressData;
}
