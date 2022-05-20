import { map, timer } from 'rxjs';
import { FormEffect } from '@kbru-os/effect-aware-reactive-forms';
import { FormGroup } from '../../../types/form-group.type';

export const toggleFormFormEffect: FormEffect<FormGroup> = (formGroup) =>
    timer(3000).pipe(
        map(() => {
            formGroup.setProp('visible', true);
        })
    );
