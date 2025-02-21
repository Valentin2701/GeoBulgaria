import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapMainComponent } from './pages/map-main/map-main.component';
import { MapRegionComponent } from './pages/map-region/map-region.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MapMainComponent,
    MapRegionComponent
  ],
})
export class MapModule { }
