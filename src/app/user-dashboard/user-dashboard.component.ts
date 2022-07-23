import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { DayService, WorkWeekService, MonthService, AgendaService, View, ResizeEventArgs, DragEventArgs, TimelineViews } from '@syncfusion/ej2-angular-schedule';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { taskService } from '../services/userTask.service';


@Component({
  selector: 'app-user-dashboard',

  providers: [DayService, WorkWeekService, MonthService, AgendaService],

  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  loading = true;
  closeResult = ''
  isSubmit = false;
  id: any;
  editMode = false;
  taskData: any;
  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
  })
  constructor(private auth: AuthService, private http: HttpClient, private modalService: NgbModal, private taskService: taskService) { }

  async ngOnInit(): Promise<any> {
    let name: any;
    name = localStorage.getItem('ID');
    console.log("get data", name)
    await this.taskService.getTask().subscribe(res => {

      this.taskData = res;
      console.log("particular login task data", res, this.taskData)
      this.loading = false
    })
  }
  logout() {
    this.auth.logout()
  }
  save() {
    let name;

    name = localStorage.getItem('ID');
    console.log("task", this.taskForm.value);
    this.isSubmit = true;

    const taskData = this.taskForm.value;
    if (this.taskForm.valid) {
      if (this.editMode) {
        this.http.patch(`https://timehunter-cdaf8-default-rtdb.firebaseio.com/users/${name}/task.json`, taskData).subscribe(res => {
          this.taskForm.reset()
          this.ngOnInit()
          this.isSubmit = false;
          this.loading = false

          console.log("edited", res)
        }, err => {
          console.log(err)
        })
      }
      else {
        this.http.post(`https://timehunter-cdaf8-default-rtdb.firebaseio.com/users/${name}/task.json`, taskData).subscribe(responseData => {
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
  addopen(box: any, i: any) {
    this.id = i.id;
    console.log(i)
    const data = {
      project: i.project,
      client: i.client,
      active: i.active,

    }
    // this.taskForm.patchValue({
    //   title: data.title,
    //   client: data.client,
    //   active: data.active
    // })
    this.modalService.open(box, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

  }
  private getDismissReason(reason: any): string {
    this.isSubmit = false;
    this.taskForm.reset()

    if (reason === ModalDismissReasons.ESC) {

      return 'by pressing ESC';

    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';

    } else {

      return `with: ${reason}`;

    }

  }
}
