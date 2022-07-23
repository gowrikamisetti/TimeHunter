import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faUsers,
  faCaretDown,
  faUserTie,
  faUsersCog,
  faTasks,
  faArrowRight,
  faUserCircle,
  faComment,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { ClientService } from '../services/client.service';
import { DeptService } from '../services/dept.service';
import { ProjectsService } from '../services/project.service';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  sa: any;
  loading = true;
  usersData: any;
  projectData: any;
  clientData: any;
  deptData: any;
  usersIcon = faUsers;
  clientsIcon = faUserTie;
  deptIcon = faUsersCog;
  projectIcon = faTasks;
  arrowRightIcon = faArrowRight;
  userCircle = faUserCircle;
  commentIcon = faComment;
  phoneIcon = faPhone;
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private projectService: ProjectsService, private deptService: DeptService, private clientService: ClientService) { }

  async ngOnInit(): Promise<any> {
    const u = (await this.userService.getUser()).toPromise()
    u.then((data) => {
      console.log("dept err", data)
      this.loading = false;
      this.usersData = data;
      const sa = []
      for (let i = 0; i < this.usersData?.length; i++) {
        const s: string = this.usersData[i].name ? this.usersData[i].name : ''
        const j: string = this.usersData[i].department ? this.usersData[i].department : ''
        const p: string = this.usersData[i].project ? this.usersData[i].project : ''
        const e: string = this.usersData[i].endDate ? this.usersData[i].endDate : ''
        const f: string = this.usersData[i].startDate ? this.usersData[i].startDate : ''
        const ob = {
          departments: j,
          name: s,

          project: p,
          endDate: e,
          startDate: f
        }
        sa.push(ob)
      }
      console.log("users timesheet", sa);
      this.sa = sa;

    })


    const p = (await this.projectService.getProjects()).toPromise()
    p.then((data) => {
      this.loading = false;

      this.projectData = data;
      console.log("project count", this.projectData.length);

    })
    const d = (await this.deptService.getDept()).toPromise()
    d.then((data) => {
      this.loading = false;

      this.deptData = data;
      console.log("department count", this.deptData.length);

    })
    const c = (await this.clientService.getClient()).toPromise()
    c.then((data) => {
      this.loading = false;

      this.clientData = data;
      console.log("client count", this.clientData.length);

    })

  }
}
