import { AbstractControl } from '@angular/forms';
import { distinctUntilChanged, merge, of } from 'rxjs';

/**
 * Returns an Observable of the form status starting with the
 * current status. Will only emit when the status changed.
 */
export const distinctStatus = (control: AbstractControl) =>
    merge(of(control.status), control.statusChanges).pipe(
        distinctUntilChanged()
    );
