import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
  userData: any;
  loading = true;
  constructor(private auth: AuthService, private http: HttpClient) { }
  navToggle = faBars;
  dropdownToggle = faCaretDown;
  logout() {
    this.auth.logout()
  }

  async ngOnInit(): Promise<any> {
    let name: any;
    name = localStorage.getItem('ID');
    console.log("get data", name)
    await this.http.get(`https://timehunter-cdaf8-default-rtdb.firebaseio.com/users/${name}.json`).subscribe(res => {
      this.userData = res;
      console.log("particular login user data", res, this.userData)
      this.loading = false
    })
    let adminUser;
    adminUser = localStorage.getItem('gowri1')
    await this.http.get(`https://timehunter-cdaf8-default-rtdb.firebaseio.com/users/${adminUser}.json`).subscribe(res => {
      this.userData = res;
      console.log("particular login user data", res, this.userData)
      this.loading = false
    })
  }

}
