import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './presentation/main/main.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: MainComponent,
            },
        ]),
    ],
    declarations: [MainComponent],
})
export class ShowcasesFormsModule {}
