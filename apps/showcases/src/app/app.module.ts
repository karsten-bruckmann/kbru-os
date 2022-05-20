import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot([
            {
                path: 'forms',
                loadChildren: () =>
                    import('@kbru/showcases-forms').then(
                        (m) => m.ShowcasesFormsModule
                    ),
            },
        ]),
        StoreModule.forRoot({}),
        StoreDevtoolsModule.instrument({ maxAge: 50 }),
        EffectsModule.forRoot([]),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
