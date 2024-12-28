import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/core/courses.service';
import { Course } from 'src/app/core/models/course';
import * as bootstrap from 'bootstrap';
import { ImageHelperService } from 'src/app/core/services/image-helper.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ListCourses:Course[]=[];
  selectedCourse: any = null;

  constructor(private coursesService:CoursesService,private imageHelperService: ImageHelperService){}


  ngOnInit(): void {
    this.loadCourses();
  }


  loadCourses(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (data) => {
        console.log('Courses loaded:', data);
        this.ListCourses = data;
      },
      error: (error) => {
        console.error('Error occurred while loading courses:', error);
      },
    });
  }
  
  openModal(course: any): void {
    this.selectedCourse = course;
    const modal = new bootstrap.Modal(document.getElementById('descriptionModal')!);
    modal.show();
  }

  onImageError(event: Event): void {
    this.imageHelperService.handleImageError(event);
  }
}
