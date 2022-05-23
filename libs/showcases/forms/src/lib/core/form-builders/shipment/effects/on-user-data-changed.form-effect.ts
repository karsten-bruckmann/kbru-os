import { map, Observable } from 'rxjs';
import { FormGroup } from '../../../types/form-group.type';
import { FormEffect } from '@kbru/form-effects';
import { UserData } from '../../../state/user-data/user-data.model';

export const onUserDataChangedFormEffect =
    (userData$: Observable<UserData>): FormEffect<FormGroup> =>
    (formGroup) => {
        const addressGroup = formGroup.get('address');
        if (!addressGroup) {
            throw new Error('address not in form');
        }
        const methodGroup = formGroup.get('method');
        if (!methodGroup) {
            throw new Error('method not in form');
        }
        return userData$.pipe(
            map((userData) => {
                if (null === userData) {
                    addressGroup.setProp('visible', true);
                    methodGroup.setProp('options', ['Standard']);
                    methodGroup.setValue('Standard');
                } else {
                    addressGroup.setProp('visible', false);
                    addressGroup.setValue(userData);
                    methodGroup.setProp('options', ['Standard', 'Express']);
                }
            })
        );
    };
