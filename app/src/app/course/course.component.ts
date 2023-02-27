import { Component } from '@angular/core';
import { JadoreService } from '../service/jadore.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ENV } from '../core/env.config';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {

  course: any = {};
  constructor(private router: Router, private service: JadoreService,  private toastr: ToastrService) {
    let extras = this.router.getCurrentNavigation()?.extras?.state;
    let url = `${ENV.API_HOST_1_URL}/course/${extras?.['id']}`;
    console.log('id', url);
    this.service.get(url).subscribe(data => {
      console.log('course', data);
      this.course = data
    });
  }

}
