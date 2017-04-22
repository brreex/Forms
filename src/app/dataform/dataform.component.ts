import { Component } from '@angular/core';
import {FormGroup,FormControl,FormBuilder} from '@angular/forms';
import {PostService} from '../post.service';
@Component({
  selector: 'dataform',
  template: `
  <form [formGroup]="myForm" (ngSubmit)="submitForm(myForm)">
    
    <label for="name" >Name</label><br>
    <input name= "name" type="text" [formControl]="myForm.controls['name']" required #name /><br>
    <div *ngIf="!myForm.controls['name'].valid">Required</div>
    
    <label for="email" >Email</label><br>
    <input name="email" type="text" [formControl]="myForm.controls['email']" required #email/><br>
    <div *ngIf="!myForm.controls['email'].valid">Required</div>
    
    <label for="post" >Post</label><br>
    <textarea name="post" type="text" [formControl]="myForm.controls['post']" pattern=".{10,}" #post></textarea>
    <div *ngIf="!post.valid">Minimum Length 10</div>
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
      name:[''],
      email:[''],
      post:['']
    });
  }

  submitForm(form){
    console.log(form.value);
  }

  getData(value){
    console.log('Getting Data For '+value);
    this.postservice.getData().subscribe(data=>console.log(data.json()));
  }
}
