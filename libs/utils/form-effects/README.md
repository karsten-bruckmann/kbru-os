# utils-form-effects

This library resulted from the wish to get the logic of complex forms out of the components. The goal is to have a Reactive Form, that can be tested without any components involved.

A standard reactive form can be converted into an Observable, providing effects ()

# Installation

```bash
npm install @kbru-os/utils-form-effects
```

# Usage

## Create Form Effects

A `FormEffect` is just a function getting the `FormGroup` that returns an `Observable<void>`. The Effect can then interact with the form (or other data sources).

**Example**

```typescript
const setInitialValueEffect: FormEffect<FormGroup> = (form) => {
    form.setValue(state$.value);
    return EMPTY;
};

let state$ = new BehaviourSubject<any>(null);

const saveOnChangeEffectA: FormEffect<FormGroup> = (form) =>
    form.valueChanges.pipe(
        map((value) => {
            state.next(value);
        })
    );

// or

const saveOnChangeEffectB =
    (state$: BehaviourSubject<any>): FormEffect<FormGroup> =>
    (form) =>
        form.valueChanges.pipe(
            map((value) => {
                state.next(value);
            })
        );
```

_**Tipp**: Use `map` instead of `tap` inside the pipe to also make the `Observable` `void`._

**Attention: Be sure not to create infinite Loops** with your Effects ;) If you create an effect based on the valueChanges of a form and set the values inside the effect, this is easily done!

## Attach Effects to the `FormGroup`

For the effects to run they need to be attached to the `FormGroup`. Use `createEffectAwareForm` (which will return a`BehaviourSubject<FormGroup>`).

**Example**

```typescript
const form = new FormGroup({
    /* ... */
});
const form$ = createEffectAwareForm(form, [effects]);
```

## Subscribing to the form

For the effects to be run, the form returned by `createEffectAwareForm` needs to be subscribed. This can easily be done using the `async`-Pipe inside the Template:

**Example**

```html
<form *ngIf="form$ | async as form" [formControl]="form">
    <input formControlName="foo" />
</form>
```

## Integration Tests for a form

See [Showcase](https://github.com/karsten-bruckmann/kbru-os/tree/main/libs/showcases/utils-form-effects/src/lib/core/form-builders/my-form/my.form-builder.spec.ts) for an example

## Using custom properties

Sometimes it's quite useful to have custom properties on a control. Example use cases:

-   Flag a control a hidden for the component to know that it should not be shown
-   Provide possible options for a select
-   ...

You can use `FormControlWithProps` or `FormGroupWithProps` for that. Either in addition to effects, or without them.

**Example:**

```typescript
const form = new FormGroupWithProps<{ visible: boolean }>(
    { visible: true },
    {
        foo: new FormControlWithProps({ visible: true }, ''),
    }
);
```

```html
<form [formControl]="form" *ngIf="form.prop('visible')">
    <input formControlName="foo" *ngIf="form.get('foo')?.prop('visible')" />
</form>
```
