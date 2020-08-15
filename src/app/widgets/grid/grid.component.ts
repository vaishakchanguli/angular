import {
  Component,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
  DoCheck
} from "@angular/core";

@Component({
  selector: "grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"]
})
export class GridComponent
  implements OnInit, AfterViewInit, AfterViewChecked, DoCheck {

  private firstLoad = true;

  @Input() data: Array<Object>;
  @Input() options: any;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log("grid resize");
    this.firstLoad = false;
    this.setDefaultDimenstions();
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    console.log("grid onInit");
  }
  ngDoCheck() {
    console.log("grid doCheck");
  }
  ngAfterViewInit() {
    console.log("grid viewInit");  
  }
  ngAfterViewChecked() {
    console.log("grid viewChecked");
    if (this.firstLoad) {  
      this.setDefaultDimenstions();      
    }
  }

  private setDefaultDimenstions() {
    let hasVerticalScrollbar = this.elRef.nativeElement.scrollHeight > this.elRef.nativeElement.clientHeight;
    let parentWidth = this.elRef.nativeElement.parentElement.offsetWidth;
    let columns = this.options.columns.length || 0;
    let columnsDefaultLength = Math.floor(parentWidth / columns);

    //set default header item width
    let headerItems: HTMLCollection = this.elRef.nativeElement.getElementsByClassName(
      "header-item"
    );
    for (let item of headerItems) {
      this.renderer.setStyle(item, "width", columnsDefaultLength + "px");
    }

    //set default row item width
    let rowItems: HTMLCollection = this.elRef.nativeElement.getElementsByClassName(
      "row-item"
    );
    if (rowItems.length) {
      for (let item of rowItems) {
        this.renderer.setStyle(item, "width", columnsDefaultLength + "px");
      }
    }
  }
}
