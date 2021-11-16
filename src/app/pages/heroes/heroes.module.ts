import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroFormDialogComponent } from './components/hero-form-dialog/hero-form-dialog.component';
import { HeroesComponent } from './heroes.component';
import { ShareModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  imports: [
    ShareModule,
    HeroesRoutingModule,
    CommonModule,
  ],
  declarations: [
    HeroesComponent,
    HeroFormDialogComponent,
  ],
})
export class HeroesModule { }
