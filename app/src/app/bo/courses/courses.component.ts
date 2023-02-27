import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ENV } from 'src/app/core/env.config';
import { JadoreService } from 'src/app/service/jadore.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  courses: any = [];
  p: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 5;

  constructor(private service: JadoreService, private router: Router, private toastr: ToastrService,) { }

  ngOnInit() {
    this.getCourses()
    this.service.refreshData$.subscribe(state => {
      if (state == true) {
        this.getCourses();
      }
    })
  }

  getCourses(currentPage?: number,pageSize?:number) {
    this.service.get(`${ENV.API_HOST_1_URL}/courses?page=${currentPage}&size=5`).subscribe(data => {
      console.log('courses profile', data)
      this.courses = data.content;
      this.totalItems = data.totalElements

    })
  }

  gotoCourse(id: string) {
    this.router.navigate(['/course'], { state: { id: id } });
  }
  editCourse(course:any) {
    this.service.toggleModal(course);

 }
  delete(id: string) {
    this.service.delete(`${ENV.API_HOST_1_URL}/courses/${id}`).subscribe(data => {
      console.log('courses delete', data)
      this.toastr.success('formation à bien été supprimé');
      this.getCourses();
      this.courses = this.courses.filter((course: { id: string; }):any=>course.id!==id)
    })
  }

  changePage(page:any) {
    console.log('$event', page)
    this.p = page;
    this.getCourses(page-1,5)
  }
}
