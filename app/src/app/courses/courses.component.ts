import { Component } from '@angular/core';
import { JadoreService } from '../service/jadore.service';
import { Router } from '@angular/router';
import { ENV } from '../core/env.config';

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
  constructor(private service: JadoreService, private router: Router) { }

  ngOnInit() {
    this.getCourses()
  }

  getCourses(currentPage?: number, pageSize?: number) {
    this.service.get(`${ENV.API_HOST_1_URL}/courses?page=${currentPage}&size=5`).subscribe(data => {
      console.log('courses profile', data)
      this.courses = data.content;
      this.totalItems = data.totalElements

    })
  }

  gotoCourse(id:string) {
    this.router.navigate(['/course'], { state: { id: id } });
  }
  changePage(page: any) {
    console.log('$event', page)
    this.p = page;
    this.getCourses(page - 1, 5)
  }
}
