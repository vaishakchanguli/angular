import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { DataService } from "./services/data.service";
import { Observable } from "rxjs";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public companyData: any[];
  constructor(private dataService: DataService) {}

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

  public options = {
    titleField: "first_name",
    descriptionField: "id",
    properties: [
      {field: "gender",displayName: "Gender"},
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
