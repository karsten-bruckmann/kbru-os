import { map, Observable } from 'rxjs';
import { FormGroup } from '../../../types/form-group.type';
import { FormEffect } from '@kbru/form-effects';
import { UserData } from '../../../state/user-data/user-data.model';
import { AddressData } from '../../../state/delivery-data/delivery-data.model';

export const addressSetValueFormEffect =
    (userData$: Observable<UserData>): FormEffect<FormGroup> =>
    (formGroup) =>
        userData$.pipe(
            map((userData) => {
                if (userData) {
                    formGroup.get('address')?.setValue(userData);
                } else {
                    formGroup.get('address')?.setValue(<AddressData>{
                        zipCode: '',
                        city: '',
                        street: '',
                    });
                }
            })
        );
