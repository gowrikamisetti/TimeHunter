import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent implements OnInit {
  sa: any;
  editId: any;
  loading = true;
  usersData: any;

  id: any;
  name: any;
  constructor(private userService: UserService) { }

  nameUser(user: any) {
    this.name = user.name;
    this.editId = user.id
    localStorage.setItem('gowri1', this.editId)
    console.log("============", this.name, this.editId)

  }
  async ngOnInit(): Promise<any> {

    const u = (await this.userService.getUser()).toPromise()
    u.then((data) => {
      this.loading = false;

      this.usersData = data;
      const sa = [];
      for (let i = 0; i < this.usersData?.length; i++) {
        const s: string = this.usersData[i].name ? this.usersData[i].name : ''
        const j: string = this.usersData[i].id ? this.usersData[i].id : ''
        const ob = {
          id: j,
          name: s
        }
        sa.push(ob)


      }
      this.sa = sa
      console.log("users timesheet", sa);

    })

  }
}
