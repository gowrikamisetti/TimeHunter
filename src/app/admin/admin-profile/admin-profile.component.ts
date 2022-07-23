import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminProfileService } from 'src/app/services/admin_profile.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  changePswd: FormGroup
  change = true;
  isSubmit = false;
  editMode = false;
  loading = true;
  profileData: any;
  profileUrl: any;
  id: any;
  hidden = true;

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', Validators.required)


  })
  constructor(private profileService: AdminProfileService, private http: HttpClient, private formBuilder: FormBuilder) {
    this.changePswd = this.formBuilder.group({
      currentPswd: new FormControl(null, [Validators.minLength(6), Validators.required]),
      newPswd: new FormControl(null, [Validators.minLength(6), Validators.required]),
      reEnter: new FormControl(null, [Validators.minLength(6), Validators.required])
    })
  }
  save() {

    this.isSubmit = true;
    console.log(this.profileForm.value)
    const profileData = this.profileForm.value;
    if (this.profileForm.valid) {
      if (this.editMode) {
        this.http.patch(`https://timehunter-cdaf8-default-rtdb.firebaseio.com/admin_profile/${this.id}.json`, profileData).subscribe(res => {
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
        this.http.post('https://timehunter-cdaf8-default-rtdb.firebaseio.com/admin_profile.json', profileData).subscribe(responseData => {
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
  onEdit(i: any) {
    this.hidden = false
    this.id = i.id;

    this.editMode = true;
    console.log("index", this.id)
    const profile = this.profileForm.value
    const data = {
      name: i.name,
      role: i.role,
      email: i.email,
      mobile: i.mobile
    }
    this.profileForm.patchValue({
      name: data.name,
      role: data.role,
      email: data.email,
      mobile: data.mobile
    })



  }
  async ngOnInit(): Promise<any> {

    const d = (await this.profileService.getProfile()).toPromise()
    d.then((data) => {
      this.loading = false;
      this.profileData = data;
      console.log("profile", this.profileData);
    })

  }
  profileUpdate(event: any) {
    this.loading = true;
    console.log("event", event.target.files)
    this.profileService.uploading(event.target.files[0]).subscribe((data) => {
      this.profileUrl = data;
      this.http.patch('https://timehunter-cdaf8-default-rtdb.firebaseio.com/admin_profile/-N7EwgN4hdTmqGSVB_sL.json', { "url": this.profileUrl }).subscribe(res => {
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