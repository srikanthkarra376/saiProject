import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JadoreService } from '../../service/jadore.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Slider } from '../models/slider';
import { ENV } from 'src/app/core/env.config';
import { Feature } from '../models/feature';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css']
})
export class CmsComponent {

  sliderForm: FormGroup;
  features: Array<Feature> = [];
  featureForm: FormGroup;
  sliders: Array<Slider> = [];
  idSlider: string | undefined = '';
  constructor(private formBuilder: FormBuilder, private service: JadoreService, private toastr: ToastrService, private router: Router) {
    this.sliderForm = this.formBuilder.group({
      mainText: [null, [Validators.required]],
      description: [null, [Validators.required]],
      imageLink: [null, [Validators.required]],
      buttonText: [null, [Validators.required]],
      buttonLink: [null, [Validators.required]],
    });

    this.featureForm = this.formBuilder.group({
      mainTextA: [null, [Validators.required]],
      descriptionA: [null, [Validators.required]],
      buttonTextA: [null, [Validators.required]],
      buttonLinkA: [null, [Validators.required]],
      mainTextB: [null, [Validators.required]],
      descriptionB: [null, [Validators.required]],
      buttonTextB: [null, [Validators.required]],
      buttonLinkB: [null, [Validators.required]],
      mainTextC: [null, [Validators.required]],
      descriptionC: [null, [Validators.required]],
      buttonTextC: [null, [Validators.required]],
      buttonLinkC: [null, [Validators.required]]
    })
  }
  ngOnInit() {
    this.getSliders();
    this.getFeatures();
  }


  updateFeatureSection() {
    let obj = { ...this.featureForm.getRawValue(), id: this.features[0].id };
    this.service.post(obj, `${ENV.API_HOST_3_URL}/feature`).subscribe(data => {
      this.toastr.success('Features à bine été modifié');
      this.getFeatures();
    })
  }

 getSliders() {
   this.service.get(`${ENV.API_HOST_2_URL}/sliders`).subscribe(data => {
      this.sliders = data.content
    })
 }
  sendData(obj:object) {
    this.service.post(obj, `${ENV.API_HOST_2_URL}/slider`).subscribe(data => {
      this.getSliders();
    })
  }
  create() {
    if (this.idSlider != '') {
      let obj  = { ...this.sliderForm.getRawValue(), id:this.idSlider}
      this.sendData(obj);
      this.toastr.success('Slider à bine été modifié');
    } else {
      let obj = this.sliderForm.getRawValue()
      this.sendData(obj);
      this.toastr.success('Slider à bine été ajouté');
    }

  }

  getFeatures() {
    this.service.get(`${ENV.API_HOST_3_URL}/features`).subscribe(data => {
      this.features = data.content;
      this.featureForm.setValue({
        mainTextA: data.content[0].mainTextA,
        descriptionA: data.content[0].descriptionA,
        buttonTextA: data.content[0].buttonTextA,
        buttonLinkA: data.content[0].buttonLinkA,
        mainTextB: data.content[0].mainTextB,
        descriptionB: data.content[0].descriptionB,
        buttonTextB: data.content[0].buttonTextB,
        buttonLinkB: data.content[0].buttonLinkB,
        mainTextC: data.content[0].mainTextC,
        descriptionC: data.content[0].descriptionC,
        buttonTextC: data.content[0].buttonTextC,
        buttonLinkC: data.content[0].buttonLinkC
      })
    })

  }

  delete(id: string | undefined, type:string) {
    this.service.delete(`${ENV.API_HOST_2_URL}/slider/${id}`).subscribe(data => {
      this.sliders = this.sliders.filter(slider => slider.id != id);
      this.toastr.success('Slider à bine été supprimé');
    })

  }
  reset() {
    this.sliderForm.reset()
  }
  edit(slider: Slider) {
    this.idSlider= slider?.id
    console.log('id');
    this.sliderForm.setValue({
      mainText: slider.mainText,
      description: slider.description,
      imageLink: slider.imageLink,
      buttonText: slider.buttonText,
      buttonLink: slider.buttonLink,
    })
  }
}
