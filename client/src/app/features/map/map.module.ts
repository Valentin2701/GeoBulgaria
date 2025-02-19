import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapMainComponent } from './pages/map-main/map-main.component';
import { RegionInfoComponent } from './pages/region-info/region-info.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MapMainComponent,
    RegionInfoComponent
  ],
})
export class MapModule { }
