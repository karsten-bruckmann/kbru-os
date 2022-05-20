import { MyFormBuilder } from './my.form-builder';
import { format } from 'date-fns';
import { BehaviorSubject } from 'rxjs';
import { State } from '../../models/state.model';

describe('MyFormBuilder', () => {
    let builder: MyFormBuilder;
    let state$: BehaviorSubject<State>;
    let form$: MyFormBuilder['form'];

    beforeEach(() => {
        state$ = new BehaviorSubject<State>({
            userData: null,
        });
        builder = new MyFormBuilder({
            get data$() {
                return state$;
            },
        });
        form$ = builder.form;
    });

    it('returns a behaviour subject of the form', () => {
        expect(form$.subscribe).toBeTruthy();
        expect(form$.value).toBeTruthy();
    });

    it('initializes the value', () => {
        form$.subscribe();
        expect(form$.value.value).toEqual({
            address: {
                city: '',
                street: '',
                zipCode: '',
            },
            time: format(new Date(), 'HH:mm'),
        });
    });

    it('shows the address group on logout', () => {
        form$.subscribe();
        state$.next({
            userData: null,
        });
        expect(form$.value.get('address')?.prop('visible')).toEqual(true);
    });

    it('hides the address group on login', () => {
        form$.subscribe();
        state$.next({
            userData: {
                zipCode: '12345',
                city: 'sewfefwef',
                street: 'Abcdef',
            },
        });
        expect(form$.value.get('address')?.prop('visible')).toEqual(false);
    });
});
