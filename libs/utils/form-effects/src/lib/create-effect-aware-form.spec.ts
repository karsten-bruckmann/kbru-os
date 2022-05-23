import { createEffectAwareForm } from './create-effect-aware-form';
import { cold } from 'jest-marbles';
import { FormGroup } from '@angular/forms';
import { firstValueFrom, NEVER } from 'rxjs';

describe('createEffectAwareForm', () => {
    it('merges all effects', () => {
        const effects = [cold('---|', {}), cold('---|', {})];
        const form$ = createEffectAwareForm(
            new FormGroup({}),
            effects.map((effect) => () => effect)
        );
        form$.subscribe();
        effects.forEach((effect) => expect(effect).toHaveSubscriptions('^--!'));
    });

    it("emits the form even though effects don't emit", async () => {
        const form = await firstValueFrom(
            createEffectAwareForm(new FormGroup({}), [() => NEVER])
        );
        expect(form).toBeTruthy();
    });
});
