import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Define and export the College interface
export interface College {
  id?: number;
  name: string;
  address: string;
  city: string;
  state: string;
}

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  private API = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public registerCollege(collegeData: College): Observable<College> {
    return this.http.post<College>(`${this.API}/college`, collegeData);
  }

  public getColleges(): Observable<College[]> {
    return this.http.get<College[]>(`${this.API}/college`);
  }

  public deleteCollege(collegeId: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/college/${collegeId}`);
  }

  public updateCollege(college: College): Observable<College> {
    if (!college.id) {
      throw new Error('College ID is required for updating');
    }
    return this.http.put<College>(`${this.API}/college/${college.id}`, college);
  }
}
