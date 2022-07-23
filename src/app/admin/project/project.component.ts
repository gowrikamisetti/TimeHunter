import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  faUsers,
  faEdit,
  faInfoCircle,
  faTasks,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { ProjectsService } from 'src/app/services/project.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectsDataList: any = []
  clientsList: any = []
  userIcon = faUsers;
  loading = true;
  projectSubmit = false;
  editmode = false;
  closeResult = ''
  searchText: any;
  id: any;

  // project form
  projectForm = new FormGroup({
    project: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
    ]),
    client: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)]),
    active: new FormControl()
  })

  constructor(private projectService: ProjectsService,
    private http: HttpClient,
    private modalService: NgbModal,
    private clientService: ClientService) { }

  //getting clients and projects
  async ngOnInit(): Promise<any> {
    //getting projects
    this.projectService.getProjects()
      .subscribe(users => {
        this.projectsDataList = users;
      })
    //getting clients
    this.clientService.getClient()
      .subscribe(users => {
        this.clientsList = users;
        this.loading = false;
      })
  }

  //add and edit projects
  manageProjects() {
    this.projectSubmit = true;
    const projectData = this.projectForm.value;
    //edit project
    if (this.editmode) {
      this.http.patch(`https://timehunter-cdaf8-default-rtdb.firebaseio.com/project/${this.id}.json`, projectData).subscribe(res => {
        this.ngOnInit()
        this.projectSubmit = false;
        this.projectForm.reset()
      })
    }
    //add project
    else {
      if (this.projectForm.value) {
        this.http.post('https://timehunter-cdaf8-default-rtdb.firebaseio.com/project.json', projectData).subscribe(res => {
          this.ngOnInit()
          this.projectSubmit = false;
          this.projectForm.reset()
        })
      }
    }
  }
  //delete project
  deleteProject(i: any) {
    this.http.delete(`https://timehunter-cdaf8-default-rtdb.firebaseio.com/project/${i.id}.json`).subscribe(res => {
      this.ngOnInit()
    })
  }

  mode() {
    this.editmode = true
  }

  //project modal
  projectModal(projectModalName: any, i: any) {
    this.id = i.id;
    const data = {
      project: i.project,
      client: i.client,
      active: i.active,
    }
    this.projectForm.patchValue({
      project: data.project,
      client: data.client,
      active: data.active
    })
    this.modalService.open(projectModalName).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //close modal logic
  private getDismissReason(reason: any): string {
    this.projectSubmit = false;
    this.projectForm.reset()
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

