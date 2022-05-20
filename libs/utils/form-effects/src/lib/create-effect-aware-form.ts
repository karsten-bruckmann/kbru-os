import { BehaviorSubject, map, merge, share } from 'rxjs';
import { FormEffect } from './form-effect.type';
import { FormGroup } from '@angular/forms';

export const createEffectAwareForm = <T extends FormGroup>(
    control: T,
    effects: FormEffect<T>[]
): BehaviorSubject<T> => {
    const mergedEffects$ = merge(
        ...effects.map((effect) => effect(control))
    ).pipe(
        share(),
        map(() => control)
    );
    const behaviorSubject$ = new BehaviorSubject<T>(control);
    mergedEffects$.subscribe(behaviorSubject$);

    return behaviorSubject$;
};
