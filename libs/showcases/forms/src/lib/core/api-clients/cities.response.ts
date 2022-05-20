export interface CitiesResponse {
    'post code': string;
    country: 'Germany';
    'country abbreviation': 'DE';
    places: [
        {
            'place name': string;
            longitude: string;
            state: string;
            'state abbreviation': string;
            latitude: string;
        }
    ];
}
