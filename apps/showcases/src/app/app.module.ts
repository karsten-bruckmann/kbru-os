import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'effect-aware-reactive-forms',
        loadChildren: () =>
          import('@kbru-os/showcases/effect-aware-reactive-forms').then(
            (m) => m.ShowcasesEffectAwareReactiveFormsModule
          ),
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
