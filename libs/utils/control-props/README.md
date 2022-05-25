# @kbru/control-props

Extend Angular's reactive `FormGroups` and `FormControls` with custom properties.

Use Cases:

-   Mark a form field as visible/invisible instead of enabled/disabled without affecting the behaviour of the form.
-   Attach valid values to a control for the template to display them. Useful for `select`, `radio`, ...

## Installation

```shell
npm install @kbru/control-props
```

## Usage

```typescript
import { FormGroupWithProps } from '@kbru/control-props';
import { FormControlWithProps } from '@kbru/control-props';

interface Props {
    visible: boolean;
    options?: string[];
}

export class Component {
    form = new FormGroupWithProps<Props>(
        { visible: true },
        {
            field: new FormControlWithProps<Props>({ visible: false }),
            select: new FormControlWithProps<Props>({
                visible: true,
                options: ['Foo', 'Bar'],
            }),
        }
    );
}
```

```html
<form *ngIf="form.prop('visible')" [formGroup]="form">
    <input *ngIf="form.get('field').prop('visible')" formControlName="form" />

    <select *ngIf="form.get('select').prop('visible')" formControlName="form">
        <ng-container *ngIf="form.get('select').prop('options') as options">
            <option *ngFor="let option of options">{{ option }}</option>
        </ng-container>
    </select>
</form>
```
