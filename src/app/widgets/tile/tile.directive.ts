import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  HostListener
} from "@angular/core";

@Component({
  selector: "tile",
  styleUrls: ["./tile.directive.css"],
  templateUrl: "./tile.directive.html"
})
export class TileComponent implements OnInit, OnChanges, DoCheck {
  private hasVerticalScroll: Boolean = false;
  private TILE_HEIGHT: Number = 115;
  
  @Input() tiles: Array<Object>;
  @Input() tileOptions: Object;
  @ViewChild("tileRef", { static: false }) tileRef: ElementRef;
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    console.log("tile resize");
    this.setContainerWidth();
  }

  constructor() {}

  ngOnInit() {
    this.setDefaultOptions();
    console.log(`child on init called`);
  }

  ngOnChanges(change: SimpleChanges) {
    console.log(change);
    console.log(`child on change called`);
  }
  ngDoCheck() {
    console.log(`child do check called`);
  }

  ngAfterViewinit() {
    this.setContainerWidth();
    this.loadDataToView();
  }

  private setContainerWidth() {
    this.hasVerticalScroll =
      this.tileRef.nativeElement.scrollHeight >
      this.tileRef.nativeElement.clientHeight;
  }

  private loadDataToView() {
    this.tileRef.nativeElement.clientHeight;
  }

  private setDefaultOptions() {
    if (!this.tileOptions.hasOwnProperty("titleField")) {
      this.tileOptions["titleField"] = "title";
    }
    if (!this.tileOptions.hasOwnProperty("descriptionField")) {
      this.tileOptions["descriptionField"] = "description";
    }
  }
}
