import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { JadoreService } from '../../service/jadore.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ENV } from 'src/app/core/env.config';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  courseForm: FormGroup;
  dropdownList:any = [];
  selectedItems: any = [];
  isEdit: boolean = false;
  id: string = "";
  instructors: any = [];
  languages: any = [
    { label: "Français", value: 'FR' },
    { label: "Anglais", value: 'EN' },
  ];
  mediaTypes = [
    { label: "VIDEO", value: 'VIDEO' },
    { label: "AUDIO", value: 'AUDIO' },
    { label: "TEXT", value: 'TEXT' }
  ]
  dropdownSettings: IDropdownSettings = {};
  private selectedFile!: File;
  constructor(private formBuilder: FormBuilder, private service: JadoreService, private toastr: ToastrService, private router: Router) {
    this.courseForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      description: [null, [Validators.required]],
      pictureLink: [null, [Validators.required]],
      videolink: [null, [Validators.required]],
      cost: [null, [Validators.required]],
      discount: [null, [Validators.required]],
      durationWeeks: [null, [Validators.required]],
      language: [null, [Validators.required]],
      curriculums: this.formBuilder.array([this.newcurriculum()])

    });
  }

  



  get curriculums(): FormArray {
    return this.courseForm.get("curriculums") as FormArray;
  }

  reset() {
    this.courseForm.reset();
  }

  
  onFileSelect(event:any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile.name);
  }

  newcurriculum(): FormGroup {
    return this.formBuilder.group({
      id:[],
      title: [null, [Validators.required]],
      link: [null, [Validators.required]],
      mediaType: [null, [Validators.required]]

    })
  }

  addCurriculum() {
    this.curriculums.push(this.newcurriculum());
  }

  removeCurriculum(i: number) {
    this.curriculums.removeAt(i);
  }

  ngOnInit() {

    this.service.modalSate$.subscribe(data => {
      console.log('update data', data)
      this.id = data.id;
      if (data && data['id']) {
        this.isEdit = true;
        this.courseForm.setValue({
          title: data.title,
          startDate: data.startDate,
          endDate: data.endDate,
          description: data.description,
          pictureLink: data.pictureLink,
          videolink: data.videolink,
          cost: data.cost,
          discount: data.discount,
          durationWeeks: data.durationWeeks,
          language:data.language,
          curriculums: data.curriculums ? data.curriculums : this.newcurriculum()
        });
      }
    })

    this.service.get(`${ENV.API_HOST_1_URL}/instructors`).subscribe(data => {
      console.log('this.instructors', data)
      this.instructors = data.content;
      for (let instructor of this.instructors) {
        this.dropdownList.push({ item_id: instructor.id, item_text: instructor.firstName })

      }
      console.log('dropdown', this.dropdownList)
      this.dropdownSettings = {
        singleSelection: true,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };

    })


  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  create() {
    if (this.id && this.id != '') {
      this.updateCourse()
    } else {
      this.createCourse()
    }
  }

  createCourse() {
    let instObj = this.instructors.find((inst: any) => inst.id == this.selectedItems[0].item_id)
    let obj = {
      ... this.courseForm.getRawValue(),
      instructor: {
        id: this.selectedItems[0].item_id
      }
    }
    console.log('courseobj', obj);
    let url = `${ENV.API_HOST_1_URL}/course`;
    this.service.post(obj, url).subscribe(
      data => {
        this.reset()
        this.service.setRefresh(true);
        this.toastr.success('formation à bine été ajouté');
      },
      err => {
        console.log('err', err)
        this.toastr.error(err.error.message);
      },
      () => {
        console.log("Complete function triggered.")
      }
    );

  }
  updateCourse() {
    console.log('updateCourse', this.courseForm.getRawValue())

    let url = `${ENV.API_HOST_1_URL}/course`;
    let obj = {
      id: this.id,
      ...this.courseForm.getRawValue(),
      instructor:null
    }
    this.service.post(obj,url).subscribe(
      data => {
        this.reset()
        this.service.setRefresh(true);
        this.toastr.success('formation à bine été modifié');
      },
      err => {
        console.log('err', err)
        this.toastr.error(err.error.message);
      },
      () => {
        console.log("Complete function triggered.")
      }
    );

  }

}
