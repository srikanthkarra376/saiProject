import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ENV } from 'src/app/core/env.config';
import { JadoreService } from 'src/app/service/jadore.service';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent {
  courses: any = [];
  instructors: any = [];

  constructor(private service: JadoreService, private router: Router, private toastr: ToastrService,) { }

  ngOnInit() {
    this.getInstructors()
    this.service.refreshInstructorData$.subscribe(state => {
      if (state == true) {
        this.getInstructors();
      }
    })
  }

  getInstructors() {
    this.service.get(`${ENV.API_HOST_1_URL}/instructors`).subscribe(data => {
      console.log('this.instructors', data)
      this.instructors = data.content;
    })
  }

  gotoCourse(id: string) {
    this.router.navigate(['/course'], { state: { id: id } });
  }
  editInstructor(course: any) {
    this.service.toggleInstructorModal(course);

  }
  delete(id: string) {
    this.service.delete(`${ENV.API_HOST_1_URL}/instructor/${id}`).subscribe(data => {
      console.log('instructor delete', data)
      this.toastr.success('Enseignant à bien été supprimé');
      this.instructors = this.instructors.filter((course: { id: string; }): any => course.id !== id)
    })
  }
}
