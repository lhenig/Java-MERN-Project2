import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plan } from '../models/plan.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  url: string = environment.apiUrl+"/plans"; //dunno yet
  constructor(private http: HttpClient) { }

  findAllPlans(): Observable<HttpResponse<Plan[]>> {
    return this.http.get<Plan[]>(this.url + "/authed", {observe: 'response', withCredentials: true});
  }

  //THIS NEEDS TWEAKING, NEEDS NEW ROUTES ON BACKEND
  findPlansByUser(userId: number): Observable<HttpResponse<Plan[]>> {
    return this.http.get<Plan[]>(this.url + `/${userId}`, {observe: 'response', withCredentials: true});
  }

  findPlanById(planId: number): Observable<HttpResponse<Plan>> {
    return this.http.get<Plan>(this.url + `/plan/${planId}`, {observe: 'response', withCredentials: true});
  }

  findLatestPlan(): Observable<HttpResponse<Plan>> {
    return this.http.get<Plan>(this.url + `/latestplan`, {observe: 'response', withCredentials: true});
  }

  //might not need all CRUD for plans
  savePlan(plan: Plan): Observable<HttpResponse<Plan>> {
    return this.http.post<Plan>(this.url + "/newplan", plan, {observe: 'response', withCredentials: true});
  }

  updatePlan(plan: Plan): Observable<HttpResponse<Plan>> {
    return this.http.put<Plan>(this.url + `/update/${plan.id}`, plan, {observe: 'response', withCredentials: true});
  }

  deletePlan(id: number): Observable<HttpResponse<Plan>> {
    return this.http.delete<Plan>(this.url + '/' + id, {observe: 'response', withCredentials: true});
  }

}
