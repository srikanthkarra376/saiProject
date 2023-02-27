import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CustomValidators, CustomValidatorsPassword } from './custom-validators';
import { JadoreService } from '../../service/jadore.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ENV } from '../../core/env.config'
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-add-instructor',
  templateUrl: './add-instructor.component.html',
  styleUrls: ['./add-instructor.component.css']
})
export class AddInstructorComponent {
  signUpForm: FormGroup;
  show_button: boolean = false;
  disPlayErrors: boolean = false;
  show_eye: boolean = false;
  dropdownList: any = [];
  selectedItems: any = [];
  id: string = '';
  isEdit: boolean = false;
  password: string='';
  roles: Array<Object> = [
    { label: "User", value: "ROLE_USER" },
    { label: "Conent editor", value: "ROLE_CONTENT_EDITOR" },
    { label: "Tutor", value: "ROLE_TUTOR" },
    { label: "Admin", value: "ROLE_ADMIN" }
  ]
  dropdownSettings: IDropdownSettings = {};
  constructor(private formBuilder: FormBuilder, private service: JadoreService, private toastr: ToastrService, private router: Router) {
    this.signUpForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      password: [null, Validators.compose([Validators.required,
      CustomValidators.patternValidator(/\d/, { hasNumber: true }),
      CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
      Validators.minLength(8)])],
      confirmPassword: [null],
      userName: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.email, Validators.pattern('^(?:\s)?[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,}(?:\s)?$')]],
      designation: [null, [Validators.required]],
      bio: [null, [Validators.required]],
      profilePictureLink: [null, [Validators.required]],
    }, {
      validators: [CustomValidatorsPassword.match('password', 'confirmPassword')]
    });
  }
  get fields_signUp_form(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }
  onPasswordChange() {
    if (this.signUpForm.get('confirmPassword')?.value == this.signUpForm.get('password')?.value) {
      this.signUpForm.get('confirmPassword')?.setErrors(null);
    } else {
      this.signUpForm.get('confirmPassword')?.setErrors({ mismatch: true });
    }
    console.log(this.signUpForm.errors)
  }
  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }

  create() {
    if (this.id && this.id != '') {
      this.updateInstructor()
    } else {
      this.createInstructor()
    }

  }

  updateInstructor() {
    console.log('updateCourse', this.signUpForm.getRawValue())
    let roles = this.selectedItems.map((role: { value: any; }): any => role.value)
    let url = `${ENV.API_HOST_1_URL}/instructor`;
    let obj = {
      id: this.id,
      firstName: this.signUpForm.get('firstName')?.value,
      lastName: this.signUpForm.get('lastName')?.value,
      password: this.password,
      username: this.signUpForm.get('userName')?.value,
      email: this.signUpForm.get('email')?.value,
      designation: this.signUpForm.get('designation')?.value,
      bio: this.signUpForm.get('bio')?.value,
      profilePictureLink: this.signUpForm.get('profilePictureLink')?.value,
      roles: [...roles]

    }
    this.service.post(obj, url).subscribe(
      data => {
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

  createInstructor() {
    let roles = this.selectedItems.map((role: { value: any; }):any=>role.value)
    let obj = {
      firstName: this.signUpForm.get('firstName')?.value,
      lastName: this.signUpForm.get('lastName')?.value,
      password: this.signUpForm.get('password')?.value,
      username: this.signUpForm.get('userName')?.value,
      email: this.signUpForm.get('email')?.value,
      designation: this.signUpForm.get('designation')?.value,
      bio: this.signUpForm.get('bio')?.value,
      profilePictureLink: this.signUpForm.get('profilePictureLink')?.value,
      roles: [...roles]

    }
    let url = `${ENV.API_HOST_1_URL}/instructor`;
    this.service.post(obj, url).subscribe(
      data => {
        this.service.setRefreshInstructorData(true);
        this.toastr.success('votre compte a été créé avec succès');
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
  reset() {
    this.signUpForm.reset();
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  ngOnInit() {
    this.service.modalSateInstructor$.subscribe(data => {
      console.log('instructor to edit',data)

      if (data && data['id']) {
        this.id = data.id;
        this.isEdit = true;
        this.password =  data.password
        this.signUpForm.removeControl('password');
        this.signUpForm.removeControl('confirmPassword');
        this.signUpForm.setValue({
          firstName: data.firstName,
          lastName: data.lastName,
          userName: data.username,
          email: data.email,
          designation: data.designation,
          bio:data.bio,
          profilePictureLink: data.profilePictureLink
        });
      }
    })
    this.dropdownList = [
      { label: "User", value: "user" },
      { label: "Conent editor", value: "editor" },
      { label: "Tutor", value: "tutor" },
      { label: "Admin", value: "admin" }
    ]
    this.selectedItems = [
      { label: "User", value: "user" },
      { label: "Tutor", value: "tutor" },
    ]
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'value',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };

  }


}
