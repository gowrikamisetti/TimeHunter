import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminProfileService } from '../services/admin_profile.service';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  changePswd: FormGroup
  change = true;
  isSubmit = false;
  editMode = false;
  loading = true;
  hidden = true;
  id: any;
  profileUrl: any;
  name: any;
  profileData: any;
  usersData: any;
  users: any;
  userProfile: any;
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    bloodgroup: new FormControl('', Validators.required),

  })
  constructor(private userService: UserService, private http: HttpClient, private profileService: AdminProfileService, private formBuilder: FormBuilder) {
    this.changePswd = this.formBuilder.group({
      currentPswd: new FormControl(null, [Validators.minLength(6), Validators.required]),
      newPswd: new FormControl(null, [Validators.minLength(6), Validators.required]),
      reEnter: new FormControl(null, [Validators.minLength(6), Validators.required])
    })
  }
  userData: any;
  async ngOnInit(): Promise<any> {
    await this.profileService.getuserProfile().subscribe(res => {

      this.userProfile = res;
      console.log("particular login task data", res, this.userProfile)
      this.loading = false
    })
    this.name = localStorage.getItem('ID');
    console.log("get data", this.name)
    await this.http.get(`https://timehunter-cdaf8-default-rtdb.firebaseio.com/users/${this.name}.json`).subscribe(res => {
      this.userData = res;
      console.log("particular login username data", res, this.userData.name)
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

  save() {

    this.isSubmit = true;
    console.log("userssssssss", this.profileForm.value)
    console.log("idddddd", this.id)
    const profileData = this.profileForm.value;
    if (this.profileForm.valid) {
      if (this.editMode) {
        this.http.patch(`https://timehunter-cdaf8-default-rtdb.firebaseio.com/users/${this.name}.json`, profileData).subscribe(res => {
          this.profileForm.reset()
          this.hidden = true;
          this.isSubmit = false;
          this.ngOnInit()

          console.log("edited", res)
        }, err => {
          console.log(err)
        })
      }
      else {
        this.http.patch(`https://timehunter-cdaf8-default-rtdb.firebaseio.com/users/${this.name}.json`, profileData).subscribe(responseData => {
          this.isSubmit = false;
          this.loading = false;
          this.ngOnInit()
          console.log("addede ", responseData)
        }, err => {
          console.log(err)
        })
      }

    }
  }
  changeImg() {
    this.change = false;
  }
  changePsd() {
    this.change = true
    console.log("changed", this.changePswd.value)
  }
  // onEdit(i: any) {
  //   this.hidden = false
  //   this.id = i.id;

  //   this.editMode = true;
  //   console.log("index", this.id)
  //   const profile = this.profileForm.value
  //   const data = {
  //     name: i.name,
  //     bloodgroup: i.bloodgroup,
  //     mobile: i.mobile
  //   }
  //   this.profileForm.patchValue({
  //     name: data.name,
  //     bloodgroup: data.bloodgroup,

  //     mobile: data.mobile
  //   })



  // }
  profileUpdate(event: any) {
    let nameId: any;
    nameId = localStorage.getItem('gowri');
    this.loading = true;
    console.log("event", event.target.files)
    this.profileService.uploading(event.target.files[0]).subscribe((data) => {
      this.profileUrl = data;
      this.http.patch(`https://timehunter-cdaf8-default-rtdb.firebaseio.com/users/${nameId}.json`, { "url": this.profileUrl }).subscribe(res => {
        this.ngOnInit()
        console.log("relatime", res)
      }, err => {
        console.log("fail", err)
      })
      this.loading = true

      this.ngOnInit()
      console.log("image ", data)

    })

  }
}
