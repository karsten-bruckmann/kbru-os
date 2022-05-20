import { map, Observable } from 'rxjs';
import { FormGroup } from '../../../types/form-group.type';
import { FormEffect } from '@kbru/form-effects';
import { UserData } from '../../../state/user-data/user-data.model';

export const addressEnabledStateFormEffect =
    (userData$: Observable<UserData>): FormEffect<FormGroup> =>
    (formGroup) =>
        userData$.pipe(
            map((userData) => {
                if (userData) {
                    formGroup.get('address')?.disable();
                } else {
                    formGroup.get('address')?.enable();
                }
            })
        );
