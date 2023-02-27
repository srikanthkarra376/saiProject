import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, } from '@angular/forms';
import { BoRoutingModule } from './bo-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { JadoreService } from '../service/jadore.service';

import { PopoverModule } from 'ngx-bootstrap/popover';
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesComponent } from './courses/courses.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { InstructorsComponent } from './instructors/instructors.component';
import { AddInstructorComponent } from './add-instructor/add-instructor.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CmsComponent } from './cms/cms.component';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    ProfileComponent,
    AddCourseComponent,
    CoursesComponent,
    InstructorsComponent,
    AddInstructorComponent,
    CmsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BoRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    PopoverModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbPaginationModule, NgbAlertModule

  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    JadoreService
  ],
})
export class BoModule { }
