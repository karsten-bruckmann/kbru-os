import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CitiesResponse } from './cities.response';

@Injectable({ providedIn: 'root' })
export class CitiesApiClient {
    constructor(private http: HttpClient) {}

    private baseUrl = 'https://api.zippopotam.us/de/';

    public fetch(zipCode: string): Observable<string[]> {
        return this.http
            .get<CitiesResponse>(`${this.baseUrl}${zipCode}`)
            .pipe(
                map((response) =>
                    response.places.map((place) => place['place name'])
                )
            );
    }
}
