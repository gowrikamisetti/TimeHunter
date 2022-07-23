import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { DeptService } from 'src/app/services/dept.service';
import { UserService } from 'src/app/services/users.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  //modal close
  closeResult = ''

  //conditions
  editUserSubmit = false;
  addUserSubmit = false;
  loading = true;

  //pop up msgs
  error: any;
  success: any;

  //firebase data store variables
  id: any;
  departmentsList: any = []
  usersDataList: any = [];


  //Add user form
  addUserForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)])
  })

  //edit user form
  editUserForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern('^[a-zA-Z ]*$')]),

    department: new FormControl(null,
      Validators.required,
    ),
  })

  constructor(private loginService: LoginService, private http: HttpClient, private modalService: NgbModal, private deptService: DeptService, private userService: UserService) { }

  //getting data
  async ngOnInit(): Promise<any> {
    //getting usersData and store in a list
    this.userService.getUser()
      .subscribe(users => {
        this.usersDataList = users;
      })

    //getting departments and store in a list
    this.deptService.getDept()
      .subscribe(dept => {
        this.departmentsList = dept
      })
    this.loading = false
  }

  //add User logic
  addUserFormSubmit() {
    //store uid and id of user
    let id: any;
    let uid: any;
    const userLogin = {
      uid: uid,
      id: id
    }
    this.addUserSubmit = true;
    const userData = this.addUserForm.value;
    //register the user
    if (this.addUserForm.valid) {
      this.loginService.register(userData.email, userData.password).then(res => {
        this.ngOnInit();
        this.error = null;
        this.addUserSubmit = false;
        this.addUserForm.reset()
        this.loginService.forgotPassword(userData.email)
        userLogin.uid = res.user?.uid

        //store the userInfo in firebase (realtime database)
        this.http.post('https://timehunter-cdaf8-default-rtdb.firebaseio.com/users.json', userData).subscribe((addedUserId: any) => {
          this.success = 'User is successfully added'
          if (addedUserId.hasOwnProperty('name')) {
            userLogin.id = addedUserId.name
          }
          //store the uid and id of users in firebase (realtime database)
          this.http.post('https://timehunter-cdaf8-default-rtdb.firebaseio.com/link.json', userLogin).subscribe()
        })
      }, err => {
        this.error = JSON.stringify(err.code.replace('auth/', ''))
      })
    }
    else {
      this.error = 'Invalid Email'
    }
  }

  //edit user logic
  editUser() {
    this.editUserSubmit = true;
    const employee = this.editUserForm.value
    if (this.editUserForm.valid) {
      this.http.patch(`https://timehunter-cdaf8-default-rtdb.firebaseio.com/users/${this.id}.json`, employee).subscribe(res => {
        this.ngOnInit()
        this.editUserForm.reset();
        this.editUserSubmit = false;
      })
    }
  }

  //delete user logic
  deleteUser(user: any) {
    this.http.delete(`https://timehunter-cdaf8-default-rtdb.firebaseio.com/users/${user.id}.json`).subscribe(res => {
      this.ngOnInit()
      alert(`Are you sure to delete the user ${user.name}`)
      this.success = `${user.name} is deleted successfully`
    }, err => {
      console.log("not deleted", err)
    })
  }

  //reset the form
  clear() {
    this.editUserSubmit = false;
    this.editUserForm.reset()
  }

  //edit user Modal
  editUserModal(editUerModalName: any, user: any) {
    const userData = {
      name: user.name,
      department: user.department
    }

    this.editUserForm.patchValue({
      name: userData.name,
      department: userData.department,
    })
    this.id = user.id;
    this.modalService.open(editUerModalName).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //add user Modal
  addUserModal(addUserModalName: any) {
    this.addUserSubmit = false;
    this.modalService.open(addUserModalName).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //modal close logic
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    }
    else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }
    else {
      return `with: ${reason}`;
    }
  }

}
