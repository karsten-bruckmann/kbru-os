import {
    AbstractControlOptions,
    AsyncValidatorFn,
    FormGroup,
    ValidatorFn,
} from '@angular/forms';
import { FormControlWithProps } from './form-control-with-props';
import { PropsAware } from './props-aware.type';

export class FormGroupWithProps<T> extends FormGroup implements PropsAware<T> {
    constructor(
        private props: T,
        controls: {
            [p: string]: FormGroupWithProps<T> | FormControlWithProps<T>;
        },
        validatorOrOpts?:
            | ValidatorFn
            | ValidatorFn[]
            | AbstractControlOptions
            | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(controls, validatorOrOpts, asyncValidator);
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
