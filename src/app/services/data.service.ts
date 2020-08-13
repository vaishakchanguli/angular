import { Injectable } from "@angular/core";
import { HttpRequest, HttpClient, HttpResponse } from "@angular/common/http";
import {Observable} from 'rxjs/Rx';
import { catchError } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import People_Info from './People.json';


interface IPeople{
  id:string,
  user_name:string,
  department:string,
  company_name:string,
  money:string,
  currency_code:string,
  credit_card:string,
  city:string,
  country:string,
}


@Injectable()
export class DataService {
  private http;
  constructor(http: HttpClient) {
    this.http = http;
  }

  public getAll() {      
       return new Observable((observer)=>{
        observer.next(People_Info);         
         observer.complete();
       }).pipe(delay(1000));
  }

  public getPageData(){

  }
}
