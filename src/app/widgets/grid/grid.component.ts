import {
  Component,
  Input,
  ElementRef,
  Renderer2,
  AfterViewInit
} from "@angular/core";

@Component({
  selector: "grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"]
})
export class GridComponent implements OnInit, AfterViewInit {
  @Input() data: Array<Object>;
  @Input() options: any;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    //this.setDimenstions();
  }
  ngAfterViewInit() {
    this.setDefaultDimenstions();
  }

  private setDefaultDimenstions() {
    let parentWidth = this.elRef.nativeElement.parentElement.offsetWidth - 17;
    let columns = this.options.columns.length || 0;
    let columnsDefaultLength = Math.floor(parentWidth / columns);
    //set default width
    let headerItems: HTMLCollection = this.elRef.nativeElement.getElementsByClassName(
      "header-item"
    );
    for (let item of headerItems) {
      this.renderer.setStyle(item, "width", columnsDefaultLength + "px");
    }

    debugger;
  }
}
