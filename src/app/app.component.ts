import { Component, ChangeDetectionStrategy, OnInit, HostListener } from "@angular/core";
import { DataService } from "./services/data.service";
import { Observable } from "rxjs";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public companyData: any[];
  public viewHeight : Number = 0;

   @HostListener("window:resize", ["$event"])
  onResize(event) {
    console.log("app component resize");   
    this.viewHeight = window.innerHeight;
  }

  constructor(private dataService: DataService) {   
    this.viewHeight= window.innerHeight;
  }


  ngOnInit() {
    let observer = {
      next: data => {
        this.companyData = data;
        console.log("[AppComp] next() compete");
      },
      complete: () => {
        console.log("[AppComp] complete() compete");
      }
    };
    let obs = this.dataService.getAll();
    obs.subscribe(observer);
  }

  public tileOptions = {
    titleField: "first_name",
    descriptionField: "id",
    properties: [
      { field: "gender", displayName: "Gender" },
      { field: "email", displayName: "Email" },
      { field: "ip_address", displayName: "IP Address" }
    ]
  };

  public gridOptions = {
    columns: [
      { field: "gender", displayName: "Gender" },
      { field: "email", displayName: "Email" },
      { field: "ip_address", displayName: "IP Address" }
    ]
  };

  public addData() {
    console.log("add data");
    //this.companyData = [... this.companyData]
    this.companyData.push({ name: "rohit", city: "mumbai" });
  }
}
