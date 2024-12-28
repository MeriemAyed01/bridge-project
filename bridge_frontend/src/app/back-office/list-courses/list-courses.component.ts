import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/core/courses.service';
import { Course } from 'src/app/core/models/course';
import { ImageHelperService } from 'src/app/core/services/image-helper.service';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css'],
})
export class ListCoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private coursesService: CoursesService, private router: Router,private imageHelperService: ImageHelperService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (data) => (this.courses = data),
      error: (err) => console.error('Error fetching courses:', err),
    });
  }

  editCourse(id: number): void {
    this.router.navigate(['/admin/courses/edit', id]);
  }

  deleteCourse(id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.coursesService.deleteCourse(id).subscribe({
        next: () => this.loadCourses(),
        error: (err) => console.error('Error deleting course:', err),
      });
    }
  }

  onImageError(event: Event): void {
    this.imageHelperService.handleImageError(event);
  }
}
