import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // design
  loading = false;
  isSubmit = false;
  error: any;

  // password hide
  hide = true;

  // store uid and id of all users
  loginUsers: any;


  // Login form
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(6),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private loginService: LoginService, private router: Router, private http: HttpClient) { }

  // Login logic
  login() {

    //store the login user uid
    let uid: any;

    this.loading = true;
    this.isSubmit = true;

    //store the loginForm data
    const loginData = this.loginForm.value

    //verify email & password
    this.loginService.login(loginData.email, loginData.password).then(res => {
      localStorage.setItem('token', 'true')
      uid = res.user?.uid;

      if (res.user?.emailVerified == true) {
        //admin login
        if (res.user?.uid == 'h9sgi5Zd91Y99D40MTLOqX5J0Qy2') {
          this.router.navigate(['/admin'])
        }
        else {
          //user login
          this.http.get('https://timehunter-cdaf8-default-rtdb.firebaseio.com/link.json')
            .pipe(
              map((loginResponse: any) => {
                const linkArray = [];
                for (const key in loginResponse) {
                  if (loginResponse.hasOwnProperty(key)) {
                    linkArray.push({ ...loginResponse[key], linkId: key });
                  }

                }

                return linkArray;
              })
            )
            .subscribe(linkArrayResponse => {
              this.loginUsers = linkArrayResponse;

              //checking uid to match
              for (let u of this.loginUsers) {
                if (u.uid == uid) {
                  //store the id for future useage
                  localStorage.setItem('ID', u.id)
                }

              }

              this.router.navigate(['/userDashboard']);
            }
            )

        }

      }

    }, err => {
      this.loading = false
      //Error msg
      this.error = JSON.stringify(err.code.replace('auth/', ''))

    })
  }
}


