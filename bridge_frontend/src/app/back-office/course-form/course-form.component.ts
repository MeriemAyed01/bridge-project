import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/core/courses.service';
import { UploadService } from 'src/app/core/services/upload.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private uploadService: UploadService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form with validations
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]], // Required with minimum length
      description: [''], // Required field
      price: [0, [Validators.required, Validators.min(1)]], // Required with minimum value
      imageUrl: [''], // Will be set dynamically
    });

    // Check if editing an existing course
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.coursesService.getCourseById(id).subscribe({
        next: (data: { [key: string]: any; }) => {
          this.courseForm.patchValue(data); // Populate the form with existing data
        },
        error: (err: any) => console.error('Error fetching course:', err),
      });
    }
  }

  // Handle file selection for the image
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Save or update the course
  saveCourse(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched(); // Highlight invalid fields
      return;
    }

    if (this.selectedFile) {
      // If a file is selected, upload the image first
      this.uploadService.uploadImage(this.selectedFile).subscribe({
        next: (uploadedImageUrl) => {
          console.log('Image uploaded successfully:', uploadedImageUrl);
          this.courseForm.get('imageUrl')?.setValue(uploadedImageUrl); // Set the uploaded image URL
          this.saveOrUpdateCourse(); // Proceed to save or update the course
        },
        error: (err) => {
          console.error('Error uploading image:', err);
          alert('Failed to upload image. Please try again.');
        },
      });
    } else {
      // If no file is selected, directly save or update the course
      this.saveOrUpdateCourse();
    }
  }

  private saveOrUpdateCourse(): void {
    const courseData = this.courseForm.value; // Get form data
    console.log('Submitting course data:', courseData); // Debugging

    // Check if updating or creating a new course
    if (this.route.snapshot.params['id']) {
      this.coursesService.updateCourse(this.route.snapshot.params['id'], courseData).subscribe({
        next: () => {
          console.log('Course updated successfully!');
          this.router.navigate(['/admin/courses']);
        },
        error: (err: any) => console.error('Error updating course:', err),
      });
    } else {
      this.coursesService.createCourse(courseData).subscribe({
        next: () => {
          console.log('Course created successfully!');
          this.router.navigate(['/admin/courses']);
        },
        error: (err: any) => console.error('Error creating course:', err),
      });
    }
  }
}
