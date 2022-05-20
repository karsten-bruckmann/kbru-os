import { MyFormBuilder } from './my.form-builder';
import { TestBed } from '@angular/core/testing';
import { ShowcasesFormsModule } from '../../../showcases-forms.module';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { StateService } from '../../state/state.service';

describe('MyFormBuilder', () => {
    let stateService: StateService;
    let httpTestingControler: HttpTestingController;

    let form$: MyFormBuilder['form'];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ShowcasesFormsModule, HttpClientTestingModule],
        });

        stateService = TestBed.inject(StateService);
        httpTestingControler = TestBed.inject(HttpTestingController);
        const builder = TestBed.inject(MyFormBuilder);
        form$ = builder.form;
    });

    it('returns a behaviour subject of the form', () => {
        expect(form$.subscribe).toBeTruthy();
        expect(form$.value).toBeTruthy();
    });

    it('shows the address group on logout', () => {
        form$.subscribe();
        stateService.data$.next({
            userData: null,
        });
        expect(form$.value.get('address')?.prop('visible')).toEqual(true);
    });

    it('hides the address group on login', async () => {
        form$.subscribe();
        stateService.data$.next({
            userData: {
                zipCode: '12345',
                city: 'sewfefwef',
                street: 'Abcdef',
            },
        });
        expect(form$.value.get('address')?.prop('visible')).toEqual(false);
    });

    it('loads available cities from the api', async () => {
        form$.subscribe();
        form$.value.get('address.zipCode')?.setValue('12435');
        httpTestingControler.expectOne('/some/api/path').flush(['Berlin']);
        expect(form$.value.get('address.city')?.prop('options')).toEqual([
            'Berlin',
        ]);
        httpTestingControler.verify();
    });
});
