import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeptService } from 'src/app/services/dept.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  departmentList: any = []
  departmentSubmit = false;
  loading = true;

  // department form
  departmentForm = new FormGroup({
    department: new FormControl('', Validators.required)
  })

  constructor(private http: HttpClient, private departmentService: DeptService) { }

  //getting departments
  async ngOnInit(): Promise<any> {
    const s = (await this.departmentService.getDept()).toPromise()
    s.then((data) => {
      this.loading = false;
      this.departmentList = data;
    })
  }

  //adding department
  addDepartment() {
    this.departmentSubmit = true;

    if (this.departmentForm.valid) {
      this.http.post('https://timehunter-cdaf8-default-rtdb.firebaseio.com/dept.json', this.departmentForm.value).subscribe(res => {
        this.ngOnInit()
        this.departmentForm.reset()
        this.departmentSubmit = false;
      })
    }
  }

  //delete department
  onDelete(department: any) {
    this.http.delete(`https://timehunter-cdaf8-default-rtdb.firebaseio.com/dept/${department.id}.json`).subscribe(res => {
      this.ngOnInit()
    })
  }
}