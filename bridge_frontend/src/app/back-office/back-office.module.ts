import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { BackOfficeComponent } from './back-office.component';
import { ListCoursesComponent } from './list-courses/list-courses.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BackOfficeComponent,
    ListCoursesComponent,
    CourseFormComponent
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
        ReactiveFormsModule
    
  ]
})
export class BackOfficeModule { }
