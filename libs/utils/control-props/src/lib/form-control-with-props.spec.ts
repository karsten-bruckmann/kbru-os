import { FormControlWithProps } from './form-control-with-props';

describe('FormControlWithProps', () => {
    it('has default prop', () => {
        const control = new FormControlWithProps({ foo: 'bar' });
        expect(control.prop('foo')).toEqual('bar');
    });

    it('sets prop', () => {
        const control = new FormControlWithProps({ foo: 'bar' });
        control.setProp('foo', '123');
        expect(control.prop('foo')).toEqual('123');
    });
});
