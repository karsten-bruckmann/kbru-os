import { first, map } from 'rxjs';
import { FormEffect } from '@kbru-os/effect-aware-reactive-forms';
import { FormGroup } from '@angular/forms';
import { StateService } from '../../../state/state.service';
import { MyData } from '../../../models/my-data.model';
import { format } from 'date-fns';

export const setInitialValueFormEffect =
    (stateService: StateService): FormEffect<FormGroup> =>
    (form) => {
        return stateService.data$.pipe(
            first(),
            map((data) => {
                form.setValue(<MyData>{
                    time: format(new Date(), 'HH:mm'),
                    address: data.userData ?? {
                        zipCode: '',
                        city: '',
                        street: '',
                    },
                });
            })
        );
    };
