import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CitiesApiClient {
    constructor(private http: HttpClient) {}

    private fixtures: Record<string, string[]> = {
        '12435': ['Berlin'],
        '00000': ['You', 'Found', 'An', 'Easter', 'Egg'],
    };
    private fixtureMode = true;

    public setFixtureMode(mode: boolean) {
        this.fixtureMode = mode;
    }

    public fetch(zipCode: string): Observable<string[]> {
        if (this.fixtureMode) {
            return of(this.fromFixtures(zipCode));
        }

        return this.http.get<string[]>('/some/api/path');
    }

    private fromFixtures(zipCode: string): string[] {
        return this.fixtures[zipCode] ?? [];
    }
}
