import {
  Component,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
  DoCheck,
  ViewChild
} from "@angular/core";

@Component({
  selector: "grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"]
})
export class GridComponent implements DoCheck {
  private firstLoad = true;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @Input() data: Array<Object>;
  @Input() options: any;
  @ViewChild("gridRef", { static: false }) gridRef: ElementRef;
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    console.log("grid resize");
    this.firstLoad = false;
    this.setDefaultDimenstions();
  }

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
    let parentWidth =0;
    let SCROLL_BAR = 17;
    let hasVerticalScrollbar = this.gridRef.nativeElement.scrollHeight > this.gridRef.nativeElement.clientHeight;
    if (hasVerticalScrollbar) {
       parentWidth =this.elRef.nativeElement.parentElement.offsetWidth - SCROLL_BAR;
    } else {
       parentWidth = this.elRef.nativeElement.parentElement.offsetWidth;
    }

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
