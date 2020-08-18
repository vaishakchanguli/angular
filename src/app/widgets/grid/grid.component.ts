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
  @ViewChild("headRef", { static: false }) headRef: ElementRef;
  @ViewChild("bodyRef", { static: false }) bodyRef: ElementRef;
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    console.log("grid resize");
    this.firstLoad = false;
    let parentDimension = this.getParentDimension(
      this.elRef.nativeElement.parentElement
    );
    this.setDefaultDimensions(parentDimension);
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
      let parentDimension = this.getParentDimension(
        this.elRef.nativeElement.parentElement
      );
      this.setDefaultDimensions(parentDimension);
    }
  }

  private setDefaultDimensions(parentDimension) {
    let parentWidth = parentDimension.width;
    let parentHeight = parentDimension.height;
    let SCROLL_BAR = 17;
    let hasVerticalScrollbar =
      this.bodyRef.nativeElement.scrollHeight >
      this.bodyRef.nativeElement.clientHeight;
    if (hasVerticalScrollbar) {
      parentWidth = parentWidth - SCROLL_BAR;
    }

    let columns = this.options.columns.length || 0;
    let columnsDefaultLength = Math.floor(parentWidth / columns);

    //set grid width
    this.renderer.setStyle(
      this.gridRef.nativeElement,
      'width',
      parentDimension.width + "px"
    );

    //set grid body height
    let headerHeight = this.headRef.nativeElement.offsetHeight;
    let bodyHeight = parentDimension.height - headerHeight;
    this.renderer.setStyle(
      this.bodyRef.nativeElement,
      'height',
     bodyHeight + "px"
    );

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

  private getParentDimension(element) {
    let computedStyle = window.getComputedStyle(element);
    let paddingX =
      parseFloat(computedStyle.paddingLeft) +
      parseFloat(computedStyle.paddingRight);
    let paddingY =
      parseFloat(computedStyle.paddingTop) +
      parseFloat(computedStyle.paddingBottom);

    let borderX =
      parseFloat(computedStyle.borderLeftWidth) +
      parseFloat(computedStyle.borderRightWidth);
    let borderY =
      parseFloat(computedStyle.borderTopWidth) +
      parseFloat(computedStyle.borderBottomWidth);

    // Element width and height minus padding and border
    return {
      width: element.offsetWidth - paddingX - borderX,
      height: element.offsetHeight - paddingY - borderY
    };
  }
}
