import { FormGroupWithProps } from './form-group-with-props';

describe('FormGroupWithProps', () => {
    it('has default prop', () => {
        const control = new FormGroupWithProps({ foo: 'bar' }, {});
        expect(control.prop('foo')).toEqual('bar');
    });

    it('sets prop', () => {
        const control = new FormGroupWithProps({ foo: 'bar' }, {});
        control.setProp('foo', '123');
        expect(control.prop('foo')).toEqual('123');
    });
});
