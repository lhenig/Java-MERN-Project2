import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
  })
export class AppService {
    
  authenticated = false;
  url: string = "http://localhost:8080/login";

  constructor(private http:HttpClient) {}
  
  authenticate(credentials: { name: any; password: any; }): Observable<HttpResponse<FormData>>{

        // Stores name for other components to use. Functions on other components only work if authenticated
        localStorage.setItem('name', credentials.name);
    
        // Format that backend receives login credentials
        const formData = new FormData();
        formData.append('username', credentials.name);
        formData.append('password', credentials.password);
        
        return this.http.post<FormData>(this.url, formData, {observe: 'response', withCredentials: true});
    }

}