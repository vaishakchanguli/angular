import {Component, Input, ElementRef, Renderer2, AfterViewInit} from '@angular/core'

@Component({
selector: 'grid', 
templateUrl: './grid.component.html',
styleUrls:['./grid.component.css']
})
export class GridComponent implements OnInit, AfterViewInit{
@Input() data:Array<Object>;
@Input() options:any;

constructor(private elRef: ElementRef, private rendered: Renderer2){}

ngOnInit(){
    //this.setDimenstions();
}
 ngAfterViewInit() {
     this.setDimenstions();
  }
private setDimenstions(){
let parentWidth = this.elRef.nativeElement.parentElement.offsetWidth;
let columns = 
this.rendered;
debugger;
}

}
