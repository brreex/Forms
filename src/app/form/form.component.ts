import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f)">
       <input type="text" name="email" [(ngModel)]="user.email" required pattern="[a-z]*" #email="ngModel">
      <input type="submit" [disabled]="!f.valid">
    </form>
    <div *ngIf="!email.valid">Wrong Email Format</div>
  `,
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  user = {
    email:'bababu'
  }
  constructor() { 

  }
  onSubmit(form){
    console.log(this.user.email);
  }
}
