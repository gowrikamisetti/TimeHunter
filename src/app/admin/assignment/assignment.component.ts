import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})

export class AssignmentComponent implements OnInit {
  usersNeededDataList: any = []
  projectsDataList: any = []
  allUsersData: any = []
  assignmentSubmit = false;
  loading = true;
  hidden = true;

  //userDataObject
  departments: any;
  name: any;
  id: any;

  editId: any;

  //assignment Form
  assignmentForm = new FormGroup({
    project: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required)
  })

  constructor(private userService: UserService, private projectService: ProjectsService, private http: HttpClient) { }

  async ngOnInit(): Promise<any> {
    //projects list
    this.projectService.getProjects()
      .subscribe(projects => {
        this.projectsDataList = projects;
      })

    //collecting needed userInfo
    const u = (await this.userService.getUser()).toPromise()
    u.then((data) => {
      this.allUsersData = data;
      const list = []
      for (let i = 0; i < this.allUsersData?.length; i++) {
        const name: string = this.allUsersData[i].name ? this.allUsersData[i].name : ''
        const id: string = this.allUsersData[i].id ? this.allUsersData[i].id : ''
        const department: string = this.allUsersData[i].department ? this.allUsersData[i].department : ''
        const userDataObject = {
          id: id,
          name: name,
          departments: department,
        }
        list.push(userDataObject)
      }
      this.usersNeededDataList = list;
    })
  }

  userAssignment(user: any) {
    this.hidden = false
    this.name = user.name;
    this.editId = user.id;
  }

  // assignment projects to users
  assignProjectToUser() {
    this.assignmentSubmit = true;
    const assignmentData = this.assignmentForm.value
    if (this.assignmentForm.valid) {
      this.http.patch(`https://timehunter-cdaf8-default-rtdb.firebaseio.com/users/${this.editId}.json`, assignmentData).subscribe(responseData => {
        this.ngOnInit();
        this.assignmentSubmit = false;
        this.assignmentForm.reset()
        this.hidden = true
      })
    }
  }
}
