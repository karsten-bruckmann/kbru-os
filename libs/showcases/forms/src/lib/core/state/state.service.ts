import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { State } from '../models/state.model';

@Injectable({ providedIn: 'root' })
export class StateService {
    public readonly data$ = new BehaviorSubject<State>({
        userData: null,
    });
}
