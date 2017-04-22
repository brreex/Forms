import { Component } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import {PostService} from '../post.service';
@Component({
  selector: 'dataform',
  template: `
  <form [formGroup]="myForm" (ngSubmit)="submitForm(myForm)">
    
    <label for="name" >Name</label><br>
    <input name= "name" type="text" [formControl]="myForm.controls['name']" #name /><br>
    <div *ngIf="!myForm.controls['name'].valid">Required</div>
    
    <label for="email" >Email</label><br>
    <input name="email" type="text" [formControl]="myForm.controls['email']" #email/><br>
    <div *ngIf="!myForm.controls['email'].valid">Required</div>
    
    <label for="post" >Post</label><br>
    <textarea name="post" type="text" [formControl]="myForm.controls['post']" ></textarea>
    <div *ngIf="!myForm.controls['post'].valid">Minimum Length 10</div><br>
    <input type="submit" value="Submit" [disabled]="!myForm.valid" />
    <input type="submit" value="Get Data" (click)="getData(myForm.controls['name'].value)"/>
  </form>
  `,
  providers:[PostService]
})
export class DataformComponent {
  myForm:FormGroup;
  constructor(fb:FormBuilder,private postservice:PostService){
    this.myForm = fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      post:['',Validators.compose([Validators.required,this.validatePost])]
    });
  }

  submitForm(form){
    console.log(form.value);
  }

  validatePost(control:FormControl){
      if(control.value.Length<10){
        console.log('valid');
        return {'invalid':true};
      }
       return null; 
  }

  getData(value){
    console.log('Getting Data For '+value);
    this.postservice.getData().subscribe(data=>console.log(data.json()));
  }
}
