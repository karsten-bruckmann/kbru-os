import {
    AsyncValidatorFn,
    FormControl,
    FormControlOptions,
    ValidatorFn,
} from '@angular/forms';
import { PropsAware } from './props-aware.type';

export class FormControlWithProps<T>
    extends FormControl
    implements PropsAware<T>
{
    constructor(
        public readonly props: T,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formState?: any,
        validatorOrOpts?:
            | ValidatorFn
            | ValidatorFn[]
            | FormControlOptions
            | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(formState, validatorOrOpts, asyncValidator);
    }

    public prop<K extends keyof T>(key: K): T[K] {
        return this.props[key];
    }

    public setProp<K extends keyof T>(key: K, value: T[K]): void {
        this.props[key] = value;
    }

    override get<K extends keyof T>(
        path: Array<string | number> | string | K
    ): FormControlWithProps<T> | null {
        return super.get(path as string) as FormControlWithProps<T> | null;
    }
}
