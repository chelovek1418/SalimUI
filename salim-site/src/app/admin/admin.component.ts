import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: ['button:hover{color:black!important;}']
})
export class AdminComponent {

  myForm: FormGroup;
  constructor(private service: AdminService, private router: Router) {
    this.myForm = new FormGroup({
      "email": new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      "password": new FormControl("", [
        Validators.required,
        Validators.pattern('[A-Za-z0-9_]*'),
        Validators.minLength(5)])
    });
  }

  // isAdmin():boolean {
  //   return this.service.authenticated;
  // }

  logout() {
    this.service.logout().then((res) => {
      this.router.navigate(['/portfolio']);
    }).catch((err) => {
      console.log(err);
    });
  }

  submit() {
    this.service.login(this.myForm.value).then((res) => {})
    .catch((err) => {
      console.log(err);
    });
  }

}
