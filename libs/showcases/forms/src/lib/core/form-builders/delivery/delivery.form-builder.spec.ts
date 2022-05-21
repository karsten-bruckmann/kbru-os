import { DeliveryFormBuilder } from './delivery.form-builder';
import { TestBed } from '@angular/core/testing';
import { ShowcasesFormsModule } from '../../../showcases-forms.module';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
    userLoggedIn,
    userLoggedOut,
} from '../../state/user-data/user-data.actions';
import { EffectsModule } from '@ngrx/effects';
import { citiesMock } from '../../api-clients/cities.response';

describe('MyFormBuilder', () => {
    let httpTestingControler: HttpTestingController;
    let store$: Store;

    let form$: DeliveryFormBuilder['form'];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
                EffectsModule.forRoot([]),
                ShowcasesFormsModule,
                HttpClientTestingModule,
            ],
        });

        httpTestingControler = TestBed.inject(HttpTestingController);
        store$ = TestBed.inject(Store);
        const builder = TestBed.inject(DeliveryFormBuilder);
        form$ = builder.form;
    });

    it('shows the address group on logout', () => {
        form$.subscribe();
        store$.dispatch(userLoggedOut());
        expect(form$.value.get('address')?.prop('visible')).toEqual(true);
    });

    it('hides the address group on login', async () => {
        form$.subscribe();
        store$.dispatch(
            userLoggedIn({
                userData: {
                    zipCode: '12345',
                    city: 'sewfefwef',
                    street: 'Abcdef',
                },
            })
        );
        expect(form$.value.get('address')?.prop('visible')).toEqual(false);
    });

    it('loads available cities from the api', async () => {
        form$.subscribe();
        form$.value.get('address.zipCode')?.setValue('12435');
        httpTestingControler
            .expectOne('https://api.zippopotam.us/de/12435')
            .flush(citiesMock('12435', ['Berlin', 'Foo']));
        console.log(form$.value.get('address.city')?.props);
        expect(form$.value.get('address.city')?.prop('options')).toEqual([
            'Berlin',
            'Foo',
        ]);
        httpTestingControler.verify();
    });

    it('disables cities/street when no cities are available', async () => {
        form$.subscribe();
        form$.value.get('address.zipCode')?.setValue('12435');
        httpTestingControler
            .expectOne('https://api.zippopotam.us/de/12435')
            .flush(citiesMock('12435', []));
        console.log(form$.value.get('address.city')?.props);
        expect(form$.value.get('address.city')?.enabled).toEqual(false);
        expect(form$.value.get('address.street')?.enabled).toEqual(false);
        httpTestingControler.verify();
    });

    it('enables cities/street when cities are available', async () => {
        form$.subscribe();
        form$.value.get('address.zipCode')?.setValue('12435');
        httpTestingControler
            .expectOne('https://api.zippopotam.us/de/12435')
            .flush(citiesMock('12435', ['B', 'E', 'R', 'L', 'I', 'N']));
        console.log(form$.value.get('address.city')?.props);
        expect(form$.value.get('address.city')?.enabled).toEqual(true);
        expect(form$.value.get('address.street')?.enabled).toEqual(true);
        httpTestingControler.verify();
    });
});
