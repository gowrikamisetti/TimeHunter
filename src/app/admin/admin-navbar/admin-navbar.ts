import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { AdminProfileService } from 'src/app/services/admin_profile.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'admin-navbar',
  templateUrl: './admin-navbar.html',
  styleUrls: ['admin-navbar.scss'],

})
export class AdminNavbarComponent implements OnInit {
  loading = true;
  profileData: any;
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private profileService: AdminProfileService) { }
  navToggle = faBars;
  dropdownToggle = faCaretDown;
  logout() {
    this.auth.logout()
  }
  async ngOnInit(): Promise<any> {

    const d = (await this.profileService.getProfile()).toPromise()
    d.then((data) => {
      this.loading = false;
      this.profileData = data;

      console.log("profile", this.profileData[0].url);
    })

  }

}
