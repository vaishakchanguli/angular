import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './services/data.service';

import { AppComponent } from './app.component';
import { TileComponent } from './widgets/tile/tile.directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule ],
  declarations: [ AppComponent, TileComponent ],
  providers:[DataService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { 
  

}
