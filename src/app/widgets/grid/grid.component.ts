import {Component, Input} from '@angular/core'

@Component({
selector: 'grid', 
templateUrl: './grid.component.html',
styleUrls:['./grid.component.css']
})
export class GridComponent{
@Input() data:any[];
@Input() options:any;  

constructor(){}
}
