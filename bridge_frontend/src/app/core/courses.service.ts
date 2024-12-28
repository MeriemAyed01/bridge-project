import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from './models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = `${environment.API_URL}/courses`;
  constructor(private http:HttpClient) { }

  getAllCourses(): Observable<Course[]> {
    console.log(this.apiUrl);
    return this.http.get<Course[]>(this.apiUrl);
  }

  // Get course by ID
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  // Create a new course
  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  // Update an existing course
  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  // Delete a course
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }





}
