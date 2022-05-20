import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CitiesApiClient {
    public fetch(zipCode: string): Observable<string[]> {
        if (zipCode === '12435') {
            return of(['Berlin']);
        }

        if (zipCode === '00000') {
            return of(['You', 'Found', 'An', 'Easter', 'Egg']);
        }

        return of([]);
    }
}
