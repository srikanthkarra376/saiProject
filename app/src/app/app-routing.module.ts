import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'course', component: CourseComponent },
  { path: 'courses', component: CoursesComponent },
  { path: "bo", loadChildren: () => import('./bo/bo.module').then(m => m.BoModule) },
  { path: "secure", loadChildren: () => import('./stripe/stripe.module').then(m => m.StripeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
