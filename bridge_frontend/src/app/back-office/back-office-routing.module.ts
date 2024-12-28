import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeComponent } from './back-office.component';
import { ListCoursesComponent } from './list-courses/list-courses.component';
import { CourseFormComponent } from './course-form/course-form.component';

const routes: Routes = [{ path: '', component: BackOfficeComponent, children:[
  {path:'', redirectTo:'courses', pathMatch:'full'},
  { path: 'courses', component: ListCoursesComponent },
  { path: 'courses/new', component: CourseFormComponent }, // Add new course
  { path: 'courses/edit/:id', component: CourseFormComponent }, // edit course
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
