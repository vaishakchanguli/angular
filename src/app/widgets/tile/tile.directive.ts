import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "tile",
  styleUrls: ["./tile.directive.css"],
  templateUrl: "./tile.directive.html"
})
export class TileComponent implements OnInit, OnChanges, DoCheck {
  @Input() tiles: Array<Object>;
  @Input() tileOptions: Object;

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

  private setDefaultOptions() {
    if (!this.tileOptions.hasOwnProperty("titleField")) {
      this.tileOptions["titleField"] = "title";
    }
    if (!this.tileOptions.hasOwnProperty("descriptionField")) {
      this.tileOptions["descriptionField"] = "description";
    }
  }
}
