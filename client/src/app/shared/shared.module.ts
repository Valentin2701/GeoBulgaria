import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavComponent,
    FooterComponent
  ],
  exports: [NavComponent, FooterComponent]
})
export class SharedModule { }
